import { CalendarClock, Clock3, Link2 } from "lucide-react";

import { calendarEvents } from "@/lib/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimeLabel } from "@/lib/utils";

export default function CalendarPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Calendar intelligence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {calendarEvents.map((event) => (
            <div key={event.id} className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-950">{event.title}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    {formatTimeLabel(event.start)} to {new Date(event.end).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </p>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected calendars</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Google Calendar", "Outlook", "Apple Calendar"].map((calendar, index) => (
              <div key={calendar} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <Link2 className="h-5 w-5 text-brand-600" />
                  <div>
                    <p className="font-semibold text-slate-950">{calendar}</p>
                    <p className="text-sm text-slate-500">{index === 0 ? "Connected" : "Available to connect"}</p>
                  </div>
                </div>
                <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700" type="button">
                  {index === 0 ? "Manage" : "Connect"}
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheduling guidance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
            <div className="rounded-3xl bg-brand-50 p-4">
              <CalendarClock className="mb-2 h-4 w-4 text-brand-600" />
              FlowMind suggests moving low-value meetings away from your 2pm focus block this week.
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <Clock3 className="mb-2 h-4 w-4 text-brand-600" />
              Your highest-energy windows appear to be Tuesday and Thursday mornings.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
