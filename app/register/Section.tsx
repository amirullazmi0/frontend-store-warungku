'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterDTO } from '@/DTO/auth.dto';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AlertFailed, AlertSuccess } from '../ComponentGlobals/alert';
import axios from 'axios';

const Section = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loginSuccess, setLoginSuccess] = useState<boolean | undefined>(undefined);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const navigation = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors },
	} = useForm<RegisterDTO>();
	const password = watch('password', '');
	const onSubmit: SubmitHandler<RegisterDTO> = async data => {
		try {
			const API_URL = process.env.API_URL;
			const accessToken = Cookies.get('access-token');
			const response = await axios.post(`${API_URL}/auth/login`, data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const register = response.data;

			if (register.success === true) {
				setLoginSuccess(true);
				setTimeout(() => {
					setLoginSuccess(undefined);
					navigation.push('/login');
				}, 5000);
			} else {
				reset();
				setErrorMessage(register.error.message);
				setLoginSuccess(false);
				setTimeout(() => {
					setLoginSuccess(undefined);
					setErrorMessage('');
				}, 5000);
			}
		} catch (error) {}
	};
	const handleClickShowPassword = () => setShowPassword(show => !show);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	return (
		<div className='lg:md:w-[70%] rounded-2xl bg-white shadow-lg flex overflow-hidden'>
			{loginSuccess === true ? (
				<AlertSuccess
					open={loginSuccess}
					message='Register berhasil'
				/>
			) : (
				loginSuccess === false && <AlertFailed message={errorMessage} />
			)}
			<div className='lg:md:w-[70%] w-[90%] p-10 ease-in-out duration-200 delay-200'>
				<div className='text-xl font-bold'>Hi Store</div>
				<div className='text-4xl font-extrabold uppercase mt-4'>Register</div>
				<form action=''>
					<div className='mt-10 grid gap-4'>
						{/* EMAIL */}
						<div className=''>
							<TextField
								{...register(`email`, {
									required: 'Email harus di isi',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
										message: 'Invalid email address',
									},
								})}
								id='outlined-basic'
								label='Email'
								className='w-full'
								variant='outlined'
							/>
							{errors.email && <div className='mt-2 text-end text-red-600 text-xs w-fit'>{errors.email.message}</div>}
						</div>

						{/* NAMA LENGKAP */}
						<div className=''>
							<TextField
								{...register('name', {
									required: 'Nama lengkap harus di isi',
									pattern: {
										value: /^[A-Za-z\s]+$/,
										message: 'Nama harus huruf',
									},
								})}
								id='outlined-basic'
								label='Nama Lengkap'
								className='w-full'
								variant='outlined'
							/>
							{errors.name && <div className='mt-2 text-end text-red-600 text-xs w-fit'>{errors.name.message}</div>}
						</div>

						<div className='lg:md:flex grid gap-4 w-full '>
							{/* PASSWORD */}
							<div className='w-full'>
								<FormControl
									className='w-full'
									variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
									<OutlinedInput
										id='outlined-adornment-password'
										type={showPassword ? 'text' : 'password'}
										{...register(`password`, {
											required: 'Password harus di isi',
										})}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge='end'>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label='Password'
									/>
								</FormControl>
								{errors.password && <div className='mt-2 text-end text-red-600 text-xs w-fit'>{errors.password.message}</div>}
							</div>

							{/* KONFIRMASI PASSWORD */}
							<div className='w-full'>
								<FormControl
									className='w-full'
									variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-password'>Konfirmasi Password</InputLabel>
									<OutlinedInput
										id='outlined-adornment-password'
										type={showConfirmPassword ? 'text' : 'password'}
										{...register('confirmPassword', {
											required: 'Konfirmasi password harus di isi',
											validate: value => value === password || 'Konfirmasi password tidak sama',
										})}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onClick={handleClickShowConfirmPassword}
													onMouseDown={handleMouseDownConfirmPassword}
													edge='end'>
													{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label='Konfirmasi Password'
									/>
								</FormControl>
								{errors.confirmPassword && <div className='mt-2 text-end text-red-600 text-xs w-fit'>{errors.confirmPassword.message}</div>}
							</div>
						</div>

						<Button
							type='submit'
							onClick={handleSubmit(onSubmit)}
							variant='contained'
							disableElevation>
							Login
						</Button>
						<hr className='mt-4 mb-4' />
						<div className='text-center text-xs'>
							<span>
								Sudah Punya Akun ?{' '}
								<Link
									href={'/login'}
									className='p-1 btn button-warning btn-sm'>
									Login
								</Link>
							</span>
						</div>
					</div>
				</form>
			</div>
			<div className='lg:md:w-[30%] w-[10%] bgr-primary'></div>
		</div>
	);
};

export default Section;
