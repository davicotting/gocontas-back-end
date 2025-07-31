
export class NameAlreadyExistsError extends Error {
    constructor(){
        super('Este nome já está em uso.')
    }
}