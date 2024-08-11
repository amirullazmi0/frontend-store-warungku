'use client'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';

const Section = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div className='lg:md:w-[50%] rounded-2xl bg-white shadow-lg flex overflow-hidden'>
            <div className="lg:md:w-[50%] p-10">
                <div className="text-xl font-bold">Hi Store</div>
                <div className="text-4xl font-extrabold uppercase mt-4">Login </div>
                <div className="mt-10 grid gap-4">
                    <TextField id="outlined-basic" label="Email" className='w-full' variant="outlined" />
                    <FormControl sx={{ width: '25ch' }} className='w-full' variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <hr className='mt-4 mb-4' />
                    <div className="text-center text-xs"><span>Belum Punya Akun ? <Link href={'/register'} className='p-1 btn button-warning btn-sm'>Register</Link></span></div>
                </div>
            </div>
            <div className="w-[50%] bgr-primary lg:md:block hidden"></div>
        </div>
    )
}

export default Section