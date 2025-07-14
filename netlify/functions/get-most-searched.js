import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { CarListing, CarImages } from '../../configs/schema';
import { desc, eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default async (req, res) => {
  try {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(10);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching most searched cars:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
