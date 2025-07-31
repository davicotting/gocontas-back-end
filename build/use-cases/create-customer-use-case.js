"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/create-customer-use-case.ts
var create_customer_use_case_exports = {};
__export(create_customer_use_case_exports, {
  CreateCustomerUseCase: () => CreateCustomerUseCase
});
module.exports = __toCommonJS(create_customer_use_case_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCustomerUseCase
});
