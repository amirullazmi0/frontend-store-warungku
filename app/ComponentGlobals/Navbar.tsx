'use client';
import Link from 'next/link';
import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { StoreContext } from './LayoutStore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
	const storeContext = useContext(StoreContext);
	const navigation = useRouter();

	const handleSidebar = () => {
		storeContext.setActiveSidebar(!storeContext.activeSidebar);
	};

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		Cookies.remove('access-token');
		navigation.refresh();
	};

	const handleWishlist = () => {
		navigation.push('/wishlist');
	};

	const handleCart = () => {
		navigation.push('/cart');
	};

	return (
		<div className='bg-white p-4 flex justify-between items-center shadow sticky top-0 text-primary z-40 w-full'>
			<div className='flex gap-4 items-center'>
				<IconButton
					onClick={() => handleSidebar()}
					className='p-2'>
					{storeContext.activeSidebar ? <MenuOpenIcon /> : <MenuIcon />}
				</IconButton>
				<div className='text-2xl uppercase font-bold txt-primary'>
					<ShoppingBagIcon fontSize={'large'} />
				</div>
				<IconButton
					onClick={handleWishlist}
					className='p-2'>
					<FavoriteIcon
						fontSize={'large'}
						sx={{ color: 'red' }}
					/>
				</IconButton>
				<IconButton
					onClick={handleCart}
					className='p-2'>
					<ShoppingCartIcon
						fontSize={'large'}
						sx={{ color: 'green' }}
					/>
				</IconButton>
			</div>
			<div className='flex gap-4'>
				<IconButton
					id='basic-button'
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}>
					<Avatar
						alt='Remy Sharp'
						src='/image/avatar/1.jpg'
					/>
				</IconButton>
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.08))',
						},
					}}>
					<MenuItem onClick={() => navigation.push('/store/account')}>My account</MenuItem>
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				</Menu>
			</div>
		</div>
	);
};

export default Navbar;
