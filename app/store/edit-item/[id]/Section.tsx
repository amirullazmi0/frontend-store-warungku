import React from 'react';
import Form from './Form';
import { Box, Typography } from '@mui/material';
import colors from '@/app/ComponentGlobals/colors';

interface props {
	id: string;
}

const Section: React.FC<props> = ({ id }) => {
	return (
		<Box className='flex flex-col gap-2 min-h-screen'>
			<Typography
				sx={{
					fontSize: '20px',
					textTransform: 'uppercase',
					fontWeight: 'bold',
					color: colors.primary,
				}}>
				Edit Barang Toko
			</Typography>
			<Form id={id} />
		</Box>
	);
};

export default Section;
