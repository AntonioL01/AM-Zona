import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { CarImages } from '../../configs/schema';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default async (req, res) => {
  try {
    const { imageUrl, carListingId } = JSON.parse(req.body);
    const result = await db.insert(CarImages).values({
      imageUrl,
      carListingId
    }).returning();

    return res.status(200).json(result[0]);
  } catch (err) {
    console.error('Error saving car image:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
