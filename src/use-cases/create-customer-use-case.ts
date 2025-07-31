import { CustomerRepository } from "@/repositories/customer-repository";
import { Customer } from "generated/prisma";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";
import { NameAlreadyExistsError } from "./errors/name-already-exists-error";
import { CpfAlreadyExistsError } from "./errors/cpf-already-exists-error";

interface CreateCustomerUseCaseRequest {
  name: string;
  cpf: string;
  phone: string;
  password_hash: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  email: string;
}

interface CreateCustomerUseCaseResponse {
  customer: Customer;
}

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    cpf,
    created_at,
    name,
    phone,
    email,
    password_hash
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const emailAlreadylExists = await this.customerRepository.searchByEmail(
      email
    );
    const nameAlreadyExists = await this.customerRepository.searchByName(name);
    const cpfAlreadyExists = await this.customerRepository.searchByCpf(cpf);

    if (emailAlreadylExists) {
      throw new EmailAlreadyExistsError();
    }

    if (nameAlreadyExists) {
      throw new NameAlreadyExistsError();
    }

    if (cpfAlreadyExists) {
      throw new CpfAlreadyExistsError();
    }

    const customer = await this.customerRepository.create({
      cpf,
      email,
      name,
      phone,
      created_at,
      password_hash
    });

    return {
      customer,
    };
  }
}
