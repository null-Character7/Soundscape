import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prismaClient } from '@/app/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Get the session from NextAuth
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json({ message: 'User email not found' }, { status: 400 });
    }

    const user = await prismaClient.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    // Find the most upvoted stream where timesPlayed = 0
    const mostUpvotedStream = await prismaClient.stream.findFirst({
      where: {
        userId,
        timesPlayed: 0, // Only fetch streams where timesPlayed is 0
      },
      orderBy: {
        upvotes: {
          _count: 'desc', // Sort by the highest number of upvotes
        },
      },
    });

    if (!mostUpvotedStream) {
      return NextResponse.json({ message: 'No eligible streams found' }, { status: 404 });
    }

    // Increment timesPlayed and update playedDate
    const updatedStream = await prismaClient.stream.update({
      where: { id: mostUpvotedStream.id },
      data: {
        timesPlayed: { increment: 1 }, // Increment timesPlayed by 1
        playedDate: new Date(), // Update playedDate to current date
      },
    });

    // Upsert the stream into the CurrentStream table
    await prismaClient.currentStream.upsert({
      where: { userId },
      update: {
        streamId: updatedStream.id,
        url: updatedStream.url, // Use the updated stream URL
      },
      create: {
        userId,
        streamId: updatedStream.id,
        url: updatedStream.url, // Include URL in creation
      },
    });

    return NextResponse.json(
      { mostUpvotedStream: updatedStream, message: 'Stream moved to CurrentStream and updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error moving stream to CurrentStream:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
