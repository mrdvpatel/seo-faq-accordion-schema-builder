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
		<details { ...useBlockProps.save( { className: 'dv-faq-item' } ) }>
			<summary className="dv-faq-question">
				<RichText.Content
					tagName="span"
					className="dv-faq-question-text"
					value={ question }
				/>
			</summary>
			<div className="dv-faq-answer">
				<RichText.Content
					tagName="div"
					className="dv-faq-answer-text"
					value={ answer }
				/>
			</div>
		</details>
	);
}
