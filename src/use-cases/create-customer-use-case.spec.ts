import { describe, expect, it, beforeEach } from "vitest";
import { CreateCustomerUseCase } from "./create-customer-use-case";
import { InMemoryCustomerRepository } from "@/repositories/in-memory/in-memory-customer-repostitory";
import { randomUUID } from "crypto";

let inMemoryCustomerRepository: InMemoryCustomerRepository;
let sut: CreateCustomerUseCase;

describe("create customer use-case", () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    sut = new CreateCustomerUseCase(inMemoryCustomerRepository);
  });
  it("should be able to create an user", async () => {
    const { customer } = await sut.execute({
      cpf: "00000000000",
      created_at: new Date(),
      email: "johndoe@example.com",
      id: randomUUID(),
      name: "John Doe",
      phone: "0000000000",
      password_hash: 'password123'
    });

    console.log(customer)

    expect(customer.id).toEqual(expect.any(String));
  });
});
