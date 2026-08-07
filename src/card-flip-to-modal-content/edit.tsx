/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	InnerBlocks,
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
	DEFAULT_MODAL_ARIA_LABEL,
	DEFAULT_MODAL_SIZE,
	MODAL_SIZE_OPTIONS,
	type ModalSizeValue,
	getModalSizeClassName,
	getModalWidthStyle,
	getSafeCustomModalWidth,
	isValidCssSize,
} from '../card-flip-to-modal/constants';

const ALLOWED_BLOCKS = [
	'core/image',
	'core/heading',
	'core/paragraph',
	'core/list',
	'core/buttons',
	'core/video',
	'core/group',
	'core/columns',
	'core/column',
	'core/shortcode',
	'core/latest-posts',
];

const TEMPLATE: [ string, Record< string, unknown >? ][] = [
	[
		'core/heading',
		{
			level: 2,
			content: 'Modal Content',
		},
	],
	[
		'core/paragraph',
		{
			content: 'This is where expanded custom modal content will appear.',
		},
	],
];

interface EditAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	modalAriaLabel?: string;
}

interface EditProps {
	attributes: EditAttributes;
	setAttributes: ( attributes: Partial< EditAttributes > ) => void;
}

export default function Edit( { attributes, setAttributes }: EditProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
		modalAriaLabel = DEFAULT_MODAL_ARIA_LABEL,
	} = attributes;
	
	const customWidthIsValid = isValidCssSize( customModalWidth );
	
	const safeCustomModalWidth = getSafeCustomModalWidth( customModalWidth );

	const blockProps = useBlockProps( {
		className: [
			'gb-flip-card-modal__editor-modal-preview',
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
						options={ MODAL_SIZE_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( {
								modalSize: value as ModalSizeValue,
							} )
						}
					/>

					{ modalSize === 'custom' && (
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
									'Use a valid CSS width such as 720px, 80vw, 45rem, 60%, clamp(320px, 80vw, 1000px), or calc(100vw - 4rem).',
									'card-flip-to-modal'
								) }
							/>

							{ ! customWidthIsValid && (
								<Notice
									status="warning"
									isDismissible={ false }
								>
									{ __(
										'Enter a valid CSS width. The default width will be used until this value is valid.',
										'card-flip-to-modal'
									) }
								</Notice>
							) }
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Accessibility Settings', 'card-flip-to-modal' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Modal label', 'card-flip-to-modal' ) }
						value={ modalAriaLabel }
						onChange={ ( value ) =>
							setAttributes( {
								modalAriaLabel: value || DEFAULT_MODAL_ARIA_LABEL,
							} )
						}
						help={ __(
							'Describe the purpose of the modal for screen readers. If left blank, the default label will be used.',
							'card-flip-to-modal'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="gb-flip-card-modal__editor-section-header">
					<strong>Expanded Modal Content</strong>
					<p>
						This content appears inside the modal after the preview area is
						clicked. Add longer text, images, buttons, lists, or other
						supported content here.
					</p>
				</div>

				<div className="gb-flip-card-modal__content">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
}