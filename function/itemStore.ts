import { DeleteItemStoreDTO, PostItemStoreDTO } from "@/DTO/itemStore.dto";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie'
import { headers } from "next/headers";

const API_URL = process.env.API_URL

export const GetItemStoreFunction = async (id?: string) => {
    try {
        const accessToken = Cookies.get('access-token')
        const response = await axios.get(`${API_URL}/api/item-store?id=${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {

    }
}

export const PostItemStoreFunction = async (param: PostItemStoreDTO) => {
    try {
        const accessToken = Cookies.get('access-token')
        const response = await axios.post(`${API_URL}/api/item-store`, param, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {

    }
}

export const DeleteItemStoreFunction = async (param: DeleteItemStoreDTO) => {
    try {
        const accessToken = Cookies.get('access-token')
        const response = await axios.delete(`${API_URL}/api/item-store`, {
            data: param,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data
    } catch (error) {

    }
}