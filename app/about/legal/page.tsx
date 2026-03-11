import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "legal model — destroysaas",
  description:
    "how destroysaas gives you real legal standing over the software you fund. one cooperative, real ownership, fork freedom.",
};

export default async function LegalPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/legal" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          the legal model
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          you have more rights here than you&apos;ve ever had as a saas customer.
        </p>

        {/* what you own */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">what you own</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              destroysaas is a{" "}
              <span className="text-[var(--text-primary)] font-medium">Limited Cooperative Association (LCA)</span> —
              a real legal entity recognized by state law. you&apos;re not a &ldquo;user.&rdquo;
              you&apos;re a <span className="text-[var(--text-primary)] font-medium">member-owner</span> with
              a share of the cooperative, voting rights, and enforceable standing.
            </p>
            <p>
              this is the core difference. a saas vendor can change terms, raise prices, get acquired, or shut down —
              and your only recourse is to cancel. a cooperative member can{" "}
              <span className="text-[var(--text-primary)] font-medium">vote, sue, and enforce</span>.
              you have standing in court. you have a seat at the table. the software answers to you, not shareholders.
            </p>
          </div>
        </section>

        {/* governance */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">governance</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              governance is simple:{" "}
              <span className="text-[var(--text-primary)] font-medium">one member, one vote</span> from
              day one. a $50/month business has the same vote as a $500/month business. a two-person
              cell has the same vote as a ten-person cell. no weighted voting, no special share classes,
              no genesis phases.
            </p>
            <p>
              the cooperative elects a{" "}
              <span className="text-[var(--text-primary)] font-medium">board of directors</span> annually
              from its membership. the board handles day-to-day operations — reviewing monthly budgets,
              approving routine new members, fast-tracking uncontested projects, mediating disputes, and
              managing the cooperative&apos;s operating expenses. any member can run. the board reports
              monthly to the full membership.
            </p>
            <p>
              big decisions — changing bylaws, adjusting dues, replacing a cell, admitting new cell
              members — go to a{" "}
              <span className="text-[var(--text-primary)] font-medium">
                full member vote
              </span>. transparent by default.
            </p>
          </div>
        </section>

        {/* fork freedom */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">fork freedom</h2>
          <div className="border-l-2 border-red-600 pl-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              all code produced by a cell is open-source under AGPL or MIT.
              your data belongs to you. if you want to leave, you take{" "}
              <span className="text-[var(--text-primary)] font-medium">everything</span> — the code,
              your data, and the right to run it yourself.
            </p>
            <p>
              this isn&apos;t a marketing promise. it&apos;s a legal obligation baked into the LCA operating
              agreement. fork freedom is the default, not a feature.
            </p>
          </div>
        </section>

        {/* cells */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">cells</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              cells are small product teams — typically cooperatives themselves — that design, build,
              and maintain software. they&apos;re not outside contractors.
              they&apos;re{" "}
              <span className="text-[var(--text-primary)] font-medium">member organizations</span> of
              the cooperative, with the same voting rights as any business member. they pay dues.
              they have skin in the game.
            </p>
            <p>
              cells bid on approved projects and submit{" "}
              <span className="text-[var(--text-primary)] font-medium">monthly budgets</span> for
              their work. every budget is public — every member of the cooperative can review every
              line item. the board reviews and approves budgets as part of routine operations.
              no secret costs, no hidden margins.
            </p>
            <p>
              all work is{" "}
              <span className="text-[var(--text-primary)] font-medium">work-for-hire</span>.
              intellectual property belongs to the cooperative, not the cell.
              if a cell underperforms or walks away, the cooperative votes to replace them and
              routes the project to a new cell.{" "}
              <span className="text-[var(--text-primary)] font-medium">
                the software survives the cell
              </span>. always.
            </p>
          </div>
        </section>

        {/* dispute resolution */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">dispute resolution</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "direct communication",
                desc: "members and cells resolve issues through direct conversation first. most things get handled here.",
              },
              {
                step: "2",
                title: "board mediation",
                desc: "if direct communication fails, the board reviews the deliverables against the cell's proposal and budget, and makes a ruling. either party can appeal to a full member vote.",
              },
              {
                step: "3",
                title: "legal recourse",
                desc: "if governance fails, you have standing to enforce your rights in court. you're a co-owner of a legal entity, not a customer clicking \"I agree.\"",
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

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              the bottom line: you own a share of a cooperative that owns the software, the data,
              and the infrastructure. you can vote, sue, fork, and leave. try doing that with salesforce.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">see how the money works</p>
          <a
            href="/about/money"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            the financial model &rarr;
          </a>
          <a
            href="/about"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-3 sm:mt-0"
          >
            back to about &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
