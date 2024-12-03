import colors from '@/app/ComponentGlobals/colors';
import { formItemStoreSchema } from '@/app/lib/config/config';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, InputLabel, styled, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import defaultJpg from '@/public/image/defaultJpg.png';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AlertSuccess, IsLoading } from '@/app/ComponentGlobals/alert';
const Form = () => {
	const form = useForm({
		resolver: yupResolver(formItemStoreSchema),
		mode: 'onChange',
	});

	const { control, getValues, handleSubmit, reset, setValue } = form;
	const [loading, setLoading] = useState<boolean>(false);
	const apiUrl = process.env.API_URL;
	const accessToken = Cookies.get('access-token');
	const navigation = useRouter();
	const [postSuccess, setPostSuccess] = useState<boolean>(false);
	const handleSubmitForm = async () => {
		const formData = new FormData();
		const values = getValues();

		formData.append('name', values.name);
		formData.append('price', values.price.toString());
		formData.append('qty', values.qty.toString());
		formData.append('desc', values.desc || '');

		if (values.images?.length) {
			values.images.forEach(file => {
				formData.append('images', file);
			});
		}

		setLoading(true);

		try {
			const response = await axios.post(`${apiUrl}/api/item-store`, formData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (response.data) {
				setLoading(false);
				setPostSuccess(true);
			}

			setTimeout(() => {
				navigation.push('/store');
			}, 3000);
		} catch (error) {}
	};

	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1,
	});

	const [imagePreview, setIamgePreview] = useState<
		{
			index: number;
			url: string;
		}[]
	>([]);
	const handleDeleteSelectedImage = (indexToDelete: number) => {
		const currentImages = getValues('images');

		const updatedImages = currentImages.filter((_, index) => index !== indexToDelete);
		const updatedImagesPreview = imagePreview.filter((_, index) => index !== indexToDelete);

		setIamgePreview(updatedImagesPreview);
		setValue('images', updatedImages);
	};

	const handleAddImage = (files: FileList | null) => {
		if (!files) return;

		const currentImages = getValues('images') || [];
		const newImages = Array.from(files);

		const newImagesPreview = Array.from(files).map((file, index: number) => ({
			index: index,
			url: URL.createObjectURL(file),
		}));

		setIamgePreview([...imagePreview, ...newImagesPreview]);

		setValue('images', [...currentImages, ...newImages]);
	};

	return (
		<Box className='grid grid-cols-2 gap-4 p-4 shadow-lg lg:w-[70%] rounded-2xl h-fit'>
			<AlertSuccess
				message='Berhasil Tambah Barang'
				open={postSuccess}
			/>
			<IsLoading open={loading} />
			{/* NAME */}
			<Controller
				control={control}
				defaultValue=''
				name='name'
				render={({ field, fieldState }) => (
					<Box className='grid h-fit'>
						<Box className='grid gap-2'>
							<InputLabel
								required
								sx={{
									color: colors.primary,
									'& .MuiInputLabel-asterisk': {
										color: 'red',
									},
								}}>
								Nama Barang
							</InputLabel>
							<TextField
								{...field}
								error={Boolean(fieldState.error)}
								placeholder='contoh : Lemari'
								sx={{
									width: '100%',
									border: `1px solid ${colors.primary}`,
									borderRadius: '12px',
									input: {
										// color: colors.primary,
									},
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											border: 'none',
										},
									},
								}}
								inputProps={{
									maxLength: 100,
								}}
							/>
						</Box>
						{fieldState.error && (
							<Typography
								sx={{
									color: 'red',
									fontSize: '12px',
									marginTop: '5px',
									width: 'fit-content',
								}}>
								{fieldState.error?.message}
							</Typography>
						)}
					</Box>
				)}
			/>

			{/* HARGA */}
			<Controller
				control={control}
				name='price'
				render={({ field, fieldState }) => (
					<Box className='grid h-fit'>
						<Box className='grid gap-2 h-fit'>
							<InputLabel
								required
								sx={{
									color: colors.primary,
									'& .MuiInputLabel-asterisk': {
										color: 'red',
									},
								}}>
								Harga
							</InputLabel>
							<TextField
								{...field}
								type='number'
								error={Boolean(fieldState.error)}
								placeholder='contoh : 10XXX'
								sx={{
									width: '100%',
									border: `1px solid ${colors.primary}`,
									borderRadius: '12px',
									input: {
										// color: colors.primary,
									},
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											border: 'none',
										},
									},
								}}
								inputProps={{
									maxLength: 100,
								}}
							/>
						</Box>
						{fieldState.error && (
							<Typography
								sx={{
									color: 'red',
									fontSize: '12px',
									marginTop: '5px',
									width: 'fit-content',
								}}>
								{fieldState.error?.message}
							</Typography>
						)}
					</Box>
				)}
			/>

			{/* QTY */}
			<Controller
				control={control}
				name='qty'
				render={({ field, fieldState }) => (
					<Box className='grid h-fit'>
						<Box className='grid gap-2 h-fit'>
							<InputLabel
								required
								sx={{
									color: colors.primary,
									'& .MuiInputLabel-asterisk': {
										color: 'red',
									},
								}}>
								Jumlah
							</InputLabel>
							<TextField
								{...field}
								type='number'
								error={Boolean(fieldState.error)}
								placeholder='contoh : 10XXX'
								sx={{
									width: '100%',
									border: `1px solid ${colors.primary}`,
									borderRadius: '12px',
									input: {
										// color: colors.primary,
									},
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											border: 'none',
										},
									},
								}}
								inputProps={{
									maxLength: 100,
									min: 1,
								}}
							/>
						</Box>
						{fieldState.error && (
							<Typography
								sx={{
									color: 'red',
									fontSize: '12px',
									marginTop: '5px',
									width: 'fit-content',
								}}>
								{fieldState.error?.message}
							</Typography>
						)}
					</Box>
				)}
			/>

			{/* DESC */}
			<Controller
				control={control}
				name='desc'
				render={({ field, fieldState }) => (
					<Box className='lg:col-span-2 md:col-span-2 grid h-fit'>
						<Box className='grid gap-2 h-fit'>
							<InputLabel
								sx={{
									color: colors.primary,
									'& .MuiInputLabel-asterisk': {
										color: 'red',
									},
								}}>
								Deskripsi
							</InputLabel>
							<TextField
								{...field}
								multiline
								rows={3}
								type='text'
								error={Boolean(fieldState.error)}
								sx={{
									width: '100%',
									border: `1px solid ${colors.primary}`,
									borderRadius: '12px',
									input: {
										// color: colors.primary,
									},
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											border: 'none',
										},
									},
								}}
								inputProps={{
									maxLength: 100,
								}}
							/>
						</Box>
						{fieldState.error && (
							<Typography
								sx={{
									color: 'red',
									fontSize: '12px',
									marginTop: '5px',
									width: 'fit-content',
								}}>
								{fieldState.error?.message}
							</Typography>
						)}
					</Box>
				)}
			/>
			{/* IMAGES */}
			<Box className='lg:col-span-2 md:col-span-2 grid gap-2'>
				<Box className='grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2'>
					{imagePreview && imagePreview.length > 0 ? (
						imagePreview.map((item, index) => (
							<Box
								key={index}
								className='bg-white rounded-md shadow-xl relative h-fit overflow-hidden'>
								<Button
									onClick={() => handleDeleteSelectedImage(index)}
									className='absolute right-0 top-0 bg-white hover:bg-white m-1 shadow-lg'
									sx={{
										width: '2rem',
										height: '2rem',
										minWidth: '2rem',
										padding: 0,
										borderRadius: '10px',
									}}>
									<CloseIcon className='text-red-600' />
								</Button>
								<Image
									width={500}
									height={500}
									className='object-cover object-center w-full h-full '
									alt={item.url || 'uploaded-image'}
									src={item.url || defaultJpg}
								/>
							</Box>
						))
					) : (
						<Box className='lg:col-span-4 md:col-span-4 col-span-2 bg-white rounded-md shadow-xl relative overflow-hidden flex justify-center items-center p-2 w-full'>
							<Typography className='text-center text-slate-300'>Tidak Ada Gambar</Typography>
						</Box>
					)}
				</Box>
				<Button
					component='label'
					role={undefined}
					variant='contained'
					tabIndex={-1}
					startIcon={'+'}>
					Upload files
					<VisuallyHiddenInput
						type='file'
						onChange={e => handleAddImage(e.target.files)}
						multiple
					/>
				</Button>
			</Box>
			<Box className='lg:col-span-2'>
				<hr className='m-4' />
				<Button
					onClick={handleSubmit(handleSubmitForm)}
					role={undefined}
					variant='contained'
					className='w-full'
					tabIndex={-1}>
					Simpan
				</Button>
			</Box>
		</Box>
	);
};

export default Form;
