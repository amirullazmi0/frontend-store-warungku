import * as yup from "yup";

export const formItemStoreSchema = yup.object().shape({
    name: yup.string().required("Nama wajib di isi"),
    price: yup
        .number()
        .typeError("Harga wajib di isi")
        .required("Harga wajib di isi"),
    qty: yup
        .number()
        .typeError("Jumlah wajib di isi")
        .min(0, 'Jumlah harus lebih dari 0')
        .required("Jumlah wajib di isi"),
    desc: yup.string(),
    images: yup
        .array()
        .required("Gambar wajib di isi")
        .min(1, "Minimal satu gambar diperlukan"),
});
