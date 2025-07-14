const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('../../configs/schema');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    const db = drizzle(pool, { schema });

    const result = await db.insert(schema.CarListing).values({
      listingTitle: body.listingTitle || '',
      price: body.price || 0,
      category: body.category || '',
      condition: body.condition || '',
      make: body.make || '',
      model: body.model || '',
      year: body.year || 0,
      driveType: body.driveType || '',
      transmission: body.transmission || '',
      fuelType: body.fuelType || '',
      mileage: body.mileage || 0,
      engineSize: body.engineSize || '',
      power: body.power || 0,
      color: body.color || '',
      door: body.door || 0,
      vin: body.vin || '',
      offerType: body.offerType || '',
      listingDescription: body.listingDescription || '',
      county: body.county || '',
      city: body.city || '',
      phoneNumber: body.phoneNumber || '',
      features: body.features || {},
      createdBy: body.createdBy || '',
      userName: body.userName || '',
      userImageUrl: body.userImageUrl || '',
      postedOn: body.postedOn || '',
    }).returning({ id: schema.CarListing.id });

    const insertedId = result[0]?.id;

    await pool.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: insertedId })
    };
  } catch (err) {
    console.error('save-car-listing.js error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
