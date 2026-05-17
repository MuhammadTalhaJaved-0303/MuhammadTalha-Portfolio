import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 sm:flex-row sm:items-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-2)]">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-2)]">
          built with intent · next.js · motion
        </p>
      </div>
    </footer>
  );
}
