'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { StoreContext } from './LayoutStore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
const Navbar = () => {
    const storeContext = useContext(StoreContext)
    const navigation = useRouter()

    const handleSidebar = () => {
        storeContext.setActiveSidebar(!storeContext.activeSidebar);
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        Cookies.remove('access-token')
        navigation.refresh()
    }

    return (
        <div className='bg-white p-4 flex justify-between items-center shadow sticky top-0 text-primary'>
            <div className="flex gap-4 items-center">
                <IconButton onClick={() => handleSidebar()} className='p-2'>
                    {storeContext.activeSidebar ?
                        <ArrowBackIosIcon />
                        :
                        <ArrowForwardIosIcon />
                    }
                </IconButton>
                <div className="text-2xl uppercase font-bold txt-primary">
                    <ShoppingBagIcon fontSize={"large"} />
                </div>
            </div>
            <div className="flex gap-4">
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </IconButton>
                <Menu
                    id="basic-menu"
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
                        }
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        My account
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Navbar
