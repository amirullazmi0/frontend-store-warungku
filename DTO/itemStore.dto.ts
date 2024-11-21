export interface ItemStoreImage {
    id: string;
    path: string;
    itemstoreId: string;
}

export interface itemStore {
    id: string;
    name: string;
    qty: number;
    price: number;
    desc: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    itemStoreImages: ItemStoreImage[];
}
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