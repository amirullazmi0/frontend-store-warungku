export interface PostItemStoreDTO {
    name: string
    price: string
    tota: string
    desc?: string
    images?: File[]
}

export interface DeleteItemStoreDTO {
    id: string
}