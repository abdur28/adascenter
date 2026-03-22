export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background">
      {/* Radar pulse rings */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-32 w-32 animate-ping rounded-full border border-primary/10" />
        <div
          className="absolute h-24 w-24 animate-ping rounded-full border border-primary/15"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute h-16 w-16 animate-ping rounded-full border border-primary/20"
          style={{ animationDelay: "0.6s" }}
        />

        {/* Center dot */}
        <div className="relative h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(0,240,200,0.5)]" />
      </div>

      {/* Brand */}
      <div className="absolute bottom-1/2 -mb-28 flex items-center gap-1.5">
        <span className="font-brand text-sm font-bold tracking-wider text-primary/60">
          ADAS
        </span>
        <span className="font-heading text-sm font-semibold text-white/30">
          ЦЕНТР
        </span>
      </div>
    </div>
  );
}
