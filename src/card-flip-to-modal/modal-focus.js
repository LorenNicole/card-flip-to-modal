/**
 * Returns visible, focusable elements inside a container.
 *
 * @param {HTMLElement} container The modal/dialog container.
 * @return {HTMLElement[]} Focusable elements.
 */
export function getFocusableElements( container ) {
	if ( ! container ) {
		return [];
	}

	return Array.from(
		container.querySelectorAll(
			[
				'a[href]',
				'button:not([disabled])',
				'textarea:not([disabled])',
				'input:not([disabled])',
				'select:not([disabled])',
				'[tabindex]:not([tabindex="-1"])',
			].join( ',' )
		)
	).filter( ( element ) => {
		const style = window.getComputedStyle( element );

		return (
			style.display !== 'none' &&
			style.visibility !== 'hidden' &&
			( element.offsetWidth > 0 ||
				element.offsetHeight > 0 ||
				element === document.activeElement )
		);
	} );
}

/**
 * Keeps Tab and Shift+Tab focus inside the provided container.
 *
 * @param {KeyboardEvent} event The keydown event.
 * @param {HTMLElement} container The modal/dialog container.
 * @param {HTMLElement|null} fallbackFocusElement Element to focus if no tabbable elements exist.
 */
export function modalFocus( event, container, fallbackFocusElement = null ) {
	if ( event.key !== 'Tab' || ! container ) {
		return;
	}

	const focusableElements = getFocusableElements( container );

	if ( ! focusableElements.length ) {
		event.preventDefault();

		if ( fallbackFocusElement ) {
			fallbackFocusElement.focus();
		} else {
			container.focus();
		}

		return;
	}

	const firstFocusableElement = focusableElements[ 0 ];
	const lastFocusableElement =
		focusableElements[ focusableElements.length - 1 ];

	if ( event.shiftKey && document.activeElement === firstFocusableElement ) {
		event.preventDefault();
		lastFocusableElement.focus();
		return;
	}

	if ( ! event.shiftKey && document.activeElement === lastFocusableElement ) {
		event.preventDefault();
		firstFocusableElement.focus();
	}
}