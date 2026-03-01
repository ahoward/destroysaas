import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { is_sudo, is_member } from "@/lib/groups";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "business models — destroysaas",
  description:
    "three models for how money moves through destroysaas. pick one.",
};

const models = [
  {
    name: "pass-through",
    pitch: "platform as pipe",
    flow: [
      "user pays $50/mo via stripe",
      "platform keeps 10% ($5)",
      "cell receives 90% ($45)",
      "cell paid monthly, auto, contingent on uptime",
    ],
    details: [
      {
        label: "collection",
        text: "stripe subscription. platform is merchant of record. one payment, one relationship.",
      },
      {
        label: "platform revenue",
        text: "10% flat take-rate on all payments. always. no formation fees, no setup costs, no tiers.",
      },
      {
        label: "cell payment",
        text: "90% auto-transferred monthly via stripe connect. no invoicing. no approval gates. money moves on the 1st.",
      },
      {
        label: "sla",
        text: "cell must maintain 99% uptime + respond to bugs within 48 hours. miss the SLA → payment held, members vote to release or replace.",
      },
      {
        label: "equity",
        text: "1 share per member. equal. join = 1 share. leave = share reverts. no accumulation, no dilution, no math.",
      },
      {
        label: "exit",
        text: "stop paying. fork the code. done.",
      },
    ],
    vibe: "patreon for software co-ops. simplest possible. platform handles everything.",
    pros: [
      "lowest complexity — one stripe integration, one flow",
      "cell gets paid automatically, no bureaucracy",
      "easy to explain to a non-technical business owner",
      "platform revenue scales linearly with usage",
    ],
    cons: [
      "members have less visibility into where money goes",
      "platform is a single point of failure for payments",
      "equal shares means early adopters get no extra reward",
      "10% may feel high for large cells ($10k/mo = $1k to platform)",
    ],
  },
  {
    name: "treasury",
    pitch: "platform as bank",
    flow: [
      "user pays $50/mo via stripe",
      "100% goes to cell treasury (open collective)",
      "cell invoices treasury monthly",
      "auto-approved if SLA met, members can dispute",
      "platform charges $50/mo flat fee per active cell",
    ],
    details: [
      {
        label: "collection",
        text: "stripe subscription. money flows to an open collective collective. every transaction visible to every member.",
      },
      {
        label: "platform revenue",
        text: "flat $50/mo per active cell + one-time $500 formation fee. predictable. doesn't scale with cell size — platform isn't incentivized to inflate costs.",
      },
      {
        label: "cell payment",
        text: "cell submits monthly invoice to treasury. auto-approved if SLA metrics are green. any member can flag for review. disputed invoices go to member vote.",
      },
      {
        label: "sla",
        text: "same bar — 99% uptime, 48-hour bug response. but the treasury is transparent, so members see exactly what they're paying for.",
      },
      {
        label: "equity",
        text: "1 share per $100 contributed (cumulative). more you pay, more you own. capped at 20% — no single member dominates.",
      },
      {
        label: "exit",
        text: "stop paying. shares freeze. code is yours. treasury continues without you.",
      },
    ],
    vibe: "credit union. members see and control the money. platform charges rent for infrastructure.",
    pros: [
      "full financial transparency — every dollar visible",
      "members have real control over cell payments",
      "flat platform fee means no conflict of interest",
      "equity reflects contribution — early adopters rewarded",
    ],
    cons: [
      "requires open collective integration (second system)",
      "invoice approval adds friction to cell payment",
      "share cap math adds complexity",
      "flat fee means small cells subsidize platform disproportionately",
    ],
  },
  {
    name: "marketplace",
    pitch: "platform as matchmaker",
    flow: [
      "user pays $50/mo via stripe",
      "money held in escrow until milestone delivered",
      "cell delivers milestone → funds release",
      "platform keeps 15% ($7.50) on release",
      "post-launch: monthly maintenance, same 15% cut",
    ],
    details: [
      {
        label: "collection",
        text: "stripe subscription. money held in platform escrow. nothing moves until work is delivered and approved.",
      },
      {
        label: "platform revenue",
        text: "15% of every payout — milestone or maintenance. higher rate, but platform bears escrow risk and handles disputes.",
      },
      {
        label: "cell payment",
        text: "milestone-based during build (MVP in 4 milestones). monthly after launch. members approve each release before funds move.",
      },
      {
        label: "sla",
        text: "milestones defined upfront. members approve each delivery. no approval = no payment = cell gets replaced. post-launch SLA same as other models.",
      },
      {
        label: "equity",
        text: "none. pure service relationship. you're buying a maintained product, not shares in an entity. no co-op overhead.",
      },
      {
        label: "exit",
        text: "stop paying. fork the code. no shares to worry about.",
      },
    ],
    vibe: "upwork meets open-source. no co-op complexity. just pay for results.",
    pros: [
      "strongest accountability — no pay without delivery",
      "no equity complexity, no share tracking, no governance",
      "clear incentive alignment: cell ships, cell gets paid",
      "easiest to understand: you pay for working software",
    ],
    cons: [
      "15% is the highest take-rate of the three",
      "escrow adds complexity to stripe integration",
      "milestone approval can slow down cell payment",
      "no ownership stake — members are customers, not co-owners",
    ],
  },
];

const comparisonRows = [
  {
    label: "platform takes",
    values: ["10% always", "$50/mo + $500 setup", "15% on payouts"],
  },
  {
    label: "who holds money",
    values: ["platform (stripe)", "treasury (open collective)", "platform (escrow)"],
  },
  {
    label: "cell gets paid",
    values: ["monthly auto", "monthly invoice", "on milestone / monthly"],
  },
  {
    label: "equity",
    values: ["1 share / member", "1 share / $100 paid", "none"],
  },
  {
    label: "transparency",
    values: ["platform reports", "full treasury visibility", "milestone tracking"],
  },
  {
    label: "complexity",
    values: ["lowest", "medium", "low"],
  },
  {
    label: "best for",
    values: ["speed + simplicity", "member control", "results-focused"],
  },
];

export default async function ModelsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const authorized =
    (await is_sudo(supabase, user)) ||
    (await is_member(supabase, user.id, "cabal"));

  if (!authorized) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/models" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          three business models
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-4">
          how money moves through destroysaas. pick one.
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-16">
          every model shares the same foundation: businesses pledge $25&ndash;$500/month
          for software they need. at $1,000/month, a cell forms. code is always
          open-source. data is always yours. you can always leave.
        </p>

        {/* models */}
        {models.map((model, i) => (
          <section key={model.name} className={i < models.length - 1 ? "mb-20" : "mb-16"}>
            {/* model header */}
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
              model {i + 1}
            </h2>
            <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
              &ldquo;{model.name}&rdquo;
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">{model.pitch}</p>

            {/* money flow */}
            <div className="border border-[var(--border-primary)] rounded-lg p-5 mb-6 bg-[var(--bg-secondary)]">
              <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
                money flow
              </p>
              <div className="space-y-1 font-mono text-sm">
                {model.flow.map((step, j) => (
                  <p key={j} className="text-[var(--text-secondary)]">
                    {j === 0 ? "" : "→ "}
                    {step}
                  </p>
                ))}
              </div>
            </div>

            {/* details */}
            <div className="space-y-4 mb-6">
              {model.details.map((detail) => (
                <div key={detail.label} className="flex gap-4">
                  <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-24 pt-0.5">
                    {detail.label}
                  </span>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {detail.text}
                  </p>
                </div>
              ))}
            </div>

            {/* vibe */}
            <div className="border-l-2 border-red-600 pl-6 mb-6">
              <p className="text-[var(--text-primary)] font-medium text-sm">
                {model.vibe}
              </p>
            </div>

            {/* pros / cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  pros
                </p>
                <ul className="space-y-1">
                  {model.pros.map((pro) => (
                    <li
                      key={pro}
                      className="text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      + {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  cons
                </p>
                <ul className="space-y-1">
                  {model.cons.map((con) => (
                    <li
                      key={con}
                      className="text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      &ndash; {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* comparison table */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            side by side
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-primary)]">
                  <th className="text-left py-2 pr-4 text-[var(--text-muted)] font-normal"></th>
                  <th className="text-left py-2 px-3 text-[var(--text-primary)] font-semibold lowercase">
                    pass-through
                  </th>
                  <th className="text-left py-2 px-3 text-[var(--text-primary)] font-semibold lowercase">
                    treasury
                  </th>
                  <th className="text-left py-2 px-3 text-[var(--text-primary)] font-semibold lowercase">
                    marketplace
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-[var(--border-primary)]"
                  >
                    <td className="py-2 pr-4 text-[var(--text-muted)] font-medium text-xs uppercase tracking-wide whitespace-nowrap">
                      {row.label}
                    </td>
                    {row.values.map((val, j) => (
                      <td
                        key={j}
                        className="py-2 px-3 text-[var(--text-secondary)]"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              all three models deliver the same outcome: businesses collectively
              fund software they own, built by accountable cooperatives, with
              open-source code and fork freedom. the difference is where the
              money sits, when it moves, and how much control members have over
              the flow.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">
            see how the numbers work in practice
          </p>
          <a
            href="/math"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            the math &rarr;
          </a>
          <a
            href="/about/money"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-3 sm:mt-0"
          >
            current financial model &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
