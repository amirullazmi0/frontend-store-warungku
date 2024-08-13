import { PasswordUpdateDTO, UpdateAddressDTO, UpdateLogoDTO, UserProfileUpdateDTO } from "@/DTO/user.dto";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie'

const API_URL = process.env.API_URL

export const GetDataProfileFunction = async () => {
    const accessToken = Cookies.get('access-token')
    try {
        const response = await axios.get(`${API_URL}/api/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {

    }
}

export const UpdateDataProfileFunction = async (param: UserProfileUpdateDTO) => {
    const accessToken = Cookies.get('access-token')
    try {
        const response = await axios.post(`${API_URL}/api/user`, param, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {

    }
}

export const UpdatePasswordFunction = async (param: PasswordUpdateDTO) => {
    const accessToken = Cookies.get('access-token')
    try {
        const response = await axios.post(`${API_URL}/api/user/password`, param, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {

    }
}

export const UpdateLogoFunction = async (param: UpdateLogoDTO) => {
    const accessToken = Cookies.get('access-token')
    try {
        const response = await axios.post(`${API_URL}/api/user/logo`, param, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {

    }
}

export const UpdateAddressFunction = async (param: UpdateAddressDTO) => {
    const accessToken = Cookies.get('access-token')
    try {
        const response = await axios.post(`${API_URL}/api/user/address`, param, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {

    }
}