import colors from '@/app/ComponentGlobals/colors';
import { Label } from '@mui/icons-material';
import { Box, Button, InputLabel, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import Form from './component/Form';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const Section = () => {
	return (
		<Box className='flex flex-col gap-2'>
			<Typography
				sx={{
					fontSize: '20px',
					textTransform: 'uppercase',
					fontWeight: 'bold',
					color: colors.primary,
				}}>
				Tambah Barang Toko
			</Typography>
			<Form />
		</Box>
	);
};

export default Section;
