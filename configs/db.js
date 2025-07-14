// configs/db.js

// Helper za dohvat liste oglasa
export async function fetchListings() {
  const res = await fetch("/.netlify/functions/get-listings");
  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }
  return res.json();
}
