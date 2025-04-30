import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// DELETE - Delete a redirect link by UUID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    const uuid = params.uuid;
    
    if (!uuid) {
      return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection('redirects');
    
    const result = await collection.deleteOne({ uuid });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Redirect not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting redirect:', error);
    return NextResponse.json({ error: 'Failed to delete redirect' }, { status: 500 });
  }
}
