"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {/* Warning icon */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-red-500/5" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/5">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-400"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>
      </div>

      <h1 className="font-heading text-xl font-semibold text-white/70">
        Что-то пошло не так
      </h1>

      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/35">
        Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg border border-primary/30 bg-primary/5 px-6 py-3 font-heading text-sm font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,240,200,0.12)]"
        >
          Попробовать снова
        </button>
        <a
          href="/"
          className="rounded-lg border border-white/10 px-6 py-3 font-heading text-sm font-semibold text-white/50 transition-all hover:border-white/20 hover:text-white/70"
        >
          На главную
        </a>
      </div>

      {/* Decorative corner accents */}
      <div className="pointer-events-none fixed left-8 top-8 h-16 w-16 border-l border-t border-red-500/10" />
      <div className="pointer-events-none fixed bottom-8 right-8 h-16 w-16 border-b border-r border-red-500/10" />
    </div>
  );
}
