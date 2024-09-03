import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prismaClient } from '@/app/lib/db'; // Update this path if necessary
import { z } from 'zod';

// Define Zod schema for downvote
const downvoteSchema = z.object({
  streamId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    // Retrieve and validate the request body
    const body = await req.json();
    const { streamId } = downvoteSchema.parse(body);

    // Retrieve session
    const session = await getServerSession();

    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { message: 'Unauthenticated' },
        { status: 401 }
      );
    }

    // Find user by email
    const user = await prismaClient.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Find existing upvote
    const upvote = await prismaClient.upvote.findUnique({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId,
        },
      },
    });

    if (!upvote) {
      return NextResponse.json(
        { message: 'No upvote found to remove' },
        { status: 404 }
      );
    }

    // Delete the upvote
    await prismaClient.upvote.delete({
      where: {
        id: upvote.id,
      },
    });

    return NextResponse.json(
      { message: 'Upvote removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error removing upvote:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
