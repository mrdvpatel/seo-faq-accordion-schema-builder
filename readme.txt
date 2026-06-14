=== DV FAQ Schema Block ===
Contributors: dvpatel
Tags: faq, schema, seo, rich-results, gutenberg
Requires at least: 5.8
Tested up to: 7.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A clean, Gutenberg-native block for FAQ sections that automatically outputs valid JSON-LD FAQPage schema markup.

== Description ==

The **FAQ Schema Block** plugin provides a seamless way to create FAQ sections in the WordPress Block Editor (Gutenberg) while automatically generating the necessary `FAQPage` JSON-LD schema for Google Rich Results.

By using this plugin, you can significantly improve your SEO visibility and rank for Google rich results with paired Question + Answer blocks.

Features include:
* Built specifically for the modern WordPress Block Editor (Gutenberg).
* Beautiful "Accordion" and "Always Expanded" display options.
* Outputs valid `application/ld+json` schema directly on the frontend.
* Lightweight: Uses native HTML5 `<details>` and `<summary>` tags without bloating your site with heavy JavaScript.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/faq-schema-block` directory, or install the plugin through the WordPress plugins screen directly using the `faq-schema-block.zip` file.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Edit any Post or Page and search for "FAQ Schema" in the block inserter.
4. Add your Questions and Answers!

== Frequently Asked Questions ==

= Does it output valid schema? =
Yes, it automatically generates valid JSON-LD `FAQPage` schema based on the Questions and Answers you provide inside the block. This helps your page qualify for Google Rich Results.

= Will this plugin slow down my website? =
No, absolutely not! Unlike other accordion plugins that load heavy jQuery or JavaScript libraries, this block uses native HTML5 `<details>` and `<summary>` elements. It is incredibly fast and lightweight.

= Can I use multiple FAQ blocks on the same page? =
Yes, you can add as many FAQ items as you need. The plugin will intelligently group them and output a unified, correctly formatted JSON-LD script for the entire page.

= Does it work with any WordPress theme? =
Yes! As long as your theme supports the WordPress Block Editor (Gutenberg), this plugin will work seamlessly.

= How do I test if my schema is working? =
Once you add the block and publish the page, you can copy your page URL and paste it into Google's official [Rich Results Testing Tool](https://search.google.com/test/rich-results) to verify the schema.

= Can I style the accordion? =
Yes. The accordion inherits typography and colors directly from your theme so it matches your brand immediately. It also includes minimal structural CSS to ensure it looks great out of the box, which can be easily overridden via your theme's stylesheet.

== Changelog ==

= 1.0.0 =
* Initial release. Features FAQ block, Accordion styling, and dynamic JSON-LD schema generation.

== Source Code ==

The source code for this plugin is included directly within the plugin's `src/` directory.

To build the plugin assets (if you modify the source files):
1. Navigate to the plugin directory in your terminal.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to compile the JavaScript and CSS assets via `@wordpress/scripts`.

All unminified source files can be found in the `src/` folder of the plugin zip.
