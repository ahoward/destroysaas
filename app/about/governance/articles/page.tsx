import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { promises as fs } from "fs";
import path from "path";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata: Metadata = {
  title: "articles of organization (draft) — destroysaas",
  description:
    "draft articles of organization for destroysaas Limited Cooperative Association, a Colorado LCA under the Uniform Limited Cooperative Association Act.",
};

export default async function ArticlesPage() {
  const filePath = path.join(process.cwd(), "docs", "articles-of-organization.md");
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/governance" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <a
          href="/about/governance"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          &larr; governance
        </a>

        <div className="mt-4 mb-8 border border-red-600 rounded-lg p-4 bg-red-600/5">
          <p className="text-sm text-red-600 font-medium">
            draft document — not yet filed with the Colorado Secretary of State
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            these articles of organization are being developed as part of our
            formation as a Colorado Limited Cooperative Association. they are
            subject to revision.
          </p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none text-[var(--text-secondary)] prose-headings:text-[var(--text-primary)] prose-headings:lowercase prose-headings:tracking-tight prose-strong:text-[var(--text-primary)] prose-a:text-red-500 prose-hr:border-[var(--border-primary)] prose-table:text-sm prose-th:text-left prose-th:p-2 prose-td:p-2">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      </main>
    </div>
  );
}
