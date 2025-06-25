import React from 'react';
import { Box, Button, Fab, IconButton, Stack } from '@mui/material';
import ItemStore from './component/ItemStore';
import ButtonAddStore from './component/ButtonAddStore';

const Section = () => {
	return (
		<section>
			<Stack
				sx={{
					minHeight: '100vh',
					width: '100%',
				}}>
				<ItemStore />
				<ButtonAddStore />
			</Stack>
		</section>
	);
};

export default Section;
