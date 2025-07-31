import { Customer, Prisma } from "generated/prisma";
import { CustomerRepository } from "../customer-repository";
import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [];

  async create({
    cpf,
    email,
    name,
    phone,
    rating,
    created_at,
    id,
    updated_at,
    password_hash
  }: Prisma.CustomerCreateInput) {
    const customer: Customer = {
      cpf,
      created_at: created_at ? new Date(created_at) : new Date(),
      email,
      id: id ?? randomUUID(),
      name,
      phone,
      rating: rating ?? 0,
      updated_at: updated_at ? new Date(updated_at) : null,
      password_hash: await hash(password_hash, 6)
    };

    this.customers.push(customer);

    return customer;
  }

  async searchByCpf(cpf: string) {
    const customer = this.customers.find((customer) => customer.cpf == cpf);

    if (!customer) {
      return null;
    }

    return customer;
  }

  async searchByEmail(email: string) {
    const customer = this.customers.find((customer) => customer.email == email);

    if (!customer) {
      return null;
    }

    return customer;
  }

  async searchByName(name: string) {
    const customer = this.customers.find((customer) => customer.name == name);

    if (!customer) {
      return null;
    }

    return customer;
  }
}
