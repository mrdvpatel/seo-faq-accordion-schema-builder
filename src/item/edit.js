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
		<div { ...useBlockProps( { className: 'dv-faq-item' } ) }>
			<div className="dv-faq-question">
				<RichText
					tagName="span"
					className="dv-faq-question-text"
					value={ question }
					onChange={ ( value ) => setAttributes( { question: value } ) }
					placeholder={ __( 'Enter your question here...', 'dv-faq-schema-block' ) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>
			</div>
			<div className="dv-faq-answer">
				<RichText
					tagName="div"
					className="dv-faq-answer-text"
					value={ answer }
					onChange={ ( value ) => setAttributes( { answer: value } ) }
					placeholder={ __( 'Enter your answer here...', 'dv-faq-schema-block' ) }
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
				/>
			</div>
		</div>
	);
}
