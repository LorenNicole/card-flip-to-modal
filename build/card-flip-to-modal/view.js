/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/card-flip-to-modal/modal-focus.js"
/*!***********************************************!*\
  !*** ./src/card-flip-to-modal/modal-focus.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFocusableElements: () => (/* binding */ getFocusableElements),
/* harmony export */   modalFocus: () => (/* binding */ modalFocus)
/* harmony export */ });
/**
 * Returns visible, focusable elements inside a container.
 *
 * @param {HTMLElement} container The modal/dialog container.
 * @return {HTMLElement[]} Focusable elements.
 */
function getFocusableElements(container) {
  if (!container) {
    return [];
  }
  return Array.from(container.querySelectorAll(['a[href]', 'button:not([disabled])', 'textarea:not([disabled])', 'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'].join(','))).filter(element => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && (element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement);
  });
}

/**
 * Keeps Tab and Shift+Tab focus inside the provided container.
 *
 * @param {KeyboardEvent} event The keydown event.
 * @param {HTMLElement} container The modal/dialog container.
 * @param {HTMLElement|null} fallbackFocusElement Element to focus if no tabbable elements exist.
 */
function modalFocus(event, container, fallbackFocusElement = null) {
  if (event.key !== 'Tab' || !container) {
    return;
  }
  const focusableElements = getFocusableElements(container);
  if (!focusableElements.length) {
    event.preventDefault();
    if (fallbackFocusElement) {
      fallbackFocusElement.focus();
    } else {
      container.focus();
    }
    return;
  }
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  if (event.shiftKey && document.activeElement === firstFocusableElement) {
    event.preventDefault();
    lastFocusableElement.focus();
    return;
  }
  if (!event.shiftKey && document.activeElement === lastFocusableElement) {
    event.preventDefault();
    firstFocusableElement.focus();
  }
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./src/card-flip-to-modal/view.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal_focus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-focus */ "./src/card-flip-to-modal/modal-focus.js");
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
    dialog.setAttribute('tabindex', '-1');
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
  if (!activeBlock) {
    return;
  }
  if (event.key === 'Escape') {
    closeModal(activeBlock);
    return;
  }
  const {
    dialog,
    closeButton
  } = getBlockParts(activeBlock);
  (0,_modal_focus__WEBPACK_IMPORTED_MODULE_0__.modalFocus)(event, dialog, closeButton);
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
})();

/******/ })()
;
//# sourceMappingURL=view.js.map