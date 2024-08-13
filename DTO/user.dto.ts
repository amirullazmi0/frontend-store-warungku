export interface UserProfileUpdateDTO {
    name?: string
    email?: string
    bio?: string
}

export interface PasswordUpdateDTO {
    password: string
    newPassword: string
}

export interface UpdateLogoDTO {
    logo: File
}

export interface UpdateAddressDTO {
    jalan?: string
    rt?: string
    rw?: string
    kodepos?: string
    kelurahan?: string
    kecamatan?: string
    kota?: string
    provinsi?: string
}