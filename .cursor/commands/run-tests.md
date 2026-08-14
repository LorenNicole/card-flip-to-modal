# run-tests

Write unit tests for the file I specify.

Use Jest through @wordpress/scripts test-unit-js, following WordPress Block Editor testing conventions.

Do not change production code unless the file is currently difficult to test. If production code changes are needed for testability, explain the reason first and include the smallest safe refactor in the Plan.

Target file:
[PASTE FILE PATH HERE]

Tasks:

1. Read the target file and identify testable behavior.
2. Identify dependencies that should be mocked, especially WordPress packages, DOM APIs, browser APIs, timers, animations, or module imports.
3. Propose a test file path that matches the project structure.
4. Write meaningful unit tests for the target file.
5. Prefer testing public exported functions and observable behavior, not implementation details.
6. Include edge cases, invalid inputs, default values, and accessibility-related behavior when relevant.
7. Do not write snapshot tests unless there is a clear reason.
8. Do not add a new testing framework unless Jest through @wordpress/scripts cannot reasonably test this file.
9. If the file is better suited for an integration or E2E test instead of a unit test, explain why and propose the better test type.

Return a Plan first. Do not edit files until I approve the Plan.

The Plan should include:

1. Target file summary
2. Recommended test framework
3. Proposed test file path
4. Test cases to add
5. Mocks or setup needed
6. Any production-code refactor needed
7. Commands to run
8. Risks or limitations
9. Suggested commit message