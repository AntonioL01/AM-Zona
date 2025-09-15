import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from './configs/schema.js';

const db = drizzle(neon(process.env.DATABASE_URL), { schema });

export async function handler(event) {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Body is required.' })
      };
    }

    const { action, imageUrl, carListingId, imageId } = JSON.parse(event.body);

    switch (action) {
      case 'add': {
        await db.insert(schema.CarImages).values({
          imageUrl,
          carListingId
        });
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'URL slike spremljen.' })
        };
      }
      case 'remove': {
        await db.delete(schema.CarImages).where(eq(schema.CarImages.id, imageId));
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Slika uklonjena.' })
        };
      }
      default: {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Nepoznata akcija.' })
        };
      }
    }
  } catch (error) {
    console.error("Greška u serverless funkciji za slike:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Greška servera.' })
    };
  }
}
