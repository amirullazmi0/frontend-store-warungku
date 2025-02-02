'use client';
import { itemStore } from '@/DTO/itemStore.dto';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import defaultJpg from '@/public/image/defaultJpg.png';
import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import colors from '@/app/ComponentGlobals/colors';
import { useRouter } from 'next/navigation';
const Section: React.FC<{ itemId: string }> = ({ itemId }) => {
	const [item, setItem] = useState<itemStore>();
	const apiUrl = process.env.API_URL;
	const navigation = useRouter();
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

	const [activeIndex, setActiveIndex] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null); // ✅ Explicitly set the type

	useEffect(() => {
		const handleScroll = () => {
			if (!carouselRef.current) return;

			const slides = carouselRef.current.children;
			let currentIndex = 0;
			let minOffset = Infinity;

			for (let i = 0; i < slides.length; i++) {
				const rect = slides[i].getBoundingClientRect();
				const offset = Math.abs(rect.left - carouselRef.current.getBoundingClientRect().left);

				if (offset < minOffset) {
					minOffset = offset;
					currentIndex = i;
				}
			}

			setActiveIndex(currentIndex);
		};

		const carouselElement = carouselRef.current;
		if (carouselElement) {
			carouselElement.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (carouselElement) {
				carouselElement.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}>
			<Box
				className='shadow-md lg:w-[60%] flex flex-col items-center p-10 gap-5'
				sx={{
					padding: 2,
					borderRadius: 3,
				}}>
				<Box className='relative'>
					{/* Carousel */}
					<div
						ref={carouselRef}
						className='carousel w-full aspect-video'>
						{item?.itemStoreImages.map((image, index) => (
							<div
								key={index}
								id={`item${index}`}
								className='carousel-item w-full rounded-xl overflow-hidden flex justify-center'>
								<img
									src={image.path ?? ''}
									className='h-full object-cover'
									alt={`Image ${index}`}
								/>
							</div>
						))}
					</div>

					{/* Thumbnail Navigation with Black Transparent Background */}
					<div className='w-full flex rounded-md mt-2'>
						{item?.itemStoreImages.map((image, index) => (
							<a
								key={index}
								href={`#item${index}`}
								className={`w-[10%] p-1 rounded-md ${activeIndex === index ? 'border-2 border-white opacity-100' : 'opacity-50'}`}
								onClick={() => setActiveIndex(index)}>
								<img
									alt=''
									src={image.path || defaultJpg.src}
									className='object-cover rounded-md w-full'
								/>
							</a>
						))}
					</div>
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
					onClick={() => navigation.push(`/store/edit-item/${itemId}`)}
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
