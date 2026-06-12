/**
 * FAQ Schema Block
 * 
 * Registers the parent and child blocks for the FAQ Schema block.
 * 
 * @since 1.0.0
 */
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

import itemEdit from './item/edit';
import itemSave from './item/save';
import itemMetadata from './item/block.json';

registerBlockType( metadata, {
	edit: Edit,
	save,
} );

registerBlockType( itemMetadata, {
	edit: itemEdit,
	save: itemSave,
} );
