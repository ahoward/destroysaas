Run `bny review $ARGUMENTS` to invoke gemini as antagonist reviewer.

This shells out to `gemini -p` with a prompt built from spec/plan/tasks.
Use `--prompt-only` to write the review prompt to a file instead.

Gemini's job: find missing edge cases, security holes, test gaps,
and ambiguous requirements. Each issue needs problem/impact/fix.

Protocol: tests are locked after review. See `bny/AGENTS.md`.
