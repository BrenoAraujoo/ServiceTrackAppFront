export interface ApiResponse<T> {

    data: T ,
    isSuccess: boolean,
    error: {
        code: number,
        message: string,
        erros: string[]
    }
}