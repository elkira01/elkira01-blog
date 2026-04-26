import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import {env} from "@/shared/config";

export const db = drizzle(env.DATABASE_URL!);
