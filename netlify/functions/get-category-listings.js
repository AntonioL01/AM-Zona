import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { CarListing, CarImages } from '../../configs/schema';
import { eq, desc } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default async (req, res) => {
  try {
    const { category } = JSON.parse(req.body);
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.category, category))
      .orderBy(desc(CarListing.id));

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching category listings:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
