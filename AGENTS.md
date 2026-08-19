# Agents

Defines where the project's conventions live and what must pass before a change is done. Read it at the start of every session.

## 1. Conventions

Read these before writing code. Each one states when it applies.

| Document                             | Scope                                                                          |
|:-------------------------------------|:-------------------------------------------------------------------------------|
| `docs/code-guidelines.md`            | Formatting: 2-space indent, no semicolons, single quotes, spaces inside braces |
| `docs/naming-conventions.md`         | Naming: folders, files, CSS variables, BEM classes, TypeScript symbols         |
| `docs/react-structure-guidelines.md` | Where a new file belongs                                                       |
| `docs/react-good-practices.md`       | React, TypeScript, CSS and accessibility rules                                 |
| `docs/css-design-tokens.md`          | Design tokens in the root stylesheet                                           |
| `docs/code-quality-audit.md`         | What an audit verifies                                                         |
| `docs/commit-conventions.md`         | How a commit message is written and what belongs in one commit                 |

Never run a code quality audit unless it is explicitly asked for.

## 2. Quality gates

All five must pass before a change is done:

```bash
npx tsc -b --force
npx eslint src --max-warnings=0
npm run format:check
npm test
npm run build
```

`tsc -b` is the only type check that reads `tsconfig.app.json`. Running `tsc --noEmit` from the root instead checks nothing at all: the root `tsconfig.json` declares `"files": []` and only references the two project configs, so the command exits 0 whatever the code says. `--force` skips the incremental cache so an unchanged-looking tree is still checked.

Green gates are not proof the change works. Anything the user can see is verified by running the app and looking at the result.
