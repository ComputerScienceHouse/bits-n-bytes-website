import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">// 404</p>
      <h1 className="mt-3 text-5xl">Page not found</h1>
      <p className="mt-4 text-muted-foreground">Huh. There's nothing here. Try returning home.</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90"
      >
        Go home
      </Link>
    </div>
  );
}
