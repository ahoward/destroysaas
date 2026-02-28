import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "cells — destroysaas",
  description:
    "full-service product cooperatives that design, build, and operate software for the collective. not dev shops — micro product companies.",
};

type Cell = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  skills: string[];
  created_at: string;
};

export default async function CellsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: cellData } = await supabase
    .from("cells")
    .select("id, name, description, website, skills, created_at")
    .order("name");

  const approved: Cell[] = cellData ?? [];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cells" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          cells
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          full-service product cooperatives that design, build, and operate
          software for the collective.
        </p>

        {/* cell listing */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            certified cells
          </h2>
          {approved.length === 0 ? (
            <div className="border border-[var(--border-primary)] rounded-lg p-8 text-center">
              <p className="text-[var(--text-muted)] mb-4">no certified cells yet.</p>
              <a
                href="/cells/apply"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
              >
                be the first to apply &rarr;
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {approved.map((cell) => (
                <div key={cell.id} className="border border-[var(--border-primary)] rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-semibold">{cell.name}</h3>
                    {cell.website && (
                      <a
                        href={cell.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                      >
                        website &rarr;
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">{cell.description}</p>
                  {cell.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {cell.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs border border-[var(--border-secondary)] text-[var(--text-secondary)] rounded px-2 py-0.5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* the cell model */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            how it works
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "a business submits an idea",
                desc: "you have a software problem. you describe it, name what you'd pay monthly, and post it to the board.",
              },
              {
                step: "2",
                title: "others pledge",
                desc: "other businesses with the same problem pledge their own monthly commitment. $25 to $500 — whatever makes sense.",
              },
              {
                step: "3",
                title: "the threshold hits",
                desc: "when total monthly pledges reach $1,000/month, pledges lock. a legal entity forms. the idea is now funded.",
              },
              {
                step: "4",
                title: "cells compete",
                desc: "certified cells build working MVPs — product thinking, design, and code. no spec decks. no pitch decks. running product.",
              },
              {
                step: "5",
                title: "the collective picks the winner",
                desc: "the business owners who funded the idea choose the best product. that cell earns the contract to build and operate it long-term.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold mb-1">{item.title}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* what a cell owns */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            what a cell owns
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              a cell is not a dev shop. it&apos;s a{" "}
              <span className="text-[var(--text-primary)] font-medium">micro product company</span> that
              operates under contract to its collective.
            </p>
            <p>
              cells own the full stack &mdash;{" "}
              <span className="text-[var(--text-primary)] font-medium">product, design, engineering, and operations</span>.
              they take a problem from a business owner, figure out what to build, build it, ship it,
              and keep it running. there is no separate &ldquo;product manager&rdquo; role &mdash;
              the cell <em>is</em> the product team.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { label: "product direction", desc: "what to build and why" },
                { label: "design", desc: "UX, interface, and brand" },
                { label: "engineering", desc: "code, infrastructure, CI/CD" },
                { label: "operations", desc: "hosting, uptime, support" },
              ].map((item) => (
                <div key={item.label} className="border border-[var(--border-primary)] rounded-lg p-4">
                  <p className="font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* how cells compete */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            how cells compete
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              when an idea gets funded, certified cells compete by{" "}
              <span className="text-[var(--text-primary)] font-medium">shipping working MVPs</span>.
              not slide decks. not architecture diagrams. running product that solves the problem.
            </p>
            <p>
              the business owners who funded the idea evaluate the MVPs and pick the winner.
              they&apos;re not judging code quality — they&apos;re judging{" "}
              <span className="text-[var(--text-primary)] font-medium">product vision + execution</span>.
              does this solve my problem? is it easy to use? does the team understand my business?
            </p>
            <p>
              the winning cell earns the long-term contract. the losing cells walk away with
              experience and a public portfolio piece. everybody ships.
            </p>
          </div>
        </section>

        {/* the contract */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the contract
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              cells are{" "}
              <span className="text-[var(--text-primary)] font-medium">contractors, not owners</span>.
              the collective owns the software, the data, and the IP. the cell operates it under a
              strict SLA covering uptime, bug resolution, and delivery timelines.
            </p>
            <p>
              cells draw from the collective&apos;s treasury monthly, contingent on hitting their
              metrics. if a cell underperforms, abandons the project, or breaches the SLA, the
              collective votes to sever the contract and route to a new cell.
            </p>
          </div>
          <div className="border-l-2 border-red-600 pl-6 mt-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              the software survives the cell. always. the code is open-source, the data belongs
              to the collective, and the legal entity ensures continuity. no single point of failure.
            </p>
          </div>
        </section>

        {/* who should apply */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            who should apply
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              cells are small, opinionated teams who can own a product end-to-end.
              if you need a 20-person org chart to ship, this isn&apos;t for you.
              if you can go from problem to production with 2&ndash;5 people, keep reading.
            </p>
          </div>
          <div className="space-y-3 mt-6">
            {[
              "you think in products, not tickets",
              "you can design, build, and deploy without a PM hovering",
              "you want to own the outcome, not just write code",
              "you believe small teams beat big teams",
              "you want recurring revenue tied to real impact",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-red-600 font-bold shrink-0 mt-0.5">&bull;</span>
                <p className="text-sm text-[var(--text-secondary)]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              cells are how software gets built without venture capital, without enterprise
              sales teams, and without extracting wealth from the people who need it most.
              if you can ship product, there&apos;s a seat at the table.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">
            ready to build software that belongs to the people who use it?
          </p>
          <a
            href="/cells/apply"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            apply to become a cell &rarr;
          </a>
          <a
            href="/ideas"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-3 sm:mt-0"
          >
            browse funded ideas &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
