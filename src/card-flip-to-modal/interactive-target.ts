/**
 * Selector for nested controls that should keep their own activation behavior
 * instead of opening the card modal.
 */
const INTERACTIVE_SELECTOR = [
	'a[href]',
	'button',
	'input',
	'select',
	'textarea',
	'video',
	'audio',
	'summary',
	'[contenteditable]:not([contenteditable="false"])',
].join( ',' );

/**
 * Returns true when the event originated from a nested interactive control
 * inside the preview card, not from the preview itself.
 *
 * @param target  Event target.
 * @param preview Preview card element.
 * @return True when the preview should ignore the activation event.
 */
export function shouldIgnorePreviewActivation(
	target: EventTarget | null,
	preview: HTMLElement
): boolean {
	if ( ! ( target instanceof Element ) ) {
		return false;
	}

	const interactive = target.closest( INTERACTIVE_SELECTOR );

	return (
		interactive instanceof HTMLElement &&
		preview.contains( interactive ) &&
		interactive !== preview
	);
}
