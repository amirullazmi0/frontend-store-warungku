import React from 'react';
import { Box, Button, Fab, IconButton } from '@mui/material';
import ItemStore from './component/ItemStore';
import ButtonAddStore from './component/ButtonAddStore';

const Section = () => {
	return (
		<section>
			<Box className='grid w-full min-h-screen'>
				<ItemStore />
				<ButtonAddStore />
			</Box>
		</section>
	);
};

export default Section;
