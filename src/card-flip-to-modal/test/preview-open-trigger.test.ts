/**
 * Tests for resolving and preparing the preview modal open trigger.
 */
import {
	PREVIEW_HAS_OPEN_ELEMENT_CLASS,
	PREVIEW_OPEN_TRIGGER_CLASS,
	getPreviewOpenTrigger,
	isNativeOpenControl,
	preparePreviewOpenTrigger,
	shouldHandleOpenKeydown,
	shouldPreventOpenClickDefault,
} from '../preview-open-trigger';

function createPreview(
	openElementId?: string
): HTMLElement {
	const preview = document.createElement( 'div' );
	preview.className = 'gb-flip-card-modal__preview';
	preview.setAttribute( 'role', 'button' );
	preview.setAttribute( 'tabindex', '0' );
	preview.setAttribute( 'aria-haspopup', 'dialog' );
	preview.setAttribute( 'aria-expanded', 'false' );

	if ( openElementId !== undefined ) {
		preview.setAttribute( 'data-modal-open-element-id', openElementId );
	}

	return preview;
}

function createKeyEvent( key: string ): KeyboardEvent {
	return new KeyboardEvent( 'keydown', {
		key,
		bubbles: true,
		cancelable: true,
	} );
}

describe( 'getPreviewOpenTrigger', () => {
	it( 'returns the preview when no open element ID is set', () => {
		const preview = createPreview();

		expect( getPreviewOpenTrigger( preview ) ).toBe( preview );
	} );

	it( 'returns the preview when the open element ID is empty', () => {
		const preview = createPreview( '' );

		expect( getPreviewOpenTrigger( preview ) ).toBe( preview );
	} );

	it( 'returns the inner element when a valid ID is found', () => {
		const preview = createPreview( 'open-btn' );
		const button = document.createElement( 'button' );
		button.id = 'open-btn';
		preview.appendChild( button );

		expect( getPreviewOpenTrigger( preview ) ).toBe( button );
	} );

	it( 'finds IDs that contain a colon or dot', () => {
		const preview = createPreview( 'open_btn:1.2' );
		const button = document.createElement( 'button' );
		button.id = 'open_btn:1.2';
		preview.appendChild( button );

		expect( getPreviewOpenTrigger( preview ) ).toBe( button );
	} );

	it( 'returns the preview when the ID is invalid', () => {
		const preview = createPreview( '1open' );
		const button = document.createElement( 'button' );
		button.id = '1open';
		preview.appendChild( button );

		expect( getPreviewOpenTrigger( preview ) ).toBe( preview );
	} );

	it( 'returns the preview when the ID is not inside this preview', () => {
		const preview = createPreview( 'open-btn' );
		const otherPreview = createPreview();
		const button = document.createElement( 'button' );
		button.id = 'open-btn';
		otherPreview.appendChild( button );
		document.body.append( preview, otherPreview );

		expect( getPreviewOpenTrigger( preview ) ).toBe( preview );

		preview.remove();
		otherPreview.remove();
	} );
} );

describe( 'preparePreviewOpenTrigger', () => {
	it( 'leaves preview button semantics when the trigger is the preview', () => {
		const preview = createPreview();

		preparePreviewOpenTrigger( preview, preview );

		expect( preview.getAttribute( 'role' ) ).toBe( 'button' );
		expect( preview.getAttribute( 'tabindex' ) ).toBe( '0' );
		expect( preview.getAttribute( 'aria-haspopup' ) ).toBe( 'dialog' );
		expect(
			preview.classList.contains( PREVIEW_HAS_OPEN_ELEMENT_CLASS )
		).toBe( false );
		expect(
			preview.classList.contains( PREVIEW_OPEN_TRIGGER_CLASS )
		).toBe( false );
	} );

	it( 'moves dialog ARIA onto a native button and demotes the preview', () => {
		const preview = createPreview( 'open-btn' );
		const button = document.createElement( 'button' );
		button.id = 'open-btn';
		preview.appendChild( button );

		preparePreviewOpenTrigger( preview, button );

		expect( preview.hasAttribute( 'role' ) ).toBe( false );
		expect( preview.hasAttribute( 'tabindex' ) ).toBe( false );
		expect( preview.hasAttribute( 'aria-haspopup' ) ).toBe( false );
		expect( preview.hasAttribute( 'aria-expanded' ) ).toBe( false );
		expect( button.getAttribute( 'aria-haspopup' ) ).toBe( 'dialog' );
		expect( button.getAttribute( 'aria-expanded' ) ).toBe( 'false' );
		expect( button.getAttribute( 'role' ) ).toBeNull();
		expect( button.hasAttribute( 'tabindex' ) ).toBe( false );
		expect(
			preview.classList.contains( PREVIEW_HAS_OPEN_ELEMENT_CLASS )
		).toBe( true );
		expect(
			button.classList.contains( PREVIEW_OPEN_TRIGGER_CLASS )
		).toBe( true );
	} );

	it( 'adds button semantics to a generic inner trigger', () => {
		const preview = createPreview( 'card-heading' );
		const heading = document.createElement( 'h3' );
		heading.id = 'card-heading';
		preview.appendChild( heading );

		preparePreviewOpenTrigger( preview, heading );

		expect( heading.getAttribute( 'role' ) ).toBe( 'button' );
		expect( heading.getAttribute( 'tabindex' ) ).toBe( '0' );
		expect( heading.getAttribute( 'aria-haspopup' ) ).toBe( 'dialog' );
		expect(
			heading.classList.contains( PREVIEW_OPEN_TRIGGER_CLASS )
		).toBe( true );
	} );
} );

describe( 'isNativeOpenControl', () => {
	it( 'treats buttons and links with href as native controls', () => {
		const button = document.createElement( 'button' );
		const link = document.createElement( 'a' );
		link.setAttribute( 'href', '#' );
		const heading = document.createElement( 'h3' );

		expect( isNativeOpenControl( button ) ).toBe( true );
		expect( isNativeOpenControl( link ) ).toBe( true );
		expect( isNativeOpenControl( heading ) ).toBe( false );
	} );
} );

describe( 'shouldHandleOpenKeydown', () => {
	it( 'does not handle Enter or Space on a native button', () => {
		const button = document.createElement( 'button' );

		expect(
			shouldHandleOpenKeydown( button, createKeyEvent( 'Enter' ) )
		).toBe( false );
		expect(
			shouldHandleOpenKeydown( button, createKeyEvent( ' ' ) )
		).toBe( false );
	} );

	it( 'handles Space but not Enter on a link', () => {
		const link = document.createElement( 'a' );
		link.setAttribute( 'href', '#' );

		expect(
			shouldHandleOpenKeydown( link, createKeyEvent( 'Enter' ) )
		).toBe( false );
		expect( shouldHandleOpenKeydown( link, createKeyEvent( ' ' ) ) ).toBe(
			true
		);
	} );

	it( 'handles Enter and Space on a generic element', () => {
		const heading = document.createElement( 'h3' );

		expect(
			shouldHandleOpenKeydown( heading, createKeyEvent( 'Enter' ) )
		).toBe( true );
		expect(
			shouldHandleOpenKeydown( heading, createKeyEvent( ' ' ) )
		).toBe( true );
	} );
} );

describe( 'shouldPreventOpenClickDefault', () => {
	it( 'prevents default only for links with an href', () => {
		const link = document.createElement( 'a' );
		link.setAttribute( 'href', '#' );
		const button = document.createElement( 'button' );

		expect( shouldPreventOpenClickDefault( link ) ).toBe( true );
		expect( shouldPreventOpenClickDefault( button ) ).toBe( false );
	} );
} );
