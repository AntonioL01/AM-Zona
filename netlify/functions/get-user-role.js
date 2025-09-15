import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from './configs/schema.js';

const db = drizzle(neon(process.env.DATABASE_URL), { schema });

export async function handler(event) {
    console.log("👉 DATABASE_URL:", process.env.DATABASE_URL);
    console.log("👉 userId from query:", event.queryStringParameters?.userId);
    
    try {
        const userId = event.queryStringParameters.userId;

        if (!userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'User ID is required.' })
            };
        }

        const result = await db.select().from(schema.users).where(eq(schema.users.id, userId));

        let role;
        if (result.length > 0) {
            role = result[0].role;
        } else {
            await db.insert(schema.users).values({ id: userId, role: 'user' });
            role = 'user';
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ role })
        };
    } catch (error) {
        console.error("Greška pri dohvatu uloge korisnika:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
}