Run `bny tasks $ARGUMENTS` to generate a task list from template.

Guards: plan.md must exist (run `bny plan` first).

After running:
1. Fill in concrete tasks organized by user story
2. Mark tasks with [P] if they can run in parallel
3. The task list drives `bny implement`

Protocol: run `./dev/test` after any code change. See `bny/AGENTS.md`.
