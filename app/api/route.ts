import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const collection = db.collection('movies');

    // Log the count of documents in the collection
    const count = await collection.countDocuments();
    console.log('Total genres in collection:', count);

    // Query the first 20 genres
    const genres = await collection.find({ poster_path: { $ne: null, $nin: [""] } })
    .sort({ vote_average: -1 })  // Sort by vote_average in descending order
    .limit(20)
    .toArray();

    console.log('Fetched genres:', genres); // Log the fetched genres

    if (!genres.length) {
      return NextResponse.json({ message: 'No genres found' }, { status: 404 });
    }

    return NextResponse.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    return NextResponse.json({ error: 'Failed to fetch genres' }, { status: 500 });
  }
}
