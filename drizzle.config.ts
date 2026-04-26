import 'dotenv/config';
import {env} from "@/shared/config";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/shared/db/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
});
