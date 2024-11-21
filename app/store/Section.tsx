import React from 'react';
import { Box, Button, Fab, IconButton } from '@mui/material';
import ItemStore from './component/ItemStore';
import ButtonAddStore from './component/ButtonAddStore';

const Section = () => {
	return (
		<section>
			<Box className='flex flex-col gap-4 w-full h-full'>
				<ItemStore />
				<ButtonAddStore />
			</Box>
		</section>
	);
};

export default Section;
