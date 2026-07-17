/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { 
	Notice,
	PanelBody,
	SelectControl,
	TextControl, 
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_MODAL_SIZE,
	MODAL_SIZE_OPTIONS,
	ModalSize,
	getModalSizeClassName,
	getModalWidthStyle,
	getSafeCustomModalWidth,
	isValidCssSize,
} from './constants';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The editor preview for the block.
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * Stage A:
 * - Shows the preview card
 * - Shows a non-interactive modal content preview below it
 */
const TEMPLATE = [
	[ 'fun-gutenberg-blocks/card-flip-to-modal-preview' ],
	[ 'fun-gutenberg-blocks/card-flip-to-modal-content' ],
];

const ALLOWED_BLOCKS = [
	'fun-gutenberg-blocks/card-flip-to-modal-preview',
	'fun-gutenberg-blocks/card-flip-to-modal-content',
];

function getModalSizeOptions() {
	return MODAL_SIZE_OPTIONS.map( ( option ) => ( {
		label: __( option.label, 'card-flip-to-modal' ),
		value: option.value,
	} ) );
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
	} = attributes;

	const customWidthIsValid = isValidCssSize( customModalWidth );
	const safeCustomModalWidth =
		getSafeCustomModalWidth( customModalWidth );

	const blockProps = useBlockProps( {
		className: [
			'gb-flip-card-modal',
			'gb-flip-card-modal--editor',
			getModalSizeClassName( modalSize ),
		].join( ' ' ),
		style: getModalWidthStyle( modalSize, safeCustomModalWidth ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Modal Settings', 'card-flip-to-modal' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Modal width', 'card-flip-to-modal' ) }
						value={ modalSize }
						options={ getModalSizeOptions() }
						onChange={ ( value ) =>
							setAttributes( { modalSize: value } )
						}
						help={ __(
							'Choose how wide the modal appears on the front end.',
							'card-flip-to-modal'
						) }
					/>

					{ modalSize === ModalSize.CUSTOM && (
						<>
							<TextControl
								label={ __(
									'Custom modal width',
									'card-flip-to-modal'
								) }
								value={ customModalWidth }
								onChange={ ( value ) =>
									setAttributes( {
										customModalWidth: value,
									} )
								}
								help={ __(
									'Use a valid CSS width such as 720px, 80vw, 45rem, 60%, or clamp(320px, 80vw, 1000px).',
									'card-flip-to-modal'
								) }
							/>

							{ ! customWidthIsValid && (
								<Notice
									status="warning"
									isDismissible={ false }
								>
									{ __(
										'Enter a valid CSS size. The modal will use 720px until this value is valid.',
										'card-flip-to-modal'
									) }
								</Notice>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock="all"
				/>
			</div>
		</>
	);
}