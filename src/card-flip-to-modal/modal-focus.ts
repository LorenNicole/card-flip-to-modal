/**
 * CSS selector for elements that can receive keyboard focus.
 */
const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'textarea:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join( ',' );

/**
 * Determines whether an element is visible enough to receive focus.
 *
 * @param element Element to check.
 * @return True when the element is visible.
 */
function isVisibleElement( element: HTMLElement ): boolean {
	const style = window.getComputedStyle( element );

	return (
		style.display !== 'none' &&
		style.visibility !== 'hidden' &&
		( element.offsetWidth > 0 ||
			element.offsetHeight > 0 ||
			element === document.activeElement )
	);
}

/**
 * Returns visible, focusable elements inside a container.
 *
 * @param container The modal/dialog container.
 * @return Focusable elements.
 */
export function getFocusableElements(
	container: HTMLElement | null
): HTMLElement[] {
	if ( ! container ) {
		return [];
	}

	return Array.from(
		container.querySelectorAll<HTMLElement>( FOCUSABLE_SELECTOR )
	).filter( isVisibleElement );
}

/**
 * Keeps Tab and Shift+Tab focus inside the provided container.
 *
 * @param event The keydown event.
 * @param container The modal/dialog container.
 * @param fallbackFocusElement Element to focus if no tabbable elements exist.
 */
export function modalFocus(
	event: KeyboardEvent,
	container: HTMLElement | null,
	fallbackFocusElement: HTMLElement | null = null
): void {
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

/**
 * Returns ancestor-sibling elements that should be inert while a dialog is open.
 *
 * Walks up from the dialog and collects each parent's other children, excluding
 * the dialog, its backdrop, and elements that are already inert.
 *
 * @param dialog The open modal dialog.
 * @param backdrop The modal backdrop, if present.
 * @return Elements to mark inert.
 */
export function getBackgroundElementsToInert(
	dialog: HTMLElement | null,
	backdrop: HTMLElement | null = null
): HTMLElement[] {
	if ( ! dialog ) {
		return [];
	}

	const skip = new Set< HTMLElement >( [ dialog ] );

	if ( backdrop ) {
		skip.add( backdrop );
	}

	const elements: HTMLElement[] = [];
	let current: HTMLElement | null = dialog;

	while ( current && current !== document.documentElement ) {
		const parent: HTMLElement | null = current.parentElement;

		if ( ! parent ) {
			break;
		}

		const ancestor = current;

		Array.from( parent.children ).forEach( ( sibling ) => {
			if ( ! ( sibling instanceof HTMLElement ) ) {
				return;
			}

			if ( sibling === ancestor || skip.has( sibling ) ) {
				return;
			}

			if ( sibling.inert ) {
				return;
			}

			elements.push( sibling );
		} );

		current = parent;
	}

	return elements;
}