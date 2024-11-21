'use client';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import colors from '@/app/ComponentGlobals/colors';

const ButtonAddStore = () => {
	const navigation = useRouter();
	const handleNavigation = (e: string) => {
		navigation.push(e);
	};
	return (
		<div className='flex justify-end fixed bottom-10 right-10'>
			<IconButton
				onClick={() => handleNavigation('/store/add-item')}
				className='w-fit'
				sx={{
					backgroundColor: colors.primary,
					color: 'white',
					':hover': {
						backgroundColor: colors.primary,
					},
				}}>
				<AddIcon />
			</IconButton>
		</div>
	);
};

export default ButtonAddStore;
