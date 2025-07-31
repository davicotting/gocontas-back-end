import { FastifyInstance } from "fastify";
import { createCustomer } from "./create-customer";

export async function CustomerRoutes(app: FastifyInstance){
    app.post('/customer/create', createCustomer);
}