'use client';
import { itemStore } from '@/DTO/itemStore.dto';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import defaultJpg from '@/public/image/defaultJpg.png';
import Image from 'next/image';
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
				setItem(response.data.data);
			}
		} catch (error) {}
	};

	useEffect(() => {
		getItem();
	}, []);
	return (
		<div>
			<Image
				alt=''
				width={200}
				height={200}
				src={item?.itemStoreImages[0]?.path || defaultJpg}
			/>
			<div className=''>{item?.name}</div>
			<div className=''>{item?.price}</div>
		</div>
	);
};

export default Section;
