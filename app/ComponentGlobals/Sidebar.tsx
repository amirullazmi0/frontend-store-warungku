'use client';
import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { StoreContext } from './LayoutStore';
import { IconButton } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
	const storeContext = useContext(StoreContext);
	const navigation = useRouter();

	const handleNavigation = (e: string) => {
		navigation.push(e);
	};
	const handleSidebar = () => {
		storeContext.setActiveSidebar(!storeContext.activeSidebar);
	};

	return (
		<div
			className={`${
				storeContext.activeSidebar ? `lg:w-[20vw] md:w-[30vw] w-[70vw]` : `w-[0vw]`
			} min-h-screen h-full shadow-xl fixed top-0 bottom-0 left-0 z-50 bg-white duration-500 ease overflow-hidden`}>
			<div className='p-4 flex-col gap-4'>
				<div className='w-full flex justify-end'>
					<IconButton onClick={() => storeContext.setActiveSidebar(false)}>
						<CloseIcon />
					</IconButton>
				</div>
				<div className='grid gap-4 mt-4'>
					<button
						onClick={() => handleNavigation('/store')}
						className='p-2 hover:bg-slate-100 w-full rounded-sm active:scale-95 duration-200 flex justify-between'>
						Dashboard
						<SpaceDashboardIcon />
					</button>
					<button className='p-2 hover:bg-slate-100 w-full rounded-sm active:scale-95 duration-200 flex justify-between'>
						Transaksi
						<ReceiptIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
