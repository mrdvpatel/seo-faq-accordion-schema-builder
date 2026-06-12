import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function for the FAQ Schema Parent Block.
 *
 * Renders the wrapper and inner block content for the frontend.
 *
 * @since 1.0.0
 *
 * @param {Object} props            The component props.
 * @param {Object} props.attributes The block attributes.
 * @return {JSX.Element} The block save interface.
 */
export default function save( { attributes } ) {
	const { displayMode, expandIconUrl, collapseIconUrl } = attributes;
	
	const blockProps = useBlockProps.save( {
		className: `seo-faq-accordion-wrapper display-mode-${displayMode}`,
		style: {
			'--faq-expand-icon': expandIconUrl ? `url(${expandIconUrl})` : undefined,
			'--faq-collapse-icon': collapseIconUrl ? `url(${collapseIconUrl})` : undefined,
		}
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
