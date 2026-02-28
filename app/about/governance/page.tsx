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

        {/* why it's not an LCA yet */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            why it&apos;s not an LCA yet
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              we tell every cell that forms through this platform to organize as an LCA —
              a Limited Cooperative Association with real legal standing. so why isn&apos;t
              destroysaas itself one?
            </p>
            <p>
              because{" "}
              <span className="text-[var(--text-primary)] font-medium">
                premature formalization kills projects
              </span>.
              forming a legal entity before you have members, revenue, and a working product
              is theater. it&apos;s optimizing for structure before you&apos;ve proven the idea.
            </p>
            <p>
              the platform needs to work first. real businesses need to submit real ideas.
              real cells need to form. real software needs to ship. once there&apos;s something
              worth governing, the governance will formalize.
            </p>
          </div>
        </section>

        {/* what we're considering */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            what we&apos;re considering
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the right structure for destroysaas itself is an open question. the options
              on the table:
            </p>
          </div>
          <div className="space-y-4 mt-6">
            {[
              {
                label: "LCA",
                desc: "eat our own cooking. destroysaas becomes a cooperative owned by the businesses and cells that use it. the platform belongs to its participants.",
              },
              {
                label: "non-profit",
                desc: "destroysaas operates as infrastructure — a public good that facilitates cooperative formation. no profit motive, funded by membership fees or grants.",
              },
              {
                label: "B-corp",
                desc: "a for-profit entity with a legal mandate to serve stakeholders, not just shareholders. sustainable revenue model with accountability baked in.",
              },
              {
                label: "stay informal",
                desc: "keep it as a personal project with open-source code and radical transparency. no legal entity, no overhead, no governance theater.",
              },
            ].map((item) => (
              <div key={item.label} className="border border-[var(--border-primary)] rounded-lg p-5">
                <p className="font-semibold mb-1">{item.label}</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[var(--text-secondary)] text-sm mt-6 leading-relaxed">
            the decision will be made publicly, with input from the people who are actually
            using the platform. if you have opinions,{" "}
            <a href="mailto:ara@destroysaas.coop" className="text-red-500 hover:text-red-400 transition-colors">
              we want to hear them
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
