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
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from 'next/navigation';

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
	const [alertWishlist, setAlertWishlist] = useState<boolean>(false);
	const [alertCart, setAlertCart] = useState<boolean>(false);
	const navigation = useRouter();

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

	const handleAddToWishlist = async (itemId: string) => {
		setAlertWishlist(true);

		try {
			const response = await axios.post(
				`${apiUrl}/wishlist/add`,
				{
					accessToken: Cookies.get('access-token'),
					itemStoreId: itemId,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.data) {
				setAlertWishlist(true);

				setTimeout(() => {
					setAlertWishlist(false);
				}, 3000);
			}
		} catch (error) {
			console.error('Error adding to wishlist:', error);
			setAlertWishlist(false);
		}
	};

	const handleAddToCart = async (itemId: string) => {
		setAlertCart(true);

		try {
			const response = await axios.post(
				`${apiUrl}/cart/add`,
				{
					accessToken: Cookies.get('access-token'),
					itemStoreId: itemId,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.data) {
				setAlertCart(true);

				setTimeout(() => {
					setAlertCart(false);
				}, 3000);
			}
		} catch (error) {
			console.error('Error adding to cart:', error);
			setAlertCart(false);
		}
	};

	const RenderAlertDelete: React.FC<modalAlertDeleteType> = ({ open }) => {
		useEffect(() => {
			if (open) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}

			return () => {
				document.body.style.overflow = '';
			};
		}, [open]);

		return (
			<Box className={`fixed h-screen w-screen justify-center items-center bg-slate-950 overflow-hidden scroll z-50 top-0 left-0 bg-opacity-30 ${open ? 'flex' : 'hidden'}`}>
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
		<>
			{alertSuccess && (
				<Alert
					icon={<CheckIcon fontSize='inherit' />}
					severity='success'>
					Barang Behasil di hapus
				</Alert>
			)}
			{alertWishlist && (
				<Alert
					icon={<CheckIcon fontSize='inherit' />}
					severity='success'>
					Success! Added to Wishlist
				</Alert>
			)}
			{alertCart && (
				<Alert
					icon={<CheckIcon fontSize='inherit' />}
					severity='success'>
					Success! Added to Cart
				</Alert>
			)}
			<Box className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-5  min-h-screen w-full h-fit'>
				<RenderAlertDelete open={alertDelete} />
				{item?.map((i, index) => {
					return (
						<Box
							className='shadow-lg flex flex-col items-center gap-2 h-fit'
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
							<Box className='flex w-full justify-center gap-1'>
								<IconButton
									onClick={() => navigation.push(`/store/item-store/${i.id}`)}
									sx={{
										backgroundColor: colors.success,
										':hover': {
											backgroundColor: colors.success,
										},
									}}>
									<DescriptionIcon />
								</IconButton>
								<IconButton
									sx={{
										backgroundColor: colors.warning,
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
								{/* <IconButton
                  onClick={() => handleAddToWishlist(i.id)}
                  sx={{
                    backgroundColor: colors.primary,
                    color: 'white',
                    ':hover': {
                      backgroundColor: colors.primary,
                    },
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleAddToCart(i.id)}
                  sx={{
                    backgroundColor: colors.primary,
                    color: 'white',
                    ':hover': {
                      backgroundColor: colors.transparant,
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton> */}
							</Box>
						</Box>
					);
				})}
			</Box>
		</>
	);
};

export default ItemStore;
