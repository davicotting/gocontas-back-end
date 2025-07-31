import fastify from "fastify";
import { ZodError } from "zod";

export const app = fastify({
    logger: {
        enabled: true
    }
});

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .code(400)
      .send({ message: "Validation error", issue: error.format() });
  } else {
    // todo: fazer o log com ferramentas externas como um datadog...
  }
    console.error(error);
  return reply.code(500).send({ message: "Internal server error." });
});