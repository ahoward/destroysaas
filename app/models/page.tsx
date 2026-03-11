import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { is_sudo, is_member } from "@/lib/groups";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "financial model — destroysaas",
  description:
    "how money moves through the cooperative. one model. no take-rate.",
};

const moneyIn = [
  {
    label: "monthly dues",
    text: "every member pays dues — businesses and cells alike. dues fund operating costs: legal, insurance, hosting, platform maintenance, board expenses, and the reserve fund.",
  },
  {
    label: "project pledges",
    text: "businesses pledge toward specific projects on top of dues. pledges are ring-fenced — money pledged for the invoicing tool goes to the invoicing tool, not to general operations.",
  },
];

const moneyOut = [
  {
    label: "cell budgets",
    text: "cells submit a monthly budget for the coming month's work, drawing against the cap established in their bid. budgets are public. the elected board reviews and approves before payment.",
  },
  {
    label: "operating costs",
    text: "legal fees, insurance, hosting, platform maintenance, board expenses, reserve fund. funded by dues, not by skimming project pledges.",
  },
];

const details = [
  {
    label: "take-rate",
    text: "zero. the cooperative doesn't skim a percentage off the top. there is no 10%, no 15%, no formation fee, no certification fee. dues cover operations. pledges fund projects. that's it.",
  },
  {
    label: "budgets",
    text: "monthly, submitted ahead of time, public. every member can review every budget. the board approves before payment. cells that finish early keep the margin — rewarding efficiency, not billing.",
  },
  {
    label: "budget caps",
    text: "a cell's monthly budget cannot exceed the project's pledged revenue. the money in caps the money out. if pledges drop, the budget scales down automatically.",
  },
  {
    label: "surplus",
    text: "year-end surplus is split 50/50 — half to a business pool (distributed pro-rata by dues + pledges), half to a cell pool (distributed pro-rata by dues + paid budgets). each class benefits from the value they created.",
  },
  {
    label: "equity",
    text: "one member, one vote. regardless of how much you've pledged or invoiced. patronage tracks contributions over time for surplus distribution, but voting is always equal.",
  },
  {
    label: "exit",
    text: "stop paying. fork the code. done. all code is open-source. you can leave any time.",
  },
];

const safeguards = [
  "public budgets — every budget is visible to every member",
  "board review — elected board reviews and approves budgets monthly",
  "the vote — any member can call a vote to replace an underperforming cell",
  "competition — other cells can bid to take over a project",
  "budget-pledge alignment — money in caps money out, always",
  "pledge churn protection — if revenue drops, budgets scale down automatically",
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
          the financial model
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-4">
          how money moves through the cooperative. one model. no take-rate.
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-16">
          destroysaas is a cooperative — not a platform. businesses and cells
          are all members of the same organization. both pay dues. both vote.
          there is no investor class, no platform class, no middleman skimming
          a percentage.
        </p>

        {/* money flow */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            overview
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            money flow
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            two streams in, two streams out
          </p>

          <div className="border border-[var(--border-primary)] rounded-lg p-5 mb-6 bg-[var(--bg-secondary)]">
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3">
              how it moves
            </p>
            <div className="space-y-1 font-mono text-sm">
              <p className="text-[var(--text-secondary)]">
                members pay monthly dues
              </p>
              <p className="text-[var(--text-secondary)]">
                &rarr; dues fund cooperative operating costs
              </p>
              <p className="text-[var(--text-secondary)]">
                businesses pledge toward specific projects
              </p>
              <p className="text-[var(--text-secondary)]">
                &rarr; pledges fund cell budgets (ring-fenced per project)
              </p>
              <p className="text-[var(--text-secondary)]">
                &rarr; year-end surplus split 50/50 between business pool and cell pool
              </p>
            </div>
          </div>
        </section>

        {/* money in */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            revenue
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            money in
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            dues from all members, pledges from businesses
          </p>

          <div className="space-y-4 mb-6">
            {moneyIn.map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-24 pt-0.5">
                  {item.label}
                </span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* money out */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            expenses
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            money out
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            cell budgets and operating costs
          </p>

          <div className="space-y-4 mb-6">
            {moneyOut.map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-24 pt-0.5">
                  {item.label}
                </span>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* details */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            details
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            how it works
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            no take-rate. public budgets. surplus shared.
          </p>

          <div className="space-y-4 mb-6">
            {details.map((detail) => (
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
              credit union for software. members fund it, members own it,
              members see every dollar. the cooperative is the platform.
            </p>
          </div>
        </section>

        {/* safeguards */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">
            accountability
          </h2>
          <h3 className="text-2xl font-bold tracking-tight lowercase mb-1">
            what prevents abuse
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            transparency and competition
          </p>

          <ul className="space-y-1">
            {safeguards.map((item) => (
              <li
                key={item}
                className="text-sm text-[var(--text-secondary)] leading-relaxed"
              >
                + {item}
              </li>
            ))}
          </ul>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              businesses collectively fund software they own, built by
              accountable cooperatives, with open-source code and fork
              freedom. no take-rate. no middleman. every dollar visible to
              every member.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">
            see how the numbers work in practice
          </p>
          <a
            href="/about/math"
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
