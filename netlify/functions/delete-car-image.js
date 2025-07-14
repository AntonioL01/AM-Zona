import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { CarImages } from '../../configs/schema';
import { eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default async (req, res) => {
  try {
    const { imageId } = JSON.parse(req.body);
    await db.delete(CarImages).where(eq(CarImages.id, imageId));
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error deleting car image:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
