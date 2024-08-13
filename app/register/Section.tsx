'use client'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterDTO } from '@/DTO/auth.dto';
import { RegisterFunction } from '@/function/auth';

const Section = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, watch, reset, setValue, formState: { errors }, } = useForm<RegisterDTO>()
    const password = watch('password', '');
    const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
        try {
            const register = await RegisterFunction(data)

            if (register.success === true) {
                reset()
            }else{
                
            }
        } catch (error) {

        }
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div className='lg:md:w-[50%] rounded-2xl bg-white shadow-lg flex overflow-hidden'>
            <div className="lg:md:w-[50%] w-[90%] p-10 ease-in-out duration-200 delay-200">
                <div className="text-xl font-bold">Hi Store</div>
                <div className="text-4xl font-extrabold uppercase mt-4">Register</div>
                <form action="">
                    <div className="mt-10 grid gap-4">
                        {/* EMAIL */}
                        <TextField
                            {...register(`email`, {
                                required: 'Email harus di isi',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            id="outlined-basic"
                            label="Email"
                            className='w-full'
                            variant="outlined" />
                        {errors.email &&
                            <div className="mt-2 text-end text-red-600 text-xs w-fit">
                                {errors.email.message}
                            </div>
                        }

                        {/* NAMA LENGKAP */}
                        <TextField
                            {...register('name', {
                                required: 'Nama lengkap harus di isi',
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: 'Nama harus huruf',
                                },
                            })}
                            id="outlined-basic"
                            label="Nama Lengkap"
                            className='w-full'
                            variant="outlined" />
                        {errors.name &&
                            <div className="mt-2 text-end text-red-600 text-xs w-fit">
                                {errors.name.message}
                            </div>
                        }

                        {/* PASSWORD */}
                        <FormControl sx={{ width: '25ch' }} className='w-full' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                {...register(`password`, { required: 'Password harus di isi' })}
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
                        {errors.password &&
                            <div className="mt-2 text-end text-red-600 text-xs w-fit">
                                {errors.password.message}
                            </div>
                        }

                        {/* KONFIRMASI PASSWORD */}
                        <FormControl sx={{ width: '25ch' }} className='w-full' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Konfirmasi Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: 'Konfirmasi password harus di isi',
                                    validate: (value) =>
                                        value === password || 'Konfirmasi password tidak sama',
                                })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Konfirmasi Password"
                            />
                        </FormControl>
                        {errors.confirmPassword &&
                            <div className="mt-2 text-end text-red-600 text-xs w-fit">
                                {errors.confirmPassword.message}
                            </div>
                        }

                        <Button type='submit' onClick={handleSubmit(onSubmit)} variant="contained" disableElevation>
                            Login
                        </Button>
                        <hr className='mt-4 mb-4' />
                        <div className="text-center text-xs"><span>Sudah Punya Akun ? <Link href={'/login'} className='p-1 btn button-warning btn-sm'>Login</Link></span></div>
                    </div>
                </form>
            </div>
            <div className="lg:md:w-[50%] w-[10%] bgr-primary"></div>
        </div>
    )
}

export default Section
