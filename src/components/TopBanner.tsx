import { useState } from "react";
import { X } from "lucide-react";

interface TopBannerProps {
  text?: string;
  /** Optional call-to-action link */
  ctaText?: string;
  ctaHref?: string;
  /** If true, user can dismiss the banner for the session */
  dismissible?: boolean;
}

export default function TopBanner({
  text = "🥨 Catch us at the campus tech fair this Friday — free samples while supplies last!",
  ctaText,
  ctaHref,
  dismissible = true,
}: TopBannerProps) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[var(--magenta)] via-[var(--orange)] to-[var(--gold)] text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-6 py-2 text-center text-sm">
        <span className="font-medium">{text}</span>
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="font-display text-xs uppercase tracking-widest underline underline-offset-4 hover:opacity-80"
          >
            {ctaText}
          </a>
        )}
      </div>
      {dismissible && (
        <button
          onClick={() => setHidden(true)}
          aria-label="Dismiss banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
