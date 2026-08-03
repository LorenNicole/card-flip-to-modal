# Card Flip to Modal

A custom WordPress Gutenberg block plugin that displays editable preview content on the page and opens separate editable content inside an accessible modal.

This plugin was created as a WordPress development portfolio project to demonstrate custom block development, React-based Gutenberg editor components, InnerBlocks, TypeScript, front-end JavaScript behavior, Sass styling, accessibility-focused modal behavior, and modern WordPress build tooling.

## Features

- Custom parent Gutenberg block
- Locked parent block structure for consistent editing
- Editable Preview Area using InnerBlocks
- Editable Modal Content area using InnerBlocks
- Separate preview content and modal content
- Click-to-open modal behavior
- Keyboard activation with Enter and Space
- Escape key closes the modal
- Optional close button inside the modal
- Optional backdrop-click close behavior
- Optional page scroll locking while the modal is open
- Focus moves into the modal when opened
- Focus remains trapped inside the modal while open
- Focus returns to the preview card after closing
- Modal content scrolls internally when content is long
- Multiple Card Flip to Modal blocks can be used on one page
- Opening one modal closes any other open modal
- Front-end behavior powered by lightweight TypeScript-compiled JavaScript
- Editor experience built with React-based Gutenberg components
- TypeScript and TSX source files
- Sass styling with BEM-style class names
- Modal width presets: Small, Medium, and Large
- Custom modal width using valid CSS size values
- Preview card minimum height control
- Preview card shadow toggle
- Preview card hover lift toggle
- Preview card background color control
- Preview card border color control
- Preview card text color control
- Compact color picker UI in the block sidebar
- Per-block styling using saved CSS variables
- Per-block modal behavior using saved data attributes

## Technologies Used

- WordPress
- Gutenberg Block Editor
- React / TSX through WordPress block components
- TypeScript
- JavaScript compiled from TypeScript
- InnerBlocks
- InspectorControls
- WordPress component controls
- Sass / SCSS
- BEM-style CSS class naming
- CSS custom properties
- PHP block registration
- `@wordpress/scripts`
- npm

## Installation

1. Download or clone this repository.
2. Copy the plugin folder into your WordPress `wp-content/plugins/` directory.
3. In the WordPress admin, go to **Plugins**.
4. Activate **Card Flip to Modal**.
5. Open the block editor for a page or post.
6. Insert the **Card Flip to Modal** block.
7. Edit the Preview Area and Modal Content area.
8. Configure the block settings in the sidebar.

The `build/` folder is included in this repository so the plugin can be installed and activated without running npm commands.

## How to Use

After inserting the block, you will see two editable areas in the editor:

### Preview Area

The Preview Area is the content visitors see on the page before opening the modal.

This area can include supported blocks such as:

- Heading
- Paragraph
- Image
- List
- Buttons
- Video
- Group
- Columns

Visitors can click this area, or focus it with the keyboard and press Enter or Space, to open the modal.

### Modal Content

The Modal Content area is the expanded content shown inside the modal.

This area can include longer text, images, lists, buttons, video, grouped layouts, columns, or other supported content blocks.

### Modal Settings

When the Card Flip to Modal block is selected, the sidebar includes **Modal Settings**.

The modal width can be set to:

- Small
- Medium
- Large
- Custom

Custom width accepts valid CSS size values such as:

- `720px`
- `80vw`
- `45rem`
- `60%`
- `clamp(320px, 80vw, 1000px)`
- `calc(100vw - 4rem)`

### Preview Card Settings

The sidebar also includes **Preview Card Settings**.

These controls allow the editor user to customize the visible preview card before the modal opens.

Available preview card settings include:

- Minimum height
- Card shadow on/off
- Hover lift effect on/off
- Background color
- Border color
- Text color

The color controls use a compact color picker UI with a color indicator, choose button, and reset button.

### Modal Behavior Settings

The sidebar includes **Modal Behavior Settings**.

Available modal behavior settings include:

- Close when clicking backdrop
- Show close button
- Lock page scroll while modal is open

These settings are saved per block instance, allowing different Card Flip to Modal blocks on the same page to use different behavior.

## Accessibility Notes

The block includes modal and keyboard accessibility behavior:

- Preview card is keyboard-focusable.
- Enter opens the modal.
- Space opens the modal.
- Escape closes the modal.
- Focus moves into the modal when it opens.
- Focus remains trapped inside the modal while it is open.
- Focus returns to the preview card after the modal closes.
- The close button is keyboard-focusable when enabled.
- If the close button is disabled, focus moves to the modal dialog.
- Background page scrolling can be locked while the modal is open.
- The modal uses dialog-related ARIA attributes.
- Modal behavior supports multiple block instances on the same page.

## Development

These steps are only needed if you want to edit the plugin source code.

The source files are written in TypeScript and TSX. WordPress loads the compiled JavaScript files from the `build/` folder.

Install dependencies:

```bash
npm install