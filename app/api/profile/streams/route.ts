import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from '@/app/lib/db';
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const userEmail = session.user?.email;
  if (!userEmail) {
    return NextResponse.json(
      { message: 'User email not found' },
      { status: 400 }
    );
  }

  const user = await prismaClient.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  const streamerId = user.id;
  console.log("Streamer ID:", streamerId);

  try {
    // Fetch the streams of the user along with the count of upvotes for each stream
    const streams = await prismaClient.stream.findMany({
      where: { userId: streamerId },
      include: {
        upvotes: true,  // Include the upvotes relation to count them
      },
    });

    // Calculate the total number of streams
    const numberOfStreams = streams.length;

    // Calculate the total number of upvotes by summing up the upvotes for each stream
    const totalUpvotes = streams.reduce((acc, stream) => acc + stream.upvotes.length, 0);

    // console.log("Fetched streams:", streams); // Log fetched streams
    // console.log("Total streams:", numberOfStreams);
    // console.log("Total upvotes:", totalUpvotes);

    // Return the streams, number of streams, and total upvotes
    return NextResponse.json({ 
        username:user.email.split('@')[0],
        userId:user.id,
      streams, 
      numberOfStreams, 
      totalUpvotes 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching streams:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
