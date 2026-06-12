import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Edit function for the FAQ Item Child Block.
 *
 * Provides RichText inputs for editing the Question and the Answer.
 *
 * @since 1.0.0
 *
 * @param {Object}   props               The component props.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {JSX.Element} The block edit interface.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { question, answer } = attributes;

	return (
		<div { ...useBlockProps( { className: 'seo-faq-item' } ) }>
			<div className="seo-faq-question">
				<RichText
					tagName="span"
					className="seo-faq-question-text"
					value={ question }
					onChange={ ( value ) => setAttributes( { question: value } ) }
					placeholder={ __( 'Enter your question here...', 'seo-faq-accordion-schema-builder' ) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>
			</div>
			<div className="seo-faq-answer">
				<RichText
					tagName="div"
					className="seo-faq-answer-text"
					value={ answer }
					onChange={ ( value ) => setAttributes( { answer: value } ) }
					placeholder={ __( 'Enter your answer here...', 'seo-faq-accordion-schema-builder' ) }
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
				/>
			</div>
		</div>
	);
}
