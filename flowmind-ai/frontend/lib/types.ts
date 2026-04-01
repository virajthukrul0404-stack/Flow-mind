export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";
export type GoalCategory =
  | "health"
  | "career"
  | "finance"
  | "learning"
  | "personal";
export type AppPlan = "FREE" | "PRO" | "TEAM";

export interface Feature {
  icon: string;
  title: string;
  description: string;
  accent: string;
}

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  quote: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  periodLabel: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  tags: string[];
  estimatedMinutes?: number;
  aiSuggestion?: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  targetDate: string;
  progress: number;
  milestones: Milestone[];
  streak: number;
  aiCoachingEnabled: boolean;
}

export interface FocusPoint {
  day: string;
  hours: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: "meeting" | "focus" | "task";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  actions?: string[];
}

export interface Viewer {
  id: string;
  name: string;
  email: string;
  plan: AppPlan;
}
