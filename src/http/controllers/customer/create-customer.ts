import { CpfAlreadyExistsError } from "@/use-cases/errors/cpf-already-exists-error";
import { EmailAlreadyExistsError } from "@/use-cases/errors/email-already-exists-error";
import { NameAlreadyExistsError } from "@/use-cases/errors/name-already-exists-error";
import { MakeCreateCustomerUseCase } from "@/use-cases/factories/make-create-customer-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as zod from "zod";
export async function createCustomer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const customerBodySchema = zod.object({
    cpf: zod.string().min(11).max(11),
    name: zod.string().min(3, "O seu nome deve ter no mínimo 3 caracteres"),
    phone: zod.string().min(11).max(11),
    email: zod.string().email(),
    password_hash: zod
      .string()
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
  }).strict();

  const { cpf, email, name, phone, password_hash } = customerBodySchema.parse(
    request.body
  );

  try {
    const sut = await MakeCreateCustomerUseCase();
    await sut.execute({
      cpf,
      email,
      name,
      phone,
      password_hash,
    });

    return reply
      .code(201)
      .send({ message: "Vendedor cadastrado com sucesso!" });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof CpfAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof NameAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
  }
}
