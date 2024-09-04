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

    // Fetch the streams for the authenticated user
    const streams = await prismaClient.stream.findMany({
      where: { userId },
      include: {
        _count: {
          select: { upvotes: true },
        },
        upvotes: {
          where: {
            userId: user.id, // Assuming you have user information available
          },
          select: {
            id: true, // Or any specific fields you want from upvotes
          },
        },
      },
    });
    
    return NextResponse.json({
      streams: streams.map((stream) => ({
        ...stream,
        upvoteCount: stream._count.upvotes,
        hasUserUpvoted: stream.upvotes.length > 0, // To check if the logged-in user has upvoted
      })),
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching streams:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
