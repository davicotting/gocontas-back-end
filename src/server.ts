import { app } from "@/app";
import { env } from "./env/env";
import { CustomerRoutes } from "./http/controllers/customer/routes";

app.listen(
  {
    port: env.PORT,
    host: '0.0.0.0'
  },
  () => {
    console.log(`🎉 | - Server is running on port ${env.PORT}`);
  }
);

app.register(CustomerRoutes);
