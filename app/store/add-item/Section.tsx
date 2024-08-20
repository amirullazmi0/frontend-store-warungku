import colors from '@/app/ComponentGlobals/colors'
import { Label } from '@mui/icons-material'
import { Box, InputLabel, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const Section = () => {
    return (
        <Box>
            <Typography
                sx={{
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    color: colors.primary
                }}>
                Tambah Barang Toko
            </Typography>
            <Stack
                sx={{
                    bgcolor: 'white',
                    padding: '20px',
                    borderRadius: '20px',
                    boxShadow: '0px 10px 25px -22px ',
                    width: {
                        lg: '60%',
                        md: '70%'
                    }
                }}
            >
                <div className="grid lg:md:grid-cols-2 gap-4">
                    <Stack>
                        <InputLabel
                            sx={{
                                color: colors.primary,
                                '& .MuiInputLabel-asterisk': {
                                    color: 'red',
                                },
                            }}
                            required
                        >
                            Nama Barang
                        </InputLabel>
                        <TextField name='name' />
                    </Stack>
                    <Stack>
                        <InputLabel
                            sx={{
                                color: colors.primary,
                                '& .MuiInputLabel-asterisk': {
                                    color: 'red',
                                },
                            }}
                            required
                        >
                            Harga
                        </InputLabel>
                        <TextField
                            name='name'
                            type='number'
                            inputProps={{ min: 0 }}
                            sx={{
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }}
                        />
                    </Stack>
                    <Stack>
                        <InputLabel
                            sx={{
                                color: colors.primary,
                                '& .MuiInputLabel-asterisk': {
                                    color: 'red',
                                },
                            }}
                            required
                        >
                            Jumlah
                        </InputLabel>
                        <TextField
                            name='name'
                            type='number'
                            inputProps={{ min: 0 }}
                            sx={{
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }}
                        />
                    </Stack>
                    <Stack className='lg:md:col-span-2'>
                        <InputLabel
                            sx={{
                                color: colors.primary,
                                '& .MuiInputLabel-asterisk': {
                                    color: 'red',
                                },
                            }}
                        >
                            Deskripsi
                        </InputLabel>
                        <TextField
                            name='name'
                            rows={4}
                            multiline
                        />
                    </Stack>

                </div>

            </Stack>
        </Box >
    )
}

export default Section
