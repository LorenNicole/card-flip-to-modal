<?php
// This file is generated. Do not modify it manually.
return array(
	'card-flip-to-modal' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'fun-gutenberg-blocks/card-flip-to-modal',
		'version' => '0.1.0',
		'title' => 'Card Flip to Modal',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'A Gutenberg block that opens custom card content in a modal.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'flipAnimationEnabled' => array(
				'type' => 'boolean',
				'default' => true
			),
			'flipAnimationDuration' => array(
				'type' => 'number',
				'default' => 700
			)
		),
		'textdomain' => 'card-flip-to-modal',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'card-flip-to-modal-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'fun-gutenberg-blocks/card-flip-to-modal-content',
		'version' => '0.1.0',
		'title' => 'Card Flip to Modal Content',
		'category' => 'widgets',
		'icon' => 'welcome-widgets-menus',
		'description' => 'Editable modal content for the Card Flip to Modal block.',
		'parent' => array(
			'fun-gutenberg-blocks/card-flip-to-modal'
		),
		'supports' => array(
			'html' => false,
			'reusable' => false,
			'inserter' => false
		),
		'attributes' => array(
			'modalSize' => array(
				'type' => 'string',
				'enum' => array(
					'small',
					'medium',
					'large',
					'custom'
				),
				'default' => 'medium'
			),
			'customModalWidth' => array(
				'type' => 'string',
				'default' => '720px'
			),
			'modalBorderRadius' => array(
				'type' => 'number',
				'default' => 0
			),
			'modalBorderStyle' => array(
				'type' => 'string',
				'enum' => array(
					'solid',
					'dashed',
					'dotted',
					'double',
					'none'
				),
				'default' => 'none'
			),
			'modalBorderColor' => array(
				'type' => 'string',
				'default' => '#d0d0d0'
			),
			'modalBorderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'modalBackgroundColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'modalPaddingTop' => array(
				'type' => 'number',
				'default' => 32
			),
			'modalPaddingRight' => array(
				'type' => 'number',
				'default' => 32
			),
			'modalPaddingBottom' => array(
				'type' => 'number',
				'default' => 32
			),
			'modalPaddingLeft' => array(
				'type' => 'number',
				'default' => 32
			),
			'modalMarginTop' => array(
				'type' => 'number',
				'default' => 0
			),
			'modalMarginRight' => array(
				'type' => 'number',
				'default' => 0
			),
			'modalMarginBottom' => array(
				'type' => 'number',
				'default' => 0
			),
			'modalMarginLeft' => array(
				'type' => 'number',
				'default' => 0
			),
			'modalAriaLabel' => array(
				'type' => 'string',
				'default' => 'Card modal content'
			),
			'modalCloseOnBackdropClick' => array(
				'type' => 'boolean',
				'default' => false
			),
			'modalLockPageScroll' => array(
				'type' => 'boolean',
				'default' => true
			),
			'closeButtonText' => array(
				'type' => 'string',
				'default' => '×'
			),
			'closeButtonAriaLabel' => array(
				'type' => 'string',
				'default' => 'Close modal'
			),
			'closeButtonPosition' => array(
				'type' => 'string',
				'enum' => array(
					'top-right',
					'top-left'
				),
				'default' => 'top-right'
			),
			'closeButtonSize' => array(
				'type' => 'number',
				'default' => 36
			),
			'closeButtonBackgroundColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'closeButtonTextColor' => array(
				'type' => 'string',
				'default' => '#111111'
			),
			'closeButtonBorderColor' => array(
				'type' => 'string',
				'default' => '#d0d0d0'
			),
			'closeButtonBorderRadius' => array(
				'type' => 'number',
				'default' => 999
			)
		),
		'textdomain' => 'card-flip-to-modal',
		'editorScript' => 'file:./index.js'
	),
	'card-flip-to-modal-preview' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'fun-gutenberg-blocks/card-flip-to-modal-preview',
		'version' => '0.1.0',
		'title' => 'Card Flip to Modal Preview',
		'category' => 'widgets',
		'icon' => 'format-image',
		'description' => 'Editable preview card content for the Card Flip to Modal block.',
		'parent' => array(
			'fun-gutenberg-blocks/card-flip-to-modal'
		),
		'supports' => array(
			'html' => false,
			'reusable' => false,
			'inserter' => false
		),
		'attributes' => array(
			'previewMinHeight' => array(
				'type' => 'number',
				'default' => 220
			),
			'previewHasShadow' => array(
				'type' => 'boolean',
				'default' => true
			),
			'previewHasHoverLift' => array(
				'type' => 'boolean',
				'default' => true
			),
			'previewBackgroundColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'previewBorderColor' => array(
				'type' => 'string',
				'default' => '#d0d0d0'
			),
			'previewBorderStyle' => array(
				'type' => 'string',
				'enum' => array(
					'solid',
					'dashed',
					'dotted',
					'double',
					'none'
				),
				'default' => 'solid'
			),
			'previewBorderRadius' => array(
				'type' => 'number',
				'default' => 0
			),
			'previewBorderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'previewTextColor' => array(
				'type' => 'string',
				'default' => '#111111'
			),
			'previewOpenElementId' => array(
				'type' => 'string',
				'default' => ''
			),
			'previewOpenElementIdInitialized' => array(
				'type' => 'boolean',
				'default' => false
			),
			'previewPaddingTop' => array(
				'type' => 'number',
				'default' => 24
			),
			'previewPaddingRight' => array(
				'type' => 'number',
				'default' => 24
			),
			'previewPaddingBottom' => array(
				'type' => 'number',
				'default' => 24
			),
			'previewPaddingLeft' => array(
				'type' => 'number',
				'default' => 24
			),
			'previewMarginTop' => array(
				'type' => 'number',
				'default' => 0
			),
			'previewMarginRight' => array(
				'type' => 'number',
				'default' => 0
			),
			'previewMarginBottom' => array(
				'type' => 'number',
				'default' => 0
			),
			'previewMarginLeft' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'textdomain' => 'card-flip-to-modal',
		'editorScript' => 'file:./index.js'
	)
);
