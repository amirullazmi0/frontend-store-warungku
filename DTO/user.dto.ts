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

export class addressDTO {
    id?: string
    active?: boolean
    jalan?: string
    rt?: string
    rw?: string
    kodepos?: string
    kelurahan?: string
    kecamatan?: string
    kota?: string
    provinsi?: string
    createdAt?: string
    updatedAt?: string
}

export class userDTO {
    id?: string
    name?: string
    email?: string
    rolesName?: string
    images?: string
    addressId?: string
    address?: addressDTO
    accessToken?: string
    lastActive?: Date
    updatedAt?: Date
    createdAt?: Date
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