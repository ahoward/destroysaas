import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "financial model — destroysaas",
  description:
    "how the co-op gets funded, where the money goes, and how surplus is shared. transparent economics for collective software ownership.",
};

export default async function MoneyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/money" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          the financial model
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          here&apos;s exactly where the money goes. no hidden fees. no investor-first economics.
          one cooperative. two member types. every dollar visible.
        </p>

        {/* money in */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">money in</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the cooperative has two revenue streams. both are straightforward.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                label: "monthly dues",
                value: "all members",
                desc: "every member — businesses and cells alike — pays monthly dues. this funds operating costs: legal fees, insurance, hosting, platform maintenance, board expenses, and the reserve fund.",
              },
              {
                label: "project pledges",
                value: "businesses",
                desc: "businesses pledge toward specific projects on top of dues. pledges are ring-fenced — money pledged for the invoicing tool goes to the invoicing tool, not to general operations. if pledges never hit the funding threshold, nobody pays.",
              },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-[var(--border-primary)] pl-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="font-semibold text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-red-600 font-bold text-sm">{item.value}</p>
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* money out */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">money out</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              cells submit a{" "}
              <span className="text-[var(--text-primary)] font-semibold">monthly budget</span> for
              the coming month&apos;s work — labor, hosting, tools, everything. the budget is
              submitted ahead of time, not after the fact. here&apos;s how it flows:
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                label: "public budgets",
                desc: "every budget is visible to every member of the cooperative. no secret line items. no hidden costs. sunlight is the disinfectant.",
              },
              {
                label: "board review",
                desc: "the elected board reviews and approves budgets as part of routine operations. they can flag anomalies and request justification before payment.",
              },
              {
                label: "efficiency margin",
                desc: "if a cell budgets 100 hours and finishes in 80, they keep the difference. this is by design — it rewards honest, efficient work.",
              },
              {
                label: "budget overruns",
                desc: "the board approves overruns up to 20% of the original budget. anything beyond that requires a vote of the project\u2019s pledging businesses. the cell bears the risk of bad estimates.",
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm shrink-0 w-2 pt-1">&bull;</span>
                <div>
                  <p className="font-semibold mb-1">{item.label}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* governance */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">one member, one vote</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              every member gets one vote on cooperative-wide decisions, regardless of how much
              they&apos;ve pledged or invoiced. a{" "}
              <span className="text-[var(--text-primary)] font-semibold">$50/month business</span> has
              the same vote as a $500/month business. a two-person cell has the same vote as a
              ten-person cell.
            </p>
            <p>
              this is the cooperative principle. from day one. no genesis phase, no weighted voting,
              no special privileges for early members. patronage determines surplus distribution.
              voting is equal.
            </p>
          </div>
        </section>

        {/* cooperative treasury */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">cooperative treasury</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              there is one treasury for the entire cooperative — not one per cell, not one per
              project.{" "}
              <span className="text-[var(--text-primary)] font-semibold">
                every transaction is visible to every member
              </span>
              . dues flow in. project pledges flow into ring-fenced funds. approved budgets flow out
              to cells.
            </p>
            <p>
              the board manages the treasury as part of their elected duties. they report monthly to
              the full membership. if the membership doesn&apos;t like what they see, they elect a
              new board.
            </p>
          </div>
        </section>

        {/* patronage */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">patronage &amp; surplus</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the cooperative tracks{" "}
              <span className="text-[var(--text-primary)] font-semibold">patronage</span> — how much
              each member has contributed over time. this is standard cooperative practice and
              determines how year-end surplus gets distributed.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                label: "business patronage",
                value: "dues + pledges",
                desc: "you contributed money toward operating costs and specific projects — that\u2019s your patronage.",
              },
              {
                label: "cell patronage",
                value: "dues + paid budgets",
                desc: "your dues plus the budgets the cooperative actually paid for your work. based on what was spent, not what was requested.",
              },
              {
                label: "surplus split",
                value: "50/50",
                desc: "year-end surplus is split into two pools. 50% to the business pool, distributed pro-rata by each business\u2019s total dues + pledges. 50% to the cell pool, distributed pro-rata by each cell\u2019s total dues + paid budgets. each class benefits from the value they created.",
              },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-[var(--border-primary)] pl-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="font-semibold text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-red-600 font-bold text-sm">{item.value}</p>
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the 50/50 split is a starting point. the membership can vote to adjust it.
              patronage is tracked automatically. no manual accounting.
            </p>
          </div>
        </section>

        {/* exit protections */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">exit protections</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the system is designed so{" "}
              <span className="text-[var(--text-primary)] font-semibold">nobody gets screwed on the way out</span>:
            </p>
            <div className="border-l-2 border-[var(--border-primary)] pl-6 space-y-3 mt-4">
              <p>
                <span className="text-[var(--text-primary)] font-semibold">membership is voluntary</span> —
                any member can leave at any time. you stop paying dues, you lose governance rights.
                no lock-in, no penalties.
              </p>
              <p>
                <span className="text-[var(--text-primary)] font-semibold">no external sales</span> —
                membership interests can&apos;t be sold to outside parties without cooperative
                approval. this prevents hostile takeovers and ensures the co-op stays in the hands
                of the people who use it.
              </p>
              <p>
                <span className="text-[var(--text-primary)] font-semibold">fork freedom</span> —
                if you leave, you take the code and your data. the software is open-source.
                you lose governance rights, not access. you can fork the code — you can&apos;t fork
                the membership, the brand, or the treasury.
              </p>
              <p>
                <span className="text-[var(--text-primary)] font-semibold">the safety valve</span> —
                if the cooperative ever stops serving its members, the members can walk. the code
                goes with them. what you get as a member that you don&apos;t get from just forking:
                hosted infrastructure, ongoing maintenance, governance rights, community support,
                new features, and the cooperative&apos;s brand and trust.
              </p>
            </div>
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-semibold leading-relaxed">
              the bottom line: every dollar is visible. every budget is public. every member has
              one vote. surplus goes back to the people who created it. and if you leave, you leave
              with the code — the only thing you lose is the seat you chose to walk away from.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">see how your rights are protected</p>
          <a
            href="/about/legal"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            the legal model &rarr;
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
