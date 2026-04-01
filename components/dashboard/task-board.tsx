"use client";

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { addDays } from "date-fns";
import {
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  ListFilter,
  LayoutGrid,
  List,
  Sparkles
} from "lucide-react";

import { parseTaskInput, prioritizeTasks } from "@/lib/ai";
import { tasks as seedTasks } from "@/lib/data/mock-data";
import type { Task, TaskPriority, TaskStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, featureFlags, formatDateLabel } from "@/lib/utils";

const columns: { id: TaskStatus; label: string }[] = [
  { id: "TODO", label: "To Do" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "DONE", label: "Done" }
];

function SortableTaskCard({
  task,
  aiEnabled,
  onComplete,
  onReschedule,
  onSubtasks
}: {
  task: Task;
  aiEnabled: boolean;
  onComplete: (id: string) => void;
  onReschedule: (id: string) => void;
  onSubtasks: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      {...attributes}
      {...listeners}
      className="rounded-3xl border border-white/70 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-950">{task.title}</p>
          {task.description ? <p className="mt-2 text-sm leading-6 text-slate-500">{task.description}</p> : null}
        </div>
        <Badge
          variant={
            task.priority === "urgent"
              ? "glow"
              : task.priority === "high"
                ? "accent"
                : task.priority === "medium"
                  ? "default"
                  : "secondary"
          }
        >
          {task.priority}
        </Badge>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{formatDateLabel(task.dueDate)}</span>
        <span>{task.estimatedMinutes ? `${task.estimatedMinutes} min` : "Flexible"}</span>
      </div>
      {aiEnabled && task.aiSuggestion ? (
        <div className="mt-4 rounded-2xl bg-brand-50 px-3 py-2 text-sm text-brand-700">{task.aiSuggestion}</div>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => onComplete(task.id)} type="button">
          Complete
        </button>
        <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => onReschedule(task.id)} type="button">
          Reschedule
        </button>
        <button
          className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!aiEnabled}
          onClick={() => onSubtasks(task.id)}
          type="button"
        >
          {aiEnabled ? "Break into subtasks" : "AI subtasks coming soon"}
        </button>
      </div>
    </div>
  );
}

function Column({
  title,
  status,
  tasks,
  aiEnabled,
  onComplete,
  onReschedule,
  onSubtasks
}: {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  aiEnabled: boolean;
  onComplete: (id: string) => void;
  onReschedule: (id: string) => void;
  onSubtasks: (id: string) => void;
}) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/70 p-4 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-950">{title}</h3>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{tasks.length}</span>
      </div>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-4">
          {tasks.map((task) => (
            <SortableTaskCard
              aiEnabled={aiEnabled}
              key={task.id}
              onComplete={onComplete}
              onReschedule={onReschedule}
              onSubtasks={onSubtasks}
              task={task}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export function TaskBoard() {
  const aiEnabled = featureFlags.ai;
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [priorityFilter, setPriorityFilter] = useState<"all" | TaskPriority>("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week">("all");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const tagOptions = Array.from(new Set(tasks.flatMap((task) => task.tags)));

  const filteredTasks = tasks.filter((task) => {
    const priorityPass = priorityFilter === "all" || task.priority === priorityFilter;
    const tagPass = tagFilter === "all" || task.tags.includes(tagFilter);
    const datePass =
      dateFilter === "all" ||
      (dateFilter === "today" && task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString()) ||
      (dateFilter === "week" &&
        task.dueDate &&
        new Date(task.dueDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000);

    return priorityPass && tagPass && datePass;
  });

  function addNaturalLanguageTask() {
    if (!taskText.trim()) {
      return;
    }

    const parsed = parseTaskInput(taskText);
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: parsed.title,
      priority: parsed.priority,
      dueDate: parsed.dueDate,
      tags: parsed.tags.length ? parsed.tags : ["inbox"],
      estimatedMinutes: parsed.estimatedMinutes,
      status: "TODO",
      aiSuggestion: aiEnabled ? "Start with a 15-minute setup pass to reduce friction." : undefined
    };

    setTasks((current) => [newTask, ...current]);
    setTaskText("");
  }

  function suggestPriorities() {
    if (!aiEnabled) {
      return;
    }

    const prioritized = prioritizeTasks(
      tasks.map((task) => ({
        ...task,
        priority:
          task.dueDate && new Date(task.dueDate).getTime() - Date.now() < 48 * 60 * 60 * 1000
            ? "high"
            : task.priority
      }))
    );

    setTasks(prioritized);
  }

  function updateTask(id: string, patch: Partial<Task>) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...patch } : task)));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) {
      return;
    }

    const overTask = tasks.find((task) => task.id === over.id);
    const nextStatus = columns.some((column) => column.id === over.id) ? (over.id as TaskStatus) : overTask?.status;

    if (!nextStatus) {
      return;
    }

    const sourceTasks = tasks.filter((task) => task.status === activeTask.status);
    const targetTasks = tasks.filter((task) => task.status === nextStatus);
    const oldIndex = sourceTasks.findIndex((task) => task.id === active.id);
    const newIndex = overTask ? targetTasks.findIndex((task) => task.id === over.id) : targetTasks.length;

    if (activeTask.status === nextStatus) {
      const reordered = arrayMove(sourceTasks, oldIndex, Math.max(newIndex, 0));
      const others = tasks.filter((task) => task.status !== nextStatus);
      setTasks([...others, ...reordered]);
      return;
    }

    const movedTask = { ...activeTask, status: nextStatus };
    const remaining = tasks.filter((task) => task.id !== active.id);
    const nextColumnTasks = remaining.filter((task) => task.status === nextStatus);
    nextColumnTasks.splice(Math.max(newIndex, 0), 0, movedTask);
    const otherTasks = remaining.filter((task) => task.status !== nextStatus);
    setTasks([...otherTasks, ...nextColumnTasks]);
  }

  function handleComplete(id: string) {
    updateTask(id, { status: "DONE" });
  }

  function handleReschedule(id: string) {
    const task = tasks.find((item) => item.id === id);
    if (!task) {
      return;
    }

    updateTask(id, {
      dueDate: addDays(task.dueDate ? new Date(task.dueDate) : new Date(), 1).toISOString(),
      aiSuggestion: aiEnabled
        ? "Moved by one day. Re-evaluate if this still deserves prime focus time."
        : undefined
    });
  }

  function handleSubtasks(id: string) {
    if (!aiEnabled) {
      return;
    }

    updateTask(id, {
      aiSuggestion: "Suggested subtasks: outline the work, finish the hardest piece, then polish and send."
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Tasks</CardTitle>
            <p className="text-sm text-slate-500">
              {aiEnabled
                ? "Capture naturally, drag work across the board, and let AI sharpen the priorities."
                : "Capture naturally, drag work across the board, and keep AI helpers parked behind a coming-soon gate."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={cn("rounded-full px-4 py-2 text-sm font-semibold", view === "kanban" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600")}
              onClick={() => setView("kanban")}
              type="button"
            >
              <LayoutGrid className="mr-2 inline h-4 w-4" />
              Kanban
            </button>
            <button
              className={cn("rounded-full px-4 py-2 text-sm font-semibold", view === "list" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600")}
              onClick={() => setView("list")}
              type="button"
            >
              <List className="mr-2 inline h-4 w-4" />
              List
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="flex-1">
              <Input
                onChange={(event) => setTaskText(event.target.value)}
                placeholder='Add task: finish proposal by Monday 3pm #work'
                value={taskText}
              />
            </div>
            <Button onClick={addNaturalLanguageTask} type="button">
              <Sparkles className="mr-2 h-4 w-4" />
              Add task
            </Button>
            <Button disabled={!aiEnabled} onClick={suggestPriorities} type="button" variant="outline">
              <BrainCircuit className="mr-2 h-4 w-4" />
              {aiEnabled ? "AI priority suggestion" : "AI priority suggestion coming soon"}
            </Button>
          </div>
          {!aiEnabled ? (
            <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
              AI task suggestions and subtask breakdowns are hidden until your production AI key is added.
            </div>
          ) : null}
          <div className="grid gap-3 md:grid-cols-3">
            <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600">
              <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                <ListFilter className="h-3.5 w-3.5" />
                Priority
              </span>
              <select
                className="w-full bg-transparent text-slate-900 outline-none"
                onChange={(event) => setPriorityFilter(event.target.value as "all" | TaskPriority)}
                value={priorityFilter}
              >
                <option value="all">All priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
            <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600">
              <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">Tag</span>
              <select
                className="w-full bg-transparent text-slate-900 outline-none"
                onChange={(event) => setTagFilter(event.target.value)}
                value={tagFilter}
              >
                <option value="all">All tags</option>
                {tagOptions.map((tag) => (
                  <option key={tag} value={tag}>
                    #{tag}
                  </option>
                ))}
              </select>
            </label>
            <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600">
              <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                <CalendarClock className="h-3.5 w-3.5" />
                Due date
              </span>
              <select
                className="w-full bg-transparent text-slate-900 outline-none"
                onChange={(event) => setDateFilter(event.target.value as "all" | "today" | "week")}
                value={dateFilter}
              >
                <option value="all">Any time</option>
                <option value="today">Due today</option>
                <option value="week">Due this week</option>
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 lg:hidden">
        {filteredTasks.map((task) => (
          <div key={task.id} className="rounded-3xl border border-white/70 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-950">{task.title}</p>
                <p className="mt-2 text-sm text-slate-500">{task.status.replace("_", " ")}</p>
              </div>
              <Badge variant="secondary">{task.priority}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700" onClick={() => handleComplete(task.id)} type="button">
                <CheckCircle2 className="mr-2 inline h-3.5 w-3.5" />
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block">
        {view === "list" ? (
          <Card>
            <CardContent className="space-y-4 p-6">
              {filteredTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
                  <div>
                    <p className="font-semibold text-slate-950">{task.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {task.status.replace("_", " ")} • {formatDateLabel(task.dueDate)}
                    </p>
                  </div>
                  <Badge variant="secondary">{task.priority}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
            <div className="grid gap-6 xl:grid-cols-3">
              {columns.map((column) => (
                <Column
                  aiEnabled={aiEnabled}
                  key={column.id}
                  onComplete={handleComplete}
                  onReschedule={handleReschedule}
                  onSubtasks={handleSubtasks}
                  status={column.id}
                  tasks={filteredTasks.filter((task) => task.status === column.id)}
                  title={column.label}
                />
              ))}
            </div>
          </DndContext>
        )}
      </div>
    </div>
  );
}
