import { Link } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import img1 from "../assets/hero-1.jpg";
import img2 from "../assets/hero-2.jpg";
import img3 from "../assets/hero-3.jpg";
import img4 from "../assets/hero-4.jpg";
import img5 from "../assets/hero-5.png";
import CSHLogo from "../assets/csh_logo_square.svg";
import { useLayoutEffect, useRef } from "react";
import VideoSection from "@/components/VideoPlayer";

const heroImages = [
  { src: img1, alt: "Bits 'n Bytes Machine Front" },
  { src: img2, alt: "Bits 'n Bytes Machine Left" },
  { src: img3, alt: "Bits 'n Bytes Machine Top" },
  { src: img4, alt: "Bits 'n Bytes Machine Hatch" },
  { src: img5, alt: "Anime Bits 'n Bytes Machine!" },
];

const events = [
  { name: "Imagine RIT", year: "2023 - 2026", city: "Rochester, NY" },
  { name: "Rochester Makerfaire", year: "2024 - 2026", city: "Rochester, NY" },
  { name: "Open Sauce!", year: "2026", city: "San Francisco, CA" },
];

export default function Home() {
  const scrollRef = useRef<HTMLElement>(null);

  const scrollTo = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ensures that we always open at the top of the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {/* Hero with image carousel background */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <Carousel
            className="[&>button,span]:hidden"
            autoplay={true}
            transition={{ duration: 1 }}
            loop={true}
            placeholder={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {heroImages.map((img) => (
              <div key={img.src} className="relative h-full w-screen">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  width={1600}
                  height={900}
                />
              </div>
            ))}
          </Carousel>
          {/* Dark overlay so text is readable */}
          <div className="absolute inset-0 bg-primary/70" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--magenta) 0 2px, transparent 2px 28px)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-32 text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
            // intelligent vending
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl drop-shadow-lg">
            Bits <span className="text-orange -ml-6 -mr-4 md:-ml-8 md:-mr-6 tracking-tighter">‘n</span> Bytes
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/90">
            The Future of Vending, Powered by AI.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={scrollTo}
              className="rounded-md border border-primary-foreground/40 bg-primary/30 backdrop-blur px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              Learn More ↓
            </button>
            <Link
              to="/about"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {[
            { c: "bg-[var(--plum)]", t: "Secured Cabinet", d: "Virtually theft proof." },
            { c: "bg-[var(--magenta)]", t: "AI Vision", d: "Accurately track your purchase." },
            { c: "bg-[var(--orange)]", t: "Hot-Swap Shelves", d: "Adjust to your inventory." },
            { c: "bg-[var(--gold)]", t: "Weight Prediction", d: "Back up the vision model." },
          ].map((f) => (
            <div key={f.t} className="bg-card p-6">
              <div className={`mb-4 h-10 w-10 rounded ${f.c}`} />
              <h3 className="text-lg">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section ref={scrollRef} className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={img1}
            alt={"BnB Cabinet Image"}
            className="h-full w-full object-cover aspect-4/3 rounded-lg"
            width={1600}
            height={900}
          />
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-ring">// about</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Snacks, reinvented.</h2>
            <p className="mt-4 text-muted-foreground">
              Bits 'n Bytes is a cutting-edge modern approach to student vending and self service,
              leveraging the power of AI vision and contactless payment to make purchasing food
              quick and seamless. Featuring weight detection and cameras analyzed by an in-house AI
              vision model, the machine is able to provide real time information on what and when is
              exchanged almost instantaneously, allowing customers to take what they need and be
              charged without needing to wait.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-block font-display text-sm text-ring hover:underline"
            >
              Meet the Team →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 border-y">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-display text-xs uppercase tracking-widest text-ring">
            // how it works
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl">Simplify the student experience.</h2>
          <div className="grid gap-12  grid-cols-1 md:grid-cols-2">
          <div className="mt-10 grid gap-6 md:grid-cols-1">
            {[
              {
                n: "01",
                t: "Tap to open.",
                d: "Use your Student ID or BnB Token to unlock the cabinet.",
              },
              {
                n: "02",
                t: "Take your snacks.",
                d: "Simply reach in and take the snacks you want. We handle the scanning.",
              },
              { n: "03", t: "Close the door.", d: "No tap to pay. Just grab and go." },
            ].map((s) => (
              <div key={s.n} className="rounded-lg border bg-card p-6">
                <div className="font-display text-3xl text-accent">{s.n}</div>
                <h3 className="mt-3 text-xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div>
            <VideoSection />
          </div>
          </div>
        </div>
      </section>

      {/* Events — horizontal scroll bar */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs uppercase tracking-widest text-ring">
              // on the road
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl">Events we've been to:</h2>
          </div>
          {/* <p className="hidden text-sm text-muted-foreground md:block">← scroll →</p> */}
        </div>
        <div className="mt-8 -mx-6 px-6 overflow-x-auto">
          <ul className="sm:py-10 md:flex p-2 gap-4 pb-4 snap-x snap-mandatory">
            {events.map((e) => (
              <li
                key={e.name}
                className="snap-start shrink-0 w-64 rounded-lg border bg-card p-5 transition hover:-translate-y-1 hover:border-accent"
              >
                <div className="font-display text-xs uppercase tracking-widest text-orange">
                  {e.year}
                </div>
                <h3 className="mt-2 text-lg leading-tight">{e.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.city}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-14">
          <div className="flex gap-x-8">
            <img src={CSHLogo} alt="CSH Logo" className="w-20"></img>
            <div className="my-auto">
              <h2 className="text-2xl md:text-3xl">
                Student-Made at <span className="underline">Computer Science House.</span>
              </h2>
              <p className="mt-2 text-primary-foreground/80">
                Check out what else we're working on.
              </p>
            </div>
          </div>
          <Link
            to="https://csh.rit.edu"
            className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            Learn More →
          </Link>
        </div>
      </section>
    </>
  );
}
