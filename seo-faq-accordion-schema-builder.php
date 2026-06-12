<?php
/**
 * Plugin Name: SEO FAQ Accordion & Schema Builder
 * Description: A clean, Gutenberg-native block for FAQ sections that automatically outputs valid JSON-LD FAQPage schema markup. Improve your SEO visibility and rank for Google rich results with paired Question + Answer blocks and flexible display options.
 * Version: 1.0.0
 * Author: Dhaval Vachhani
 * Author URI: https://dhavalwp.com
 * Text Domain: seo-faq-accordion-schema-builder
 * Requires at least: 5.8
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 1.0.0
 * @return void
 */
function seo_faq_accordion_schema_builder_block_init() {
	// Register the child block if its block.json exists
	if ( file_exists( __DIR__ . '/build/item/block.json' ) ) {
		register_block_type( __DIR__ . '/build/item' );
	}

	// Register the parent block and its render callback
	register_block_type( __DIR__ . '/build', array(
		'render_callback' => 'seo_faq_accordion_schema_builder_render_callback',
	) );
}
add_action( 'init', 'seo_faq_accordion_schema_builder_block_init' );

/**
 * Render callback for the FAQ block.
 *
 * This function iterates through the block's inner blocks, extracts the question
 * and answer text from the rendered HTML, and generates a valid JSON-LD FAQPage schema.
 *
 * @since 1.0.0
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content HTML.
 * @param WP_Block $block      The parsed block object instance.
 * @return string The block content with the prepended JSON-LD script tag.
 */
function seo_faq_accordion_schema_builder_render_callback( $attributes, $content, $block ) {
	$display_mode = isset( $attributes['displayMode'] ) ? $attributes['displayMode'] : 'accordion';
	$schema_entities = array();

	// Process inner blocks to extract Q&A for the schema
	if ( ! empty( $block->inner_blocks ) ) {
		foreach ( $block->inner_blocks as $inner_block ) {
			if ( 'seo-faq-accordion-schema-builder/faq-item' === $inner_block->name ) {
				$inner_html = render_block( $inner_block->parsed_block );
				
				// Extract question text
				if ( ! empty( $inner_block->attributes['question'] ) ) {
					$q = wp_strip_all_tags( $inner_block->attributes['question'] );
				} else {
					preg_match( '/class="[^"]*seo-faq-question-text[^"]*"[^>]*>(.*?)<\/span>/is', $inner_html, $q_match );
					$q = ! empty( $q_match[1] ) ? wp_strip_all_tags( $q_match[1] ) : '';
				}

				// Extract answer text
				if ( ! empty( $inner_block->attributes['answer'] ) ) {
					$a = wp_kses_post( $inner_block->attributes['answer'] );
				} else {
					preg_match( '/class="[^"]*seo-faq-answer-text[^"]*"[^>]*>(.*?)<\/div>/is', $inner_html, $a_match );
					$a = ! empty( $a_match[1] ) ? wp_kses_post( $a_match[1] ) : '';
				}
				
				if ( ! empty( $q ) && ! empty( $a ) ) {
					$schema_entities[] = array(
						'@type'          => 'Question',
						'name'           => $q,
						'acceptedAnswer' => array(
							'@type' => 'Answer',
							'text'  => $a,
						),
					);
				}
			}
		}
	}

	// If display mode is expanded, modify the content to add the 'open' attribute to details elements
	if ( 'expanded' === $display_mode ) {
		$content = preg_replace( '/(<details[^>]*class="[^"]*seo-faq-item[^"]*"[^>]*)(>)/is', '$1 open$2', $content );
	}

	// Generate JSON-LD script
	$schema_html = '';
	if ( ! empty( $schema_entities ) ) {
		$schema = array(
			'@context'   => 'https://schema.org',
			'@type'      => 'FAQPage',
			'mainEntity' => $schema_entities,
		);
		// Output script without wrapper to ensure valid JSON-LD
		$schema_html = '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>';
	}

	return $schema_html . $content;
}
