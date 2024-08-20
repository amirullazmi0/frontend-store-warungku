import React from 'react'
import Tron from '../ComponentGlobals/Tron'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const Section = () => {
    const navigation = useRouter()

    const handleNavigation = (e: string) => {
        navigation.push(e)
    }
    return (
        <section>
            <Button onClick={() => handleNavigation('/store/add-item')} variant='contained' disableElevation>+ item</Button>
        </section>
    )
}

export default Section
