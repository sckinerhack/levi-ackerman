import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import { RedirectLink } from '@/types/redirect';

// GET - Fetch all redirect links
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('redirects');
    
    const redirects = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(redirects);
  } catch (error) {
    console.error('Error fetching redirects:', error);
    return NextResponse.json({ error: 'Failed to fetch redirects' }, { status: 500 });
  }
}

// POST - Create a new redirect link
export async function POST(request: NextRequest) {
  try {
    const { destinationUrl } = await request.json();
    
    if (!destinationUrl) {
      return NextResponse.json({ error: 'Destination URL is required' }, { status: 400 });
    }
    
    // Generate a UUID for the redirect
    const uuid = uuidv4();
    
    const { db } = await connectToDatabase();
    const collection = db.collection('redirects');
    
    // Create the redirect document
    const redirect: RedirectLink = {
      uuid,
      destinationUrl,
      createdAt: new Date()
    };
    
    await collection.insertOne(redirect);
    
    return NextResponse.json(redirect, { status: 201 });
  } catch (error) {
    console.error('Error creating redirect:', error);
    return NextResponse.json({ error: 'Failed to create redirect' }, { status: 500 });
  }
}
