import Link from "next/link";

const stats = [
  { label: "Docs Sections", value: "12+" },
  { label: "Interactive Blocks", value: "24" },
  { label: "Search Ready", value: "Live" },
];

const highlights = [
  {
    title: "Structured for speed",
    description:
      "Information is arranged to help you move from overview to implementation without losing momentum.",
  },
  {
    title: "Built for scanning",
    description:
      "Large headings, sharp contrast, and card-based grouping make the docs feel fast before you read a word.",
  },
  {
    title: "Ready for growth",
    description:
      "The landing page sets the tone now, while the docs system is already wired for deeper content later.",
  },
];

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fff7db_0%,#f6efe2_32%,#dce7ea_65%,#f4f1ea_100%)] text-zinc-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-8rem] left-[-4rem] h-72 w-72 rounded-full bg-amber-300/35 blur-3xl animate-pulse" />
        <div className="absolute top-24 right-[-5rem] h-80 w-80 rounded-full bg-sky-300/30 blur-3xl animate-pulse [animation-delay:700ms]" />
        <div className="absolute bottom-[-7rem] left-1/3 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl animate-pulse [animation-delay:1400ms]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(24,24,27,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 py-8 md:px-10 lg:px-12">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.35em] text-zinc-500 uppercase">
              Donggyu Docs
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Documentation with presence, not just paragraphs.
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/docs"
              className="rounded-full border border-zinc-900/15 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            >
              Enter Docs
            </Link>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/60 px-4 py-2 text-sm text-zinc-700 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live docs system powered by Next.js and Nextra
            </div>

            <h1 className="mt-8 max-w-4xl font-serif text-6xl leading-[0.92] tracking-[-0.06em] text-zinc-950 sm:text-7xl lg:text-8xl">
              Make the
              <span className="block text-zinc-500">first page feel</span>
              unforgettable.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">
              This landing experience is designed to feel editorial, tactile,
              and a little dramatic. It invites people into your docs instead
              of dumping them at a link list.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/docs"
                className="group inline-flex items-center justify-center rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-zinc-800"
              >
                Open the docs
                <span className="ml-3 transition group-hover:translate-x-1">
                  {">"}
                </span>
              </Link>
              <a
                href="#highlights"
                className="inline-flex items-center justify-center rounded-full border border-zinc-900/15 bg-white/70 px-7 py-4 text-sm font-semibold text-zinc-800 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
              >
                See the system
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/70 bg-white/55 p-5 shadow-[0_20px_60px_rgba(20,20,20,0.08)] backdrop-blur transition hover:-translate-y-1"
                >
                  <p className="text-3xl font-semibold tracking-tight text-zinc-950">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.12))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.12)] backdrop-blur">
              <div className="flex items-center justify-between border-b border-zinc-900/10 pb-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.28em] text-zinc-400 uppercase">
                    Experience Layer
                  </p>
                  <p className="mt-2 text-lg font-semibold text-zinc-950">
                    A homepage that feels alive
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-[1.5rem] bg-zinc-950 p-5 text-white transition hover:-translate-y-1">
                  <p className="text-xs tracking-[0.22em] text-zinc-400 uppercase">
                    Hero Narrative
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight">
                    Bold typography, atmospheric gradients, layered depth.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-zinc-900/10 bg-amber-50/80 p-5 transition hover:rotate-[-1deg] hover:scale-[1.01]">
                    <p className="text-sm font-semibold text-zinc-900">
                      Guided entry
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-700">
                      Visitors know where to click, what matters first, and why
                      the docs deserve attention.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-zinc-900/10 bg-sky-50/80 p-5 transition hover:rotate-[1deg] hover:scale-[1.01]">
                    <p className="text-sm font-semibold text-zinc-900">
                      Motion without noise
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-700">
                      Hover lifts, soft pulses, and layered blur add energy
                      without turning the page into a toy.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-zinc-900/10 bg-white/80 p-5">
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>Landing Confidence</span>
                    <span>94%</span>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-200">
                    <div className="h-full w-[94%] rounded-full bg-[linear-gradient(90deg,#111827,#0f766e,#f59e0b)]" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-zinc-700">
                    The page signals quality before the first paragraph starts.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section
          id="highlights"
          className="grid gap-4 border-t border-zinc-900/10 py-8 md:grid-cols-3"
        >
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/70 bg-white/45 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.05)] backdrop-blur transition hover:-translate-y-1"
            >
              <p className="text-lg font-semibold text-zinc-950">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
