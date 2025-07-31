import { Customer, Prisma } from "generated/prisma"
export interface CustomerRepository {
    create(data: Prisma.CustomerCreateInput): Promise<Customer>
    
    searchByCpf(cpf: string): Promise<Customer | null>
    searchByEmail(email: string): Promise<Customer | null>
    searchByName(email: string): Promise<Customer | null>
}