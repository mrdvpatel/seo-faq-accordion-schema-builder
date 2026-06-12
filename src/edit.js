import { useBlockProps, InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'seo-faq-accordion-schema-builder/faq-item' ];
const TEMPLATE = [
	[ 'seo-faq-accordion-schema-builder/faq-item', {} ],
	[ 'seo-faq-accordion-schema-builder/faq-item', {} ],
];

/**
 * Edit function for the FAQ Schema Parent Block.
 *
 * Allows users to select the display mode (Accordion or Always Expanded) and
 * provides an InnerBlocks area restricted to the FAQ Item child block.
 *
 * @since 1.0.0
 *
 * @param {Object}   props               The component props.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {JSX.Element} The block edit interface.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { displayMode, expandIconUrl, collapseIconUrl } = attributes;

	const blockProps = useBlockProps( {
		className: `seo-faq-accordion-wrapper display-mode-${displayMode}`,
		style: {
			'--faq-expand-icon': expandIconUrl ? `url(${expandIconUrl})` : undefined,
			'--faq-collapse-icon': collapseIconUrl ? `url(${collapseIconUrl})` : undefined,
		}
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'FAQ Settings', 'seo-faq-accordion-schema-builder' ) }>
					<SelectControl
						label={ __( 'Display Mode', 'seo-faq-accordion-schema-builder' ) }
						value={ displayMode }
						options={ [
							{ label: __( 'Accordion', 'seo-faq-accordion-schema-builder' ), value: 'accordion' },
							{ label: __( 'Always Expanded', 'seo-faq-accordion-schema-builder' ), value: 'expanded' },
						] }
						onChange={ ( value ) => setAttributes( { displayMode: value } ) }
					/>
				</PanelBody>
				{ displayMode === 'accordion' && (
					<PanelBody title={ __( 'Icon Settings', 'seo-faq-accordion-schema-builder' ) } initialOpen={ false }>
						<div className="seo-faq-icon-setting">
							<p><strong>{ __( 'Expand Icon', 'seo-faq-accordion-schema-builder' ) }</strong></p>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { expandIconUrl: media.url } ) }
									allowedTypes={ [ 'image' ] }
									value={ expandIconUrl }
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open }>
											{ expandIconUrl ? __( 'Replace Image', 'seo-faq-accordion-schema-builder' ) : __( 'Upload Image', 'seo-faq-accordion-schema-builder' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ expandIconUrl && (
								<Button variant="link" isDestructive onClick={ () => setAttributes( { expandIconUrl: '' } ) }>
									{ __( 'Remove', 'seo-faq-accordion-schema-builder' ) }
								</Button>
							) }
						</div>
						<div className="seo-faq-icon-setting" style={{ marginTop: '1rem' }}>
							<p><strong>{ __( 'Collapse Icon', 'seo-faq-accordion-schema-builder' ) }</strong></p>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { collapseIconUrl: media.url } ) }
									allowedTypes={ [ 'image' ] }
									value={ collapseIconUrl }
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open }>
											{ collapseIconUrl ? __( 'Replace Image', 'seo-faq-accordion-schema-builder' ) : __( 'Upload Image', 'seo-faq-accordion-schema-builder' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ collapseIconUrl && (
								<Button variant="link" isDestructive onClick={ () => setAttributes( { collapseIconUrl: '' } ) }>
									{ __( 'Remove', 'seo-faq-accordion-schema-builder' ) }
								</Button>
							) }
						</div>
					</PanelBody>
				) }
			</InspectorControls>
			<div className={`seo-faq-accordion-wrapper display-mode-${ displayMode }`}>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
				/>
			</div>
		</div>
	);
}
