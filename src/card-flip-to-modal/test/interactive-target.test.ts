/**
 * Tests for ignoring nested interactive controls on the preview card.
 */
import { shouldIgnorePreviewActivation } from '../interactive-target';

function createPreview(): HTMLElement {
	const preview = document.createElement( 'div' );
	preview.className = 'gb-flip-card-modal__preview';
	preview.setAttribute( 'role', 'button' );
	preview.tabIndex = 0;
	document.body.appendChild( preview );
	return preview;
}

describe( 'shouldIgnorePreviewActivation', () => {
	let preview: HTMLElement;

	beforeEach( () => {
		preview = createPreview();
	} );

	afterEach( () => {
		preview.remove();
	} );

	it( 'does not ignore activation on the preview itself', () => {
		expect( shouldIgnorePreviewActivation( preview, preview ) ).toBe(
			false
		);
	} );

	it( 'does not ignore activation on non-interactive preview content', () => {
		const heading = document.createElement( 'h3' );
		heading.textContent = 'Card title';
		preview.appendChild( heading );

		expect( shouldIgnorePreviewActivation( heading, preview ) ).toBe(
			false
		);
	} );

	it( 'ignores activation from nested buttons, links, and form controls', () => {
		const button = document.createElement( 'button' );
		const link = document.createElement( 'a' );
		link.href = '#more';
		const input = document.createElement( 'input' );
		preview.append( button, link, input );

		expect( shouldIgnorePreviewActivation( button, preview ) ).toBe( true );
		expect( shouldIgnorePreviewActivation( link, preview ) ).toBe( true );
		expect( shouldIgnorePreviewActivation( input, preview ) ).toBe( true );
	} );

	it( 'ignores activation from descendants of nested interactive controls', () => {
		const button = document.createElement( 'button' );
		const icon = document.createElement( 'span' );
		button.appendChild( icon );
		preview.appendChild( button );

		expect( shouldIgnorePreviewActivation( icon, preview ) ).toBe( true );
	} );

	it( 'ignores activation from media, summary, and contenteditable elements', () => {
		const video = document.createElement( 'video' );
		const audio = document.createElement( 'audio' );
		const summary = document.createElement( 'summary' );
		const editable = document.createElement( 'div' );
		editable.setAttribute( 'contenteditable', 'true' );
		preview.append( video, audio, summary, editable );

		expect( shouldIgnorePreviewActivation( video, preview ) ).toBe( true );
		expect( shouldIgnorePreviewActivation( audio, preview ) ).toBe( true );
		expect( shouldIgnorePreviewActivation( summary, preview ) ).toBe(
			true
		);
		expect( shouldIgnorePreviewActivation( editable, preview ) ).toBe(
			true
		);
	} );

	it( 'does not ignore a null or non-element target', () => {
		expect( shouldIgnorePreviewActivation( null, preview ) ).toBe( false );
		expect( shouldIgnorePreviewActivation( preview, preview ) ).toBe(
			false
		);
	} );
} );
