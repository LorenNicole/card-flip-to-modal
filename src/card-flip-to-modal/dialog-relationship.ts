let dialogIdCounter = 0;

/**
 * Connects the preview trigger to its dialog with a unique id and aria-controls.
 *
 * @param preview Preview card trigger.
 * @param dialog Modal dialog element.
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
