import { initials } from "@/lib/utils";

export function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-semibold text-white">
      {initials(name)}
    </div>
  );
}
