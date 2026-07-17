/******/ (() => { // webpackBootstrap
/*!****************************************!*\
  !*** ./src/card-flip-to-modal/view.js ***!
  \****************************************/
/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/**
 * Front-end behavior for Card Flip to Modal.
 *
 * Stage B/C:
 * - Opens modal when preview card is clicked.
 * - Opens modal with Enter or Space when preview card has focus.
 * - Closes modal with close button.
 * - Closes modal with Escape.
 * - Does not close on backdrop click.
 * - Allows only one modal open at a time.
 * - Locks page scroll while modal is open.
 * - Returns focus to the preview card when closed.
 */

const BLOCK_SELECTOR = '.wp-block-fun-gutenberg-blocks-card-flip-to-modal';
const OPEN_CLASS = 'gb-flip-card-modal--is-open';
const BODY_LOCK_CLASS = 'gb-flip-card-modal-lock-scroll';
let activeBlock = null;
let activeTrigger = null;
function getBlockParts(block) {
  return {
    preview: block.querySelector('.gb-flip-card-modal__preview'),
    backdrop: block.querySelector('.gb-flip-card-modal__backdrop'),
    dialog: block.querySelector('.gb-flip-card-modal__dialog'),
    closeButton: block.querySelector('.gb-flip-card-modal__close')
  };
}
function lockPageScroll() {
  document.body.classList.add(BODY_LOCK_CLASS);
}
function unlockPageScroll() {
  document.body.classList.remove(BODY_LOCK_CLASS);
}
function closeModal(block = activeBlock) {
  if (!block) {
    return;
  }
  const {
    preview,
    backdrop,
    dialog
  } = getBlockParts(block);
  block.classList.remove(OPEN_CLASS);
  if (preview) {
    preview.setAttribute('aria-expanded', 'false');
  }
  if (backdrop) {
    backdrop.hidden = true;
  }
  if (dialog) {
    dialog.hidden = true;
  }
  unlockPageScroll();
  if (activeTrigger && typeof activeTrigger.focus === 'function') {
    activeTrigger.focus();
  }
  if (block === activeBlock) {
    activeBlock = null;
    activeTrigger = null;
  }
}
function closeAnyOpenModal() {
  if (activeBlock) {
    closeModal(activeBlock);
  }
}
function openModal(block, trigger) {
  const {
    preview,
    backdrop,
    dialog,
    closeButton
  } = getBlockParts(block);
  if (!preview || !backdrop || !dialog) {
    return;
  }
  closeAnyOpenModal();
  activeBlock = block;
  activeTrigger = trigger || preview;
  block.classList.add(OPEN_CLASS);
  preview.setAttribute('aria-expanded', 'true');
  backdrop.hidden = false;
  dialog.hidden = false;
  lockPageScroll();
  if (closeButton) {
    closeButton.focus();
  } else {
    dialog.focus();
  }
}
function handlePreviewKeydown(event, block, preview) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }
  event.preventDefault();
  openModal(block, preview);
}
function handleDocumentKeydown(event) {
  if (event.key === 'Escape' && activeBlock) {
    closeModal(activeBlock);
  }
}
function initCardFlipToModalBlock(block) {
  const {
    preview,
    closeButton
  } = getBlockParts(block);
  if (!preview) {
    return;
  }
  preview.addEventListener('click', () => {
    openModal(block, preview);
  });
  preview.addEventListener('keydown', event => {
    handlePreviewKeydown(event, block, preview);
  });

  // The close button lives inside this block's modal,
  // but it is still part of the same block instance.
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeModal(block);
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(BLOCK_SELECTOR).forEach(initCardFlipToModalBlock);
  document.addEventListener('keydown', handleDocumentKeydown);
});
/******/ })()
;
//# sourceMappingURL=view.js.map