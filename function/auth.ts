import { loginDTO, RegisterDTO } from "@/DTO/auth.dto";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie'
const API_URL = process.env.API_URL

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



