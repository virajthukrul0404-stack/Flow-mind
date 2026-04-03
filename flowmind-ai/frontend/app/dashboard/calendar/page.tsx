"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { CalendarDays, ChevronLeft, ChevronRight, LayoutGrid, Calendar as CalIcon } from "lucide-react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isToday, startOfWeek, endOfWeek } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarPage() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const start = view === "month" ? startOfWeek(startOfMonth(currentDate)) : startOfWeek(currentDate);
  const end = view === "month" ? endOfWeek(endOfMonth(currentDate)) : endOfWeek(currentDate);
  const days = eachDayOfInterval({ start, end });

  // Hardcode events for random days (e.g., today, tomorrow, +3 days)
  const todayNum = new Date().getDate();
  const getEvents = (date: Date) => {
    const d = date.getDate();
    if (d === todayNum) return [{ type: "focus", title: "Deep Work Sprint" }, { type: "meeting", title: "Sync" }];
    if (d === todayNum + 1) return [{ type: "meeting", title: "Client Call" }];
    if (d === todayNum + 4) return [{ type: "focus", title: "Writing" }];
    return [];
  };

  const nextPeriod = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (view === "month" ? 1 : 0), currentDate.getDate() + (view === "week" ? 7 : 0)));
  };

  const prevPeriod = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - (view === "month" ? 1 : 0), currentDate.getDate() - (view === "week" ? 7 : 0)));
  };

  const toggleSync = () => toast("Calendar sync coming soon — we're working on it!", "info");

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">Calendar Intelligence</h1>
          <p className="text-zinc-500 font-medium">Protect your time automatically.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={toggleSync} className="text-sm font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 rounded-xl shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            Connect Google
          </button>
          <button onClick={toggleSync} className="text-sm font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 rounded-xl shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            Outlook
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm overflow-hidden min-h-[500px] relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
              <button onClick={prevPeriod} className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-zinc-500"><ChevronLeft className="w-5 h-5"/></button>
              <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-sm font-bold text-zinc-700 dark:text-zinc-300">Today</button>
              <button onClick={nextPeriod} className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-zinc-500"><ChevronRight className="w-5 h-5"/></button>
            </div>
          </div>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button
              onClick={() => setView("month")}
              className={`p-1.5 rounded-md ${view === "month" ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-zinc-500"}`}
            ><LayoutGrid className="w-5 h-5"/></button>
            <button
              onClick={() => setView("week")}
              className={`p-1.5 rounded-md ${view === "week" ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-zinc-500"}`}
            ><CalIcon className="w-5 h-5"/></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} className="bg-white dark:bg-zinc-900 py-3 text-center text-xs font-bold uppercase tracking-wider text-zinc-500">
              {d}
            </div>
          ))}
          {days.map((day, idx) => {
            const events = getEvents(day);
            const isSelected = selectedDate?.toDateString() === day.toDateString();
            return (
              <div
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`min-h-[100px] bg-white dark:bg-zinc-900 p-2 cursor-pointer transition-colors relative group ${
                  !isSameMonth(day, currentDate) ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-700 dark:text-zinc-300"
                } ${isSelected ? "bg-blue-50 dark:bg-blue-900/10" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"}`}
              >
                <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold mb-1 ${
                  isToday(day) ? "bg-blue-600 text-white" : isSelected ? "text-blue-600" : ""
                }`}>
                  {format(day, "d")}
                </div>
                <div className="flex flex-col gap-1">
                  {events.map((e, i) => (
                    <div key={i} className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded truncate ${
                      e.type === "focus" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                    }`}>
                      {e.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-4 rounded-2xl shadow-xl border border-zinc-800 dark:border-zinc-200 min-w-[300px] z-10"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold">{format(selectedDate, "MMM d, yyyy")}</span>
                <button onClick={() => setSelectedDate(null)} className="text-zinc-400 hover:text-white dark:hover:text-black">✕</button>
              </div>
              {getEvents(selectedDate).length > 0 ? (
                <ul className="space-y-2">
                  {getEvents(selectedDate).map((e, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium">
                      <div className={`w-2 h-2 rounded-full ${e.type === "focus" ? "bg-green-500" : "bg-blue-500"}`} />
                      {e.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-400 dark:text-zinc-500 text-sm italic">Free day — no events scheduled.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
