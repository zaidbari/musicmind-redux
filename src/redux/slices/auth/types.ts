export interface ICredentials {
	username: string
	password: string
}

export interface IUser {
	username?: string
	user_id?: number
	type?: number
}
export interface ITokens {
	access: string
	refresh: string
}

export interface IAuthState {
	user: IUser | null
	tokens: ITokens | null
}

export interface ILoginMutaionSuccess {
	data: ITokens
	status: number
}

export interface ILoginMutaionError {
	data: { details: string }
	status: number
}

export type TLoginMutaion = ILoginMutaionError | ILoginMutaionSuccess
