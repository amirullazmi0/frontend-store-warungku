'use server'
import { loginDTO, RegisterDTO } from "@/DTO/auth.dto";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
const API_URL = process.env.API_URL

export const CheckAuthFunction = async () => {
    try {
        const cookieStore = cookies()
        const accessToken = cookieStore.get('access-token')?.value

        const response = await axios.post(`${API_URL}/auth/check-auth`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (response.data.success === true) {
            return true
        }
    } catch (error: any) {
        return false
    }
}

export const LoginFunction = async (param: loginDTO) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, param)
        return response.data
    } catch (error) {

    }
}

export const RegisterFunction = async (param: RegisterDTO) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, param)
        return response.data
    } catch (error) {

    }
}



