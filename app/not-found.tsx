import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {/* Big 404 with tech styling */}
      <div className="relative">
        <h1 className="font-brand text-[120px] font-bold leading-none text-white/[0.03] md:text-[180px]">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="m9 9 4 4" />
                <path d="m13 9-4 4" />
              </svg>
            </div>
            <p className="font-heading text-lg font-semibold text-white/70">
              Страница не найдена
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/35">
        Возможно, страница была перемещена или удалена.
        Проверьте адрес или вернитесь на главную.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex rounded-lg border border-primary/30 bg-primary/5 px-6 py-3 font-heading text-sm font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,240,200,0.12)]"
      >
        На главную
      </Link>

      {/* Decorative corner accents */}
      <div className="pointer-events-none fixed left-8 top-8 h-16 w-16 border-l border-t border-primary/10" />
      <div className="pointer-events-none fixed bottom-8 right-8 h-16 w-16 border-b border-r border-primary/10" />
    </div>
  );
}
