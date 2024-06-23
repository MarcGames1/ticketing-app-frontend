export interface Iauth {
    _idToken:string,
    _refreshToken:string,
    _accessToken:string
}

export interface RegisterData  {
    email:string,
    firstName :string,
    lastName :string,
    departmentId :string,
    password :string,
}