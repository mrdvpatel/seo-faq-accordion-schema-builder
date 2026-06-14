import { useBlockProps, InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'dv-faq-schema-block/faq-item' ];
const TEMPLATE = [
	[ 'dv-faq-schema-block/faq-item', {} ],
	[ 'dv-faq-schema-block/faq-item', {} ],
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
		className: `dv-faq-accordion-wrapper display-mode-${displayMode}`,
		style: {
			'--faq-expand-icon': expandIconUrl ? `url(${expandIconUrl})` : undefined,
			'--faq-collapse-icon': collapseIconUrl ? `url(${collapseIconUrl})` : undefined,
		}
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'FAQ Settings', 'dv-faq-schema-block' ) }>
					<SelectControl
						label={ __( 'Display Mode', 'dv-faq-schema-block' ) }
						value={ displayMode }
						options={ [
							{ label: __( 'Accordion', 'dv-faq-schema-block' ), value: 'accordion' },
							{ label: __( 'Always Expanded', 'dv-faq-schema-block' ), value: 'expanded' },
						] }
						onChange={ ( value ) => setAttributes( { displayMode: value } ) }
					/>
				</PanelBody>
				{ displayMode === 'accordion' && (
					<PanelBody title={ __( 'Icon Settings', 'dv-faq-schema-block' ) } initialOpen={ false }>
						<div className="dv-faq-icon-setting">
							<p><strong>{ __( 'Expand Icon', 'dv-faq-schema-block' ) }</strong></p>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { expandIconUrl: media.url } ) }
									allowedTypes={ [ 'image' ] }
									value={ expandIconUrl }
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open }>
											{ expandIconUrl ? __( 'Replace Image', 'dv-faq-schema-block' ) : __( 'Upload Image', 'dv-faq-schema-block' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ expandIconUrl && (
								<Button variant="link" isDestructive onClick={ () => setAttributes( { expandIconUrl: '' } ) }>
									{ __( 'Remove', 'dv-faq-schema-block' ) }
								</Button>
							) }
						</div>
						<div className="dv-faq-icon-setting" style={{ marginTop: '1rem' }}>
							<p><strong>{ __( 'Collapse Icon', 'dv-faq-schema-block' ) }</strong></p>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => setAttributes( { collapseIconUrl: media.url } ) }
									allowedTypes={ [ 'image' ] }
									value={ collapseIconUrl }
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open }>
											{ collapseIconUrl ? __( 'Replace Image', 'dv-faq-schema-block' ) : __( 'Upload Image', 'dv-faq-schema-block' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ collapseIconUrl && (
								<Button variant="link" isDestructive onClick={ () => setAttributes( { collapseIconUrl: '' } ) }>
									{ __( 'Remove', 'dv-faq-schema-block' ) }
								</Button>
							) }
						</div>
					</PanelBody>
				) }
			</InspectorControls>
			<div className={`dv-faq-accordion-wrapper display-mode-${ displayMode }`}>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
				/>
			</div>
		</div>
	);
}
