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
    const streams = await prismaClient.stream.findMany({
      where: { userId: streamerId },
    });

    console.log("Fetched streams:", streams); // Log fetched streams

    return NextResponse.json({ streams }, { status: 200 });
  } catch (error) {
    console.error('Error fetching streams:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
