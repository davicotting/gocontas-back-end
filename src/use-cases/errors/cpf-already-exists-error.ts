
export class CpfAlreadyExistsError extends Error {
    constructor(){
        super('Este CPF já está em uso.')
    }
}