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

// src/repositories/in-memory/in-memory-customer-repostitory.ts
var in_memory_customer_repostitory_exports = {};
__export(in_memory_customer_repostitory_exports, {
  InMemoryCustomerRepository: () => InMemoryCustomerRepository
});
module.exports = __toCommonJS(in_memory_customer_repostitory_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryCustomerRepository
});
