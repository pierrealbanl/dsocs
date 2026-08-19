# Code Guidelines

Defines how code is formatted. Read it before reformatting a file or setting up a new machine.

The rules below are enforced automatically by Prettier, configured in `.prettierrc` at the root of the repository (see section 5). The WebStorm settings in section 4 exist so the editor produces the same result while typing, not a different one.

## 1. Whitespace

| Rule                | Value    |
|:--------------------|:---------|
| Indent              | 2 spaces |
| Continuation indent | 2 spaces |
| Tabs                | never    |
| Max line length     | 160      |
| Trailing whitespace | trimmed  |
| Final newline       | required |

The continuation indent matters more than it looks. At 8 (the JetBrains default) every wrapped attribute, every `return (`, every `{cond && (` adds 8 columns instead of 2. In JSX these stack: lines start deep, hit the wrap limit early, get split, and gain another level. Measured on this codebase, moving from 4/8 to 2/2 took the deepest line from column 64 to 50, and the count of lines indented past column 32 from 414 to 93.

## 2. Punctuation

* **No semicolons** to terminate statements. They remain where the syntax requires them, such as separating members inside a type literal.
* **Single quotes** for strings. JSX attributes keep double quotes, per JSX convention.
* **Trailing commas** on multi-line literals.

## 3. Braces and brackets

Spaces go inside braces, never inside brackets:

```ts
import { useEffect, useState } from 'react'          // import braces: spaced
const style = { backgroundColor: accent }            // object literal: spaced
const sections: { id: string; label: string }[] = [] // type literal: spaced

const pair = [first, second]                         // array: not spaced
const label = `${month} ${year}`                     // interpolation: not spaced
```

Object *values* and object *types* follow the same rule. In WebStorm these are two separate checkboxes (`Object literal braces` and `Object literal type braces`) and it is easy to end up with one style for types and another for values. The result reads as an accident, because it is one.

## 4. Configuring WebStorm

Everything below lives under **Settings → Editor → Code Style**. Set it on the IDE-level *Default* scheme rather than a project one, so every TypeScript project inherits it.

| Page                                  | Setting                                 | Value     |
|:--------------------------------------|:----------------------------------------|:----------|
| Code Style → General                  | Hard wrap at                            | 160       |
| Code Style → General                  | Visual guides                           | 160       |
| TypeScript → Tabs and Indents         | Tab size / Indent / Continuation indent | 2 / 2 / 2 |
| TypeScript → Punctuation              | Semicolon                               | Don't use |
| TypeScript → Punctuation              | Quotes                                  | single    |
| TypeScript → Spaces → Within          | Object literal braces                   | on        |
| TypeScript → Spaces → Within          | ES6 import/export braces                | on        |
| Style Sheets → CSS → Tabs and Indents | Tab size / Indent / Continuation indent | 2 / 2 / 2 |

### 4.1. Pitfalls

* **Disable Indents Detection.** A yellow banner reads *"Settings may be overridden by Indents Detection"*. While it is showing, WebStorm reads each file's existing indentation and preserves it, silently ignoring the scheme. A reformat then appears to do nothing, or to keep the old indent. The setting is stored **per scheme**: switching from the project scheme to the IDE one brings the detection back, and it has to be disabled again.
* **Reformat Code and Cleanup Code are different.** Reformat touches whitespace and line wrapping only. Cleanup additionally applies every enabled inspection's quick-fix, which can change code semantics. Run them separately, and never blend Cleanup into a formatting-only commit.
* **After changing the scheme, a cache invalidation may be needed** (File → Invalidate Caches → *Invalidate and Restart*, all optional boxes left unchecked) before the new values take effect on existing files.

## 5. Enforcement

`.prettierrc` is the single source of truth for everything in sections 1 to 3. It is checked into the repository, so the style does not depend on anyone's editor being configured correctly.

```bash
npm run format        # rewrites src/ to match the style
npm run format:check  # fails when a file does not match
```

The values map one-to-one onto the rules above: `semi: false` and `singleQuote: true` for section 2, `printWidth: 160` and `tabWidth: 2` for section 1, `bracketSpacing: true` and `trailingComma: 'all'` for sections 2 and 3. `jsxSingleQuote` stays `false` because JSX attributes keep double quotes.

Changing a rule means changing `.prettierrc` and this document in the same commit, then running `npm run format` so the tree never sits in a state the config disagrees with.
