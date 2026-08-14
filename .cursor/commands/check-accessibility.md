# check-accessibility

Review this WordPress Gutenberg block plugin for accessibility issues and provide a plan for improvements.

Focus on the current codebase, especially:

- keyboard interaction
- focus management
- modal dialog accessibility
- aria-label, aria-modal, aria-expanded, aria-haspopup, and role usage
- screen reader clarity
- Escape key behavior
- backdrop click behavior
- focus return after closing the modal
- focus trap behavior
- editor accessibility
- frontend accessibility
- color contrast risks
- reduced motion / animation accessibility
- semantic HTML
- Gutenberg block editor best practices

Reference official WordPress accessibility and block editor best practices where relevant.

Do not make code changes yet.

Return a structured Plan with:

1. Summary of current accessibility strengths
2. Accessibility issues or risks found
3. Files involved
4. Recommended improvements in priority order
5. Any WordPress/Gutenberg-specific concerns
6. Any ARIA/modal best-practice concerns
7. Manual accessibility test checklist
8. Suggested implementation phases
9. Suggested commit messages

Important project context:

This plugin is a custom WordPress Gutenberg block called Card Flip to Modal. It has a parent block with two child blocks: a preview/card child block and a modal content child block. The frontend opens a modal when the preview is clicked. The plugin supports keyboard open, Escape close, close button, optional backdrop close, scroll locking, modal focus management, and flip/grow animation.

When reviewing the code, preserve the current architecture where possible:

- Preview-specific settings should belong to the preview child block.
- Modal-specific settings should belong to the modal content child block.
- Parent settings should only be used for overall block behavior or shared behavior.
- Do not recommend block context unless a parent-owned setting truly needs to be consumed by child blocks.
- Keep editor helper text separate from visual preview containers.
- Avoid hardcoded IDs unless they are generated uniquely for accessibility relationships.
- Use BEM-style class names for styling and JavaScript selectors.
- Call out any saved-markup changes that could cause Gutenberg block validation issues.

Do not implement anything until I approve the Plan.