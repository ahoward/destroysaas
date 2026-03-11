import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "cells — destroysaas",
  description:
    "small product teams that join destroysaas as equal cooperative members. they bid on projects, submit public budgets, and vote alongside businesses.",
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
          small product teams that join destroysaas as equal cooperative members.
          they bid on projects, submit public budgets, and share in governance.
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

        {/* how it works */}
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
                title: "the board approves the project",
                desc: "when total monthly pledges reach $1,000/month, pledges lock. the cooperative board reviews and approves the project.",
              },
              {
                step: "4",
                title: "cells bid",
                desc: "certified cells submit bids on the approved project. each bid establishes a monthly cap — the maximum the cell can draw each month to deliver and operate it.",
              },
              {
                step: "5",
                title: "the cooperative picks the winner",
                desc: "business members who funded the idea evaluate bids and select a cell. that cell becomes responsible for building, shipping, and operating the product.",
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

        {/* what a cell is */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            what a cell is
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              a cell is a{" "}
              <span className="text-[var(--text-primary)] font-medium">small product team</span> &mdash;
              typically a cooperative themselves &mdash; that joins destroysaas as a full member.
              not a vendor. not a contractor. a{" "}
              <span className="text-[var(--text-primary)] font-medium">co-owner</span>.
            </p>
            <p>
              cells pay dues, vote on cooperative decisions, and sit at the same table as the
              businesses they serve. one member, one vote &mdash; whether you&apos;re a cell or a
              business. that&apos;s the deal.
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

        {/* bids and budgets */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            bids and budgets
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              when a cell wins a project, their bid establishes a{" "}
              <span className="text-[var(--text-primary)] font-medium">monthly cap</span> &mdash;
              the maximum they can draw from the cooperative treasury each month for that project.
            </p>
            <p>
              every month the cell submits a{" "}
              <span className="text-[var(--text-primary)] font-medium">public budget</span> drawn
              against that cap. every member can see it. the board reviews it.
              there are no hidden invoices.
            </p>
            <p>
              efficient cells keep the margin. if your cap is $4,000/month and you deliver for
              $2,800, you keep the $1,200. this{" "}
              <span className="text-[var(--text-primary)] font-medium">rewards good work</span>,
              not billable hours.
            </p>
          </div>
        </section>

        {/* governance */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            governance
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              cells are{" "}
              <span className="text-[var(--text-primary)] font-medium">equal members</span> of
              the cooperative. they vote on budgets, new members, project approvals, and
              everything else &mdash; same as any business member.
            </p>
            <p>
              if a cell underperforms on a project, the cooperative can vote to{" "}
              <span className="text-[var(--text-primary)] font-medium">reassign the project</span> to
              another cell. but the cell keeps their membership. losing a project is not
              losing your seat.
            </p>
            <p>
              the cooperative owns the code &mdash; all work is{" "}
              <span className="text-[var(--text-primary)] font-medium">work-for-hire</span>.
              but all code is open-source, so the work is public and the software survives
              any single team. no lock-in. no single point of failure.
            </p>
          </div>
          <div className="border-l-2 border-red-600 pl-6 mt-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              the software survives the cell. always. the code is open-source, the data belongs
              to the cooperative, and collective ownership ensures continuity.
            </p>
          </div>
        </section>

        {/* certification */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            becoming a cell
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              cell certification has three steps: you apply, the board reviews your team,
              and existing members vote to admit you. once admitted, you&apos;re a{" "}
              <span className="text-[var(--text-primary)] font-medium">full member</span> of
              the cooperative with all the rights and responsibilities that entails.
            </p>
          </div>
          <div className="space-y-3 mt-6">
            {[
              "you think in products, not tickets",
              "you can design, build, and deploy with 2\u20135 people",
              "you want to co-own the outcome, not just bill for hours",
              "you believe small teams beat big teams",
              "you want a vote in how the cooperative runs",
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
              if you can ship product, there&apos;s a seat at the table &mdash; as an equal.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">
            ready to co-own software that belongs to the people who use it?
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
            browse approved projects &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
