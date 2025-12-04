import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "mongodb+srv://tanmayagrawal278_db_user:sr2Ct9HAbw8I56S9@pharmacy-order.vpkk2qb.mongodb.net/pharmacy-app?retryWrites=true&w=majority",
  },
});
