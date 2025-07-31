import 'dotenv/config';
import * as zod from "zod";

const envSchema = zod.object({
    PORT: zod.coerce.number().default(1616),
});

const _env = envSchema.safeParse(process.env);

if(!_env.success){
    console.error('Env validation error, please check your enviroment variables.', _env.error.format());
    throw new Error('Env validation error, please check your enviroment variables.');
}

export const env = _env.data;