import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">// contact</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Say Hello</h1>
      <p className="mt-4 text-muted-foreground">
        Questions, partnership ideas, or want a machine at your location? Drop us a note.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="mt-10 grid gap-5 rounded-lg border bg-card p-6 md:p-8"
      >
        <label className="grid gap-2 text-sm">
          <span className="font-display uppercase tracking-wider text-xs">Name</span>
          <input
            required
            className="rounded-md border bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-display uppercase tracking-wider text-xs">Email</span>
          <input
            type="email"
            required
            className="rounded-md border bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-display uppercase tracking-wider text-xs">Message</span>
          <textarea
            required
            rows={5}
            className="rounded-md border bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </label>
        <button
          type="submit"
          className="justify-self-start rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
        >
          Send Message
        </button>
        {sent && (
          <p className="text-sm text-[var(--orange)]">
            Thanks! This is a demo form — nothing was actually sent.
          </p>
        )}
      </form>
    </div>
  );
}
