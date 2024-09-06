// pages/api/streams/my/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prismaClient } from '@/app/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Get the session from NextAuth
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the user's email from the session
    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        { message: 'User email not found' },
        { status: 400 }
      );
    }

    // Fetch the user from the database using their email
    const user = await prismaClient.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get the userId from the fetched user
    const userId = user.id;

    // Find the most upvoted stream for the user
    const mostUpvotedStream = await prismaClient.stream.findFirst({
      where: { userId },
      orderBy: {
        upvotes: {
          _count: 'desc', // Use _count for ordering by the number of upvotes
        },
      },
    });
    console.log(mostUpvotedStream)

    if (!mostUpvotedStream) {
      return NextResponse.json(
        { message: 'No streams found for the user' },
        { status: 404 }
      );
    }


    // Upsert the stream into the CurrentStream table
    await prismaClient.currentStream.upsert({
      where: {
        userId: userId,
      },
      update: {
        streamId: mostUpvotedStream.id,
      },
      create: {
        userId: userId,
        streamId: mostUpvotedStream.id,
      }
    });

    return NextResponse.json(
      { mostUpvotedStream, message: 'Stream moved to CurrentStream successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error moving stream to CurrentStream:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
