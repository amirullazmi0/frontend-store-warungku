'use client'

import { Box } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
    const navigation = useRouter()
    useEffect(() => {
        navigation.push('/store')
    })
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100vh'}
            width={'100vw'}
        >
            <CircularProgress />
        </Box>
    )
}