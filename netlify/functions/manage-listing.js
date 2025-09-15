import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, desc, and, lte } from 'drizzle-orm';
import * as schema from './configs/schema.js';

const db = drizzle(neon(process.env.DATABASE_URL), { schema });

export async function handler(event) {
  try {
    const { httpMethod } = event;
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (err) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Nevažeći JSON u body-u.' })
        };
      }
    }

    switch (httpMethod) {
      case 'POST': {
        if (!Object.keys(body).length) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Tijelo zahtjeva je prazno.' })
          };
        }
        const result = await db
          .insert(schema.CarListing)
          .values(body)
          .returning({ id: schema.CarListing.id });

        return {
          statusCode: 200,
          body: JSON.stringify({ id: result[0].id, message: 'Oglas uspješno spremljen.' })
        };
      }

      case 'PUT': {
        const { id: listingId, ...updateData } = body;
        if (!listingId) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'ID je obavezan za ažuriranje.' })
          };
        }
        await db.update(schema.CarListing).set(updateData).where(eq(schema.CarListing.id, Number(listingId)));

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Oglas uspješno ažuriran.' })
        };
      }

      case 'GET': {
        const { id: listingId, userId, category, condition, make, price, limit, all } = event.queryStringParameters || {};

        if (all === 'true') {
          const result = await db
            .select()
            .from(schema.CarListing)
            .leftJoin(schema.CarImages, eq(schema.CarListing.id, schema.CarImages.carListingId))
            .orderBy(desc(schema.CarListing.id));

          return {
            statusCode: 200,
            body: JSON.stringify(result)
          };
        }

        if (listingId) {
          const result = await db
            .select()
            .from(schema.CarListing)
            .leftJoin(schema.CarImages, eq(schema.CarListing.id, schema.CarImages.carListingId))
            .where(eq(schema.CarListing.id, Number(listingId)));

          return {
            statusCode: 200,
            body: JSON.stringify(result[0] || {})
          };
        } 
        
        if (userId) {
          const result = await db
            .select()
            .from(schema.CarListing)
            .leftJoin(schema.CarImages, eq(schema.CarListing.id, schema.CarImages.carListingId))
            .where(eq(schema.CarListing.createdBy, userId))
            .orderBy(desc(schema.CarListing.id));

          return {
            statusCode: 200,
            body: JSON.stringify(result)
          };
        } 
        
        if (category || condition || make || price) {
          const whereConditions = [];
          if (category) whereConditions.push(eq(schema.CarListing.category, category));
          if (condition) whereConditions.push(eq(schema.CarListing.condition, condition));
          if (make) whereConditions.push(eq(schema.CarListing.make, make));
          if (price) {
            const parsedPrice = Number(price);
            if (!isNaN(parsedPrice)) {
              whereConditions.push(lte(schema.CarListing.price, parsedPrice));
            }
          }

          const result = await db
            .select()
            .from(schema.CarListing)
            .innerJoin(schema.CarImages, eq(schema.CarListing.id, schema.CarImages.carListingId))
            .where(whereConditions.length ? and(...whereConditions) : undefined);

          return {
            statusCode: 200,
            body: JSON.stringify(result)
          };
        } 
        
        if (limit) {
          const result = await db
            .select()
            .from(schema.CarListing)
            .leftJoin(schema.CarImages, eq(schema.CarListing.id, schema.CarImages.carListingId))
            .orderBy(desc(schema.CarListing.id))
            .limit(Number(limit));

          return {
            statusCode: 200,
            body: JSON.stringify(result)
          };
        }

        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Nevažeći parametri za pretragu.' })
        };
      }

      case 'DELETE': {
        const { listingId } = body;
        if (!listingId) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'ID oglasa je obavezan za brisanje.' })
          };
        }
        await db.delete(schema.CarImages).where(eq(schema.CarImages.carListingId, listingId));
        await db.delete(schema.CarListing).where(eq(schema.CarListing.id, listingId));

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Oglas uspješno obrisan.' })
        };
      }

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Metoda nije dopuštena.' })
        };
    }
  } catch (error) {
    console.error("❌ Greška u serverless funkciji:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Greška servera.' })
    };
  }
}