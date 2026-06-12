import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save function for the FAQ Item Child Block.
 *
 * Renders the static HTML for a single Question and Answer pair using
 * HTML5 details and summary tags.
 *
 * @since 1.0.0
 *
 * @param {Object} props            The component props.
 * @param {Object} props.attributes The block attributes.
 * @return {JSX.Element} The block save interface.
 */
export default function save( { attributes } ) {
	const { question, answer } = attributes;

	return (
		<details { ...useBlockProps.save( { className: 'seo-faq-item' } ) }>
			<summary className="seo-faq-question">
				<RichText.Content
					tagName="span"
					className="seo-faq-question-text"
					value={ question }
				/>
			</summary>
			<div className="seo-faq-answer">
				<RichText.Content
					tagName="div"
					className="seo-faq-answer-text"
					value={ answer }
				/>
			</div>
		</details>
	);
}
