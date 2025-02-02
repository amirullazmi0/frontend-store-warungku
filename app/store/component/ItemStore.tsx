'use client';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { CategoryDTO, itemStore } from '@/DTO/itemStore.dto';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
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
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { GlobalsAxiosResponse } from '@/DTO/globals.dto';

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
			console.log(keyword);

			const queryParams = new URLSearchParams({
				id: '',
				category: categorySelect.join(','),
				keyword: keyword,
			});

			const response = await axios.get(`${apiUrl}/api/item-store?${queryParams.toString()}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.data) {
				console.log('Data received:', response.data);
				setItem(response.data.data);
			}
		} catch (error) {
			console.error('Error fetching items:', error);
		}
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

	const [keyword, setKeyword] = useState<string>('');

	const handleSearch = () => {
		getItem();
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

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
				<Box className='bg-white rounded-xl grid gap-10 p-5 lg:w-[40%] md:w-[60%] w-[100%]'>
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

	const modalRef = useRef<HTMLDialogElement>(null);
	const [category, setCategory] = useState<CategoryDTO[]>();
	const [categorySelect, setCategorySelect] = useState<string[]>([]);

	const handleOnChangeCategorySelect = (categoryId: string) => {
		setCategorySelect(prev => {
			if (!prev) return [categoryId];
			if (prev.includes(categoryId)) {
				return prev.filter(id => id !== categoryId);
			} else {
				return [...prev, categoryId];
			}
		});
	};

	const getCategrory = async () => {
		try {
			const response: {
				data: GlobalsAxiosResponse<CategoryDTO[]>;
			} = await axios.get(`${apiUrl}/api/category`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.data) {
				setCategory(response.data.data);
			}
		} catch (error) {}
	};

	const handleFilter = async () => {
		try {
			getItem();
		} catch (error) {}
	};

	useEffect(() => {
		getCategrory();
	}, []);

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
			<div className='flex items-center gap-2'>
				<FormControl
					sx={{ width: '100%' }}
					variant='outlined'>
					<OutlinedInput
						onChange={e => setKeyword(e.target.value)}
						value={keyword}
						id='outlined-adornment-weight'
						endAdornment={
							<InputAdornment position='end'>
								<SearchIcon />
							</InputAdornment>
						}
						aria-describedby='outlined-weight-helper-text'
						inputProps={{
							'aria-label': 'weight',
						}}
					/>
				</FormControl>
				<Button
					onClick={handleSearch}
					variant='contained'
					sx={{
						height: '100%',
					}}>
					Cari
				</Button>
			</div>

			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<button
				className='button button-primary p-2 w-fit rounded mt-4 flex gap-4'
				onClick={() => {
					setKeyword('');
					modalRef.current?.showModal();
				}} // ✅ Directly calls showModal()
			>
				Filter
				<TuneIcon />
			</button>

			<dialog
				ref={modalRef}
				id='my_modal_4'
				className='modal modal-bottom sm:modal-middle p-4'>
				<div className='modal-box bg-white '>
					<div className='modal-action flex flex-col'>
						<div className='grid lg:md:grid-cols-3'>
							<form
								method='dialog'
								className='lg:md:col-span-3 flex justify-between items-center mb-5'>
								<div className=''>
									<Typography>Filter Item</Typography>
								</div>
								<button className='button button-warning p-1 rounded-full aspect-square'>
									<CloseIcon />
								</button>
							</form>
							{category?.map((item, index) => {
								return (
									<FormControlLabel
										key={index}
										control={
											<Checkbox
												name={item.id}
												checked={categorySelect.includes(item.id)}
												onChange={() => handleOnChangeCategorySelect(item.id)}
											/>
										}
										label={<Typography fontSize={'0.6rem'}>{item.name}</Typography>}
									/>
								);
							})}
							<div className='lg:md:col-span-3 '>
								<Button
									onClick={() => {
										modalRef.current?.close();
										handleFilter();
									}}
									className='bgr-primary text-white w-full mt-5'>
									Filter
								</Button>
							</div>
						</div>
					</div>
				</div>
			</dialog>

			<Box className='grid lg:grid-cols-6 md:grid-cols-4 lg:gap-5 md:gap-3 gap-1  min-h-screen w-full h-fit'>
				<RenderAlertDelete open={alertDelete} />
				{item && item.length > 0 ? (
					item.map((i, index) => {
						return (
							<Box
								className='shadow-lg flex flex-col items-center gap-2 h-fit min-w-40'
								key={index}
								sx={{
									padding: '0.625rem',
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
								<Box className='flex flex-wrap w-full justify-center gap-1'>
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
										onClick={() => navigation.push(`/store/edit-item/${i.id}`)}
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
								</Box>
							</Box>
						);
					})
				) : (
					<Box className='p-5 text-center w-full lg:col-span-6 md:col-span-4'>
						<Typography>Tidak Ada Item</Typography>
					</Box>
				)}
			</Box>
		</>
	);
};

export default ItemStore;
