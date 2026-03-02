import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "governance — destroysaas",
  description:
    "how destroysaas itself is structured, funded, and governed. transparency about what this project is today and where it's headed.",
};

export default async function GovernancePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/governance" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          how destroysaas itself works
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          if we&apos;re going to tell you that ownership and transparency matter,
          we should start with ourselves.
        </p>

        {/* what it is today */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            what it is today
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              destroysaas is a{" "}
              <span className="text-[var(--text-primary)] font-medium">personal project</span>.
              it was started by{" "}
              <a href="/about/authors/ara-t-howard" className="text-red-500 hover:text-red-400 transition-colors">
                ara t. howard
              </a>{" "}
              — a software engineer who has spent 30 years building tools for other people and
              wants to see small businesses stop renting software they should own.
            </p>
            <p>
              there is no corporation behind this. no venture capital. no board of directors.
              no investors to pay back. right now it&apos;s one person with a domain name,
              a codebase, and a thesis.
            </p>
            <p>
              we think that&apos;s worth being honest about.
            </p>
          </div>
        </section>

        {/* formation in progress */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            becoming an LCA
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              destroysaas is in the process of formalizing as a{" "}
              <span className="text-[var(--text-primary)] font-medium">
                Colorado Limited Cooperative Association
              </span>{" "}
              under the Uniform Limited Cooperative Association Act (C.R.S. Title 7, Article 58).
              we&apos;re eating our own cooking — the platform that tells every cell to organize
              as a cooperative is becoming one itself.
            </p>
            <p>
              the structure is a multi-stakeholder cooperative with three patron member classes:
              SMB members (businesses that fund software), commons members (individuals who
              join the movement), and cell members (product cooperatives that build the tools).
              no investor members. one member, one vote.
            </p>
            <p>
              our formation documents are public and open for review. this is how we do things
              — in the open, with trust as the foundation.
            </p>
          </div>
        </section>

        {/* formation documents */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            formation documents
          </h2>
          <div className="space-y-4">
            <a
              href="/about/governance/bylaws"
              className="block border border-[var(--border-primary)] rounded-lg p-5 hover:border-red-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">bylaws</p>
                <span className="text-xs text-red-600 font-medium border border-red-600 rounded px-1.5 py-0.5">draft</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                the internal governance document. member classes, voting rights, board structure,
                patronage allocation, transparency commitments, and dispute resolution.
              </p>
            </a>
            <a
              href="/about/governance/articles"
              className="block border border-[var(--border-primary)] rounded-lg p-5 hover:border-red-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">articles of organization</p>
                <span className="text-xs text-red-600 font-medium border border-red-600 rounded px-1.5 py-0.5">draft</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                the formation filing for the Colorado Secretary of State. purpose, member classes,
                liability protections, and organizer information.
              </p>
            </a>
          </div>
          <p className="text-[var(--text-secondary)] text-sm mt-6 leading-relaxed">
            these documents are inspired by the open-source governance of{" "}
            <a href="https://www.dojo4.com/resources" className="text-red-500 hover:text-red-400 transition-colors" target="_blank" rel="noopener noreferrer">
              dojo4 LCA
            </a>, a Boulder cooperative that published its bylaws under a Creative Commons license.
            if you have feedback,{" "}
            <a href="mailto:ara@destroysaas.coop" className="text-red-500 hover:text-red-400 transition-colors">
              we want to hear it
            </a>.
          </p>
        </section>

        {/* how it's funded */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            how it&apos;s funded
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              right now, destroysaas is funded by{" "}
              <span className="text-[var(--text-primary)] font-medium">sweat equity</span>.
              one person&apos;s time, paid for by one person&apos;s savings. there are no investors,
              no grants, and no revenue.
            </p>
            <p>
              the long-term model is a small platform fee on cell treasury contributions —
              enough to keep the lights on, not enough to create a profit motive that
              conflicts with the mission. the exact number will be set transparently and
              subject to collective input once there are cells to consult.
            </p>
            <p>
              if destroysaas ever takes outside money, it will be disclosed publicly.
              if it ever changes structure, that will be disclosed too. the thesis is that
              transparency scales better than control.
            </p>
          </div>
        </section>

        {/* the code */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the code
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the destroysaas platform is open-source. you can read every line of code
              that runs this site. there are no private repos, no hidden services, and
              no proprietary components.
            </p>
            <p>
              this isn&apos;t just ideology — it&apos;s insurance. if destroysaas as a project
              disappears tomorrow, anyone can fork the code and keep going. the platform
              practices the same fork freedom it preaches.
            </p>
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              destroysaas is a personal project today. it might become a cooperative,
              a non-profit, or something else entirely. what it won&apos;t become is
              a company that extracts from the people it claims to serve. that&apos;s
              the one thing we&apos;ve decided.
            </p>
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">want to shape what this becomes?</p>
          <a
            href="mailto:ara@destroysaas.coop"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            get in touch &rarr;
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
