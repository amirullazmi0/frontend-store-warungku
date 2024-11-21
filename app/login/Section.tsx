'use client'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { LoginFunction } from '@/function/auth';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form"
import { AlertFailed, AlertSuccess } from '../ComponentGlobals/alert';
import { loginDTO } from '@/DTO/auth.dto';

const Section = () => {
    const [loginSuccess, setLoginSuccess] = useState<boolean | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const { register, handleSubmit, watch, reset, setValue, formState: { errors }, } = useForm<loginDTO>()

    const onSubmit: SubmitHandler<loginDTO> = async (data) => {
        const login = await LoginFunction({
            email: data.email,
            password: data.password
        })

        if (login.success === true) {
            reset()
            setLoginSuccess(true)
            setTimeout(() => {
                navigation.push('/')
            }, 5000)
        } else {
            reset()
            setErrorMessage(login?.error?.message)
            setLoginSuccess(false)
            setTimeout(() => {
                setLoginSuccess(undefined)
                setErrorMessage('')
            }, 5000)
        }
    }

    const navigation = useRouter()

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className='lg:md:w-[50%] rounded-2xl bg-white shadow-lg flex overflow-hidden'>
            {loginSuccess === true ? (
                <AlertSuccess message="Login berhasil" />
            ) : (
                loginSuccess === false && <AlertFailed message={errorMessage} />
            )}
            <div className="lg:md:w-[50%] p-10">
                <div className="text-xl font-bold">Hi Store</div>
                <div className="text-4xl font-extrabold uppercase mt-4">Login </div>
                <form action="">
                    <div className="mt-10 grid gap-4">
                        {/* EMAIL */}
                        <div className="">
                            <TextField {...register('email', { required: 'Email harus di isi' })} id="outlined-basic" label="Email" className='w-full' variant="outlined" />
                            {errors.email &&
                                <div className="mt-2 text-end text-red-600 text-xs w-fit">
                                    {errors.email.message}
                                </div>
                            }
                        </div>

                        {/* PASSWORD */}
                        <div className="">

                            <FormControl sx={{ width: '25ch' }} className='w-full' variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: 'Password harus di isi' })}
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
                        </div>

                        <Button type='submit' onClick={handleSubmit(onSubmit)} variant="contained" disableElevation>
                            Login
                        </Button>
                    </div>
                </form>
                <hr className='mt-4 mb-4' />
                <div className="text-center text-xs"><span>Belum Punya Akun ? <Link href={'/register'} className='p-1 btn button-warning btn-sm'>Register</Link></span></div>
            </div>
            <div className="w-[50%] bgr-primary lg:md:block hidden"></div>
        </div>
    )
}

export default Section
