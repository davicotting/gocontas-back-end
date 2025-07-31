"use strict";

// src/use-cases/create-customer-use-case.spec.ts
var import_vitest = require("vitest");

// src/use-cases/errors/email-already-exists-error.ts
var EmailAlreadyExistsError = class extends Error {
  constructor() {
    super("Este e-mail j\xE1 est\xE1 em uso.");
  }
};

// src/use-cases/errors/name-already-exists-error.ts
var NameAlreadyExistsError = class extends Error {
  constructor() {
    super("Este nome j\xE1 est\xE1 em uso.");
  }
};

// src/use-cases/errors/cpf-already-exists-error.ts
var CpfAlreadyExistsError = class extends Error {
  constructor() {
    super("Este CPF j\xE1 est\xE1 em uso.");
  }
};

// src/use-cases/create-customer-use-case.ts
var CreateCustomerUseCase = class {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }
  async execute({
    cpf,
    created_at,
    name,
    phone,
    email,
    password_hash
  }) {
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
      customer
    };
  }
};

// src/repositories/in-memory/in-memory-customer-repostitory.ts
var import_node_crypto = require("crypto");
var import_bcryptjs = require("bcryptjs");
var InMemoryCustomerRepository = class {
  customers = [];
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
  }) {
    const customer = {
      cpf,
      created_at: created_at ? new Date(created_at) : /* @__PURE__ */ new Date(),
      email,
      id: id ?? (0, import_node_crypto.randomUUID)(),
      name,
      phone,
      rating: rating ?? 0,
      updated_at: updated_at ? new Date(updated_at) : null,
      password_hash: await (0, import_bcryptjs.hash)(password_hash, 6)
    };
    this.customers.push(customer);
    return customer;
  }
  async searchByCpf(cpf) {
    const customer = this.customers.find((customer2) => customer2.cpf == cpf);
    if (!customer) {
      return null;
    }
    return customer;
  }
  async searchByEmail(email) {
    const customer = this.customers.find((customer2) => customer2.email == email);
    if (!customer) {
      return null;
    }
    return customer;
  }
  async searchByName(name) {
    const customer = this.customers.find((customer2) => customer2.name == name);
    if (!customer) {
      return null;
    }
    return customer;
  }
};

// src/use-cases/create-customer-use-case.spec.ts
var import_crypto = require("crypto");
var inMemoryCustomerRepository;
var sut;
(0, import_vitest.describe)("create customer use-case", () => {
  (0, import_vitest.beforeEach)(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    sut = new CreateCustomerUseCase(inMemoryCustomerRepository);
  });
  (0, import_vitest.it)("should be able to create an user", async () => {
    const { customer } = await sut.execute({
      cpf: "00000000000",
      created_at: /* @__PURE__ */ new Date(),
      email: "johndoe@example.com",
      id: (0, import_crypto.randomUUID)(),
      name: "John Doe",
      phone: "0000000000",
      password_hash: "password123"
    });
    console.log(customer);
    (0, import_vitest.expect)(customer.id).toEqual(import_vitest.expect.any(String));
  });
});
