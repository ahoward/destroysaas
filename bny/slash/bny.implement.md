Run `bny implement $ARGUMENTS` to drive autonomous AI implementation.

This shells out to `claude -p` with a prompt built from spec/plan/tasks.
Use `bny --ralph --max-iter N implement` for retry loops.

Claude works through unchecked tasks in order, runs `./dev/test` after
each change, and marks tasks as [x] in tasks.md as they complete.

Protocol: run `./dev/post_flight` before committing. See `bny/AGENTS.md`.
