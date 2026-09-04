let dialogIdCounter = 0;

const DIALOG_HEADING_SELECTOR = [
	'.gb-flip-card-modal__content h1',
	'.gb-flip-card-modal__content h2',
	'.gb-flip-card-modal__content h3',
	'.gb-flip-card-modal__content h4',
	'.gb-flip-card-modal__content h5',
	'.gb-flip-card-modal__content h6',
].join( ',' );

/**
 * Connects the preview trigger to its dialog with a unique id and aria-controls.
 *
 * @param preview Preview card trigger.
 * @param dialog  Modal dialog element.
 */
export function wirePreviewDialogRelationship(
	preview: HTMLElement,
	dialog: HTMLElement
): void {
	if ( ! dialog.id ) {
		dialogIdCounter += 1;
		dialog.id = `gb-flip-card-modal-dialog-${ dialogIdCounter }`;
	}

	preview.setAttribute( 'aria-controls', dialog.id );
}

/**
 * Labels the dialog from its first visible heading when one exists.
 *
 * @param dialog Modal dialog element.
 */
export function wireDialogAccessibleName( dialog: HTMLElement ): void {
	const heading = dialog.querySelector( DIALOG_HEADING_SELECTOR );

	if (
		! ( heading instanceof HTMLElement ) ||
		! heading.textContent?.trim()
	) {
		return;
	}

	if ( ! heading.id ) {
		dialogIdCounter += 1;
		heading.id = `gb-flip-card-modal-title-${ dialogIdCounter }`;
	}

	dialog.setAttribute( 'aria-labelledby', heading.id );
	dialog.removeAttribute( 'aria-label' );
}
