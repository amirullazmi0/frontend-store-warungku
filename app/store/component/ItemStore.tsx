'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { itemStore } from '@/DTO/itemStore.dto';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import defaultJpg from '@/public/image/defaultJpg.png';
import colors from '@/app/ComponentGlobals/colors';
import { formatNumber } from '@/app/utils/formatNumber';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

interface modalAlertDeleteType {
	open: boolean;
}

const ItemStore = () => {
	const accessToken = Cookies.get('access-token');
	const apiUrl = process.env.API_URL;
	const [item, setItem] = useState<itemStore[]>();
	const [alertDelete, setAlertDelete] = useState<boolean>(false);
	const [selectedDeleteItem, setSelectedDeletedItem] = useState<string>('');
	const [alertSuccess, setAlertSuccess] = useState<boolean>(false);
	const handleDelete = async () => {
		try {
			const response = await axios.delete(`${apiUrl}/api/item-store`, {
				data: {
					id: selectedDeleteItem,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.data) {
				getItem();
				handleCancelDelete();
			}

			setTimeout(() => {
				setAlertSuccess(false);
			}, 3000);
		} catch (error) {}
	};

	const getItem = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/item-store`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.data) {
				const itemData: itemStore[] = response.data?.data;
				setItem(itemData);
			}
		} catch (error) {}
	};

	useEffect(() => {
		getItem();
	}, []);

	const handleCancelDelete = () => {
		setAlertDelete(false);
		setSelectedDeletedItem('');
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setAlertDelete(false);
			setSelectedDeletedItem('');
		}
	};

	const handleAlertDelete = (id: string) => {
		setSelectedDeletedItem(id);
		setAlertDelete(true);
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const RenderAlertDelete: React.FC<modalAlertDeleteType> = ({ open }) => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return (
			<Box
				className={`fixed h-screen w-screen justify-center items-center bg-slate-950 overflow-hidden scroll z-50 top-0 left-0 bg-opacity-30 ${
					open ? 'flex' : 'hidden'
				}`}>
				<Box className='bg-white rounded-xl grid gap-10 p-5 lg:w-[40%] md:w-[60%] w-[80%]'>
					<Typography className='text-center'>Yakin untuk menghapus ?</Typography>
					<Box className='flex justify-center w-full gap-2'>
						<Button
							onClick={handleDelete}
							color='success'>
							<DoneIcon />
						</Button>
						<Button
							onClick={() => handleCancelDelete()}
							color='warning'>
							<CloseIcon />
						</Button>
					</Box>
				</Box>
			</Box>
		);
	};

	return (
		<Box className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-5  min-h-screen w-full'>
			<RenderAlertDelete open={alertDelete} />
			{item?.map((i, index) => {
				return (
					<Button
						className='shadow-lg flex flex-col items-center gap-2'
						key={index}
						sx={{
							padding: '10px',
							borderRadius: '10px',
							backgroundColor: 'white',
							textTransform: 'none',
							':hover': {
								backgroundColor: 'white',
							},
						}}>
						<Image
							alt={i.name}
							height={100}
							width={500}
							className='aspect-square object-cover'
							src={i.itemStoreImages[0]?.path ?? defaultJpg}
							style={{
								borderRadius: '10px',
							}}
						/>
						<Typography
							sx={{
								color: 'black',
								fontWeight: 600,
							}}>
							{i.name}
						</Typography>
						<Typography
							sx={{
								width: '100%',
								textAlign: 'left',
							}}>
							Rp.{' '}
							<span
								style={{
									fontWeight: 600,
								}}>
								{formatNumber(i.price)}
							</span>
						</Typography>
						<Typography
							sx={{
								width: '100%',
								textAlign: 'left',
							}}>
							qty : {i.qty}
						</Typography>
						<Box className='flex w-full justify-end gap-1'>
							<IconButton
								sx={{
									backgroundColor: colors.success,
									color: 'white',
									':hover': {
										backgroundColor: colors.success,
									},
								}}>
								<ContentPasteSearchIcon />
							</IconButton>
							<IconButton
								sx={{
									backgroundColor: colors.warning,
									// color: 'black',
									':hover': {
										backgroundColor: colors.warning,
									},
								}}>
								<EditIcon />
							</IconButton>
							<IconButton
								onClick={() => handleAlertDelete(i.id)}
								sx={{
									backgroundColor: colors.error,
									color: 'white',
									':hover': {
										backgroundColor: colors.error,
									},
								}}>
								<DeleteIcon />
							</IconButton>
						</Box>
					</Button>
				);
			})}
		</Box>
	);
};

export default ItemStore;