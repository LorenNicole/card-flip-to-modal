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
			'reusable' => false
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
			'reusable' => false
		),
		'textdomain' => 'card-flip-to-modal',
		'editorScript' => 'file:./index.js'
	)
);
