<?php
/**
 * Plugin Name:       Card Flip to Modal
 * Description:       A Gutenberg block that opens custom card content in a modal.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Loren Nicole Simons
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       card-flip-to-modal
 *
 * @package           FunGutenbergBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the Card Flip to Modal parent and child blocks.
 */
function fun_gutenberg_blocks_card_flip_to_modal_block_init() {
	if (
		function_exists( 'wp_register_block_types_from_metadata_collection' ) &&
		file_exists( __DIR__ . '/build/blocks-manifest.php' )
	) {
		wp_register_block_types_from_metadata_collection(
			__DIR__ . '/build',
			__DIR__ . '/build/blocks-manifest.php'
		);

		return;
	}

	register_block_type( __DIR__ . '/build/card-flip-to-modal' );
	register_block_type( __DIR__ . '/build/card-flip-to-modal-preview' );
	register_block_type( __DIR__ . '/build/card-flip-to-modal-content' );
}
add_action( 'init', 'fun_gutenberg_blocks_card_flip_to_modal_block_init' );
