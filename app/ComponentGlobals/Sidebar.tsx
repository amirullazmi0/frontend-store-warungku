'use client';
import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useRouter } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Sidebar = () => {
	const navigation = useRouter();

	const handleNavigation = (e: string) => {
		navigation.push(e);
	};

	return (
		<>
			<List>
				<ListItem>
					<ListItemButton onClick={() => handleNavigation('/store')}>
						<ListItemIcon>
							<SpaceDashboardIcon />
						</ListItemIcon>
						<ListItemText primary='Dashboard' />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton onClick={() => handleNavigation('/store/transaction')}>
						<ListItemIcon>
							<ReceiptIcon />
						</ListItemIcon>
						<ListItemText primary='Transaksi' />
					</ListItemButton>
				</ListItem>
			</List>
		</>
	);
};

export default Sidebar;
