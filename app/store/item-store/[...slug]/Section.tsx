'use client';
import { itemStore } from '@/DTO/itemStore.dto';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import defaultJpg from '@/public/image/defaultJpg.png';
import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import colors from '@/app/ComponentGlobals/colors';
const Section: React.FC<{ itemId: string }> = ({ itemId }) => {
	const [item, setItem] = useState<itemStore>();
	const apiUrl = process.env.API_URL;
	const accessToken = Cookies.get(`access-token`);

	const getItem = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/item-store?id=${itemId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.data) {
				console.log('Data received:', response.data);
				setItem(response.data.data);
			}
		} catch (error) {}
	};

	useEffect(() => {
		getItem();
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}>
			<Box
				className='shadow-md lg:w-[60%] flex flex-col items-center p-10 gap-5'
				sx={{
					padding: 2,
					borderRadius: 3,
				}}>
				<Box className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-3">
					{item?.itemStoreImages.map((image, index) => {
						return (
							<Box
								key={index}
								className='shadow-md p-2 rounded'>
								<Image
									alt=''
									width={200}
									height={200}
									src={image.path || defaultJpg}
								/>
							</Box>
						);
					})}
				</Box>

				<Box className='grid lg:md:grid-cols-4 w-full gap-4'>
					<>
						<div className=''>Nama Barang : </div>
						<div className='lg:md:col-span-3 text-lg font-bold'>{item?.name}</div>
					</>
					<>
						<div className=''>Harga : </div>
						<div className='lg:md:col-span-3'>Rp. {item?.price}</div>
					</>
					<>
						<div className=''>Deskripsi : </div>
						<div className='lg:md:col-span-3'>{item?.desc}</div>
					</>
				</Box>

				<IconButton
					sx={{
						backgroundColor: colors.warning,
						':hover': {
							backgroundColor: colors.warning,
						},
					}}>
					<EditIcon />
				</IconButton>
				{/* <IconButton
					onClick={() => handleAlertDelete(i.id)}
					sx={{
						backgroundColor: colors.error,
						color: 'white',
						':hover': {
							backgroundColor: colors.error,
						},
					}}>
					<DeleteIcon />
				</IconButton> */}
			</Box>
		</Box>
	);
};

export default Section;
