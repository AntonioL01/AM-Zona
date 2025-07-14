import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { CarListing, CarImages } from '../../configs/schema';
import { and, eq, lte } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default async (req, res) => {
  try {
    const { condition, make, price } = JSON.parse(req.body);
    const conditions = [];

    if (condition) {
      conditions.push(eq(CarListing.condition, condition));
    }

    if (make) {
      conditions.push(eq(CarListing.make, make));
    }

    if (price) {
      conditions.push(lte(CarListing.price, price));
    }

    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(conditions.length ? and(...conditions) : undefined);

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error searching listings:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
