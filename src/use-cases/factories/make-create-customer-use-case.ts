import { PrismaCustomerRepository } from "@/repositories/prisma/prisma-customer-repository";
import { CreateCustomerUseCase } from "../create-customer-use-case";

export async function MakeCreateCustomerUseCase() {
    const customerRepository = new PrismaCustomerRepository()
    const createCustomerUseCase  = new CreateCustomerUseCase(customerRepository)

    return createCustomerUseCase;
}