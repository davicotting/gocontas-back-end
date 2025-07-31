import { Prisma, Customer } from "generated/prisma";
import { CustomerRepository } from "../customer-repository";
import { prisma } from "@/lib/prisma/prisma";

export class PrismaCustomerRepository implements CustomerRepository {
  async create(data: Prisma.CustomerCreateInput) {
    const customer = await prisma.customer.create({
      data: {
        ...data,
      },
    });

    return customer;
  }

  async searchByCpf(cpf: string) {
    const user = await prisma.customer.findFirst({
      where: {
        cpf,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async searchByEmail(email: string) {
    const user = await prisma.customer.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

   async searchByName(name: string) {
    const user = await prisma.customer.findFirst({
      where: {
        name,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
