# run-tests-lint-build

Run the full validation workflow for this WordPress Gutenberg block plugin.

Before running commands, inspect package.json and identify the available npm scripts. Prefer existing npm scripts instead of inventing new commands.

Run all applicable checks in this order:

1. Unit tests
2. Formatting
3. JavaScript/TypeScript linting
4. CSS/SCSS linting
5. TypeScript type checking
6. Production build

Use these preferred commands when available:

- npm run test:unit
- npm run format
- npm run lint:js
- npm run lint:css
- npm run typecheck
- npm run build

If typecheck does not exist, check whether TypeScript is installed and whether the project has a tsconfig.json. If appropriate, recommend adding this script to package.json:

"typecheck": "tsc --noEmit"

Do not add or change scripts unless I approve.

If a script does not exist, report that clearly and skip it instead of failing the whole workflow.

Do not modify production code unless I explicitly approve a fix.

If any command fails:

- Stop after the failing command.
- Explain what failed in plain language.
- Identify the file and line number if available.
- Explain the likely cause.
- Propose a fix plan.
- Do not apply the fix until I approve.

If all checks pass:

- Summarize the commands that were run.
- Confirm the result.
- Mention whether the build output changed.
- Suggest the next git commands, but do not run them unless I ask.

Use this output format:

1. Scripts found
2. Commands run
3. Results
4. Failures, if any
5. Recommended fix plan, if needed
6. Build output status
7. Suggested git commands

Project context:

This is a custom WordPress Gutenberg block plugin using @wordpress/scripts. The committed /build folder is intentional because the GitHub repository should be installable as a WordPress plugin. Do not remove, ignore, or delete the build output.
