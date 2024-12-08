export interface CartItem {
  id: string;
  cartId: string;
  itemStoreId: string;
  qty: number;
  itemStore: {
    id: string;
    name: string;
    price: number;
    desc: string;
    itemStoreImages: {
      path: string;
    }[];
  };
}
