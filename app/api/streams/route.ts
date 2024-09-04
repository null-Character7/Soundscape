import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/app/lib/db';
import { z } from 'zod';
import { StreamType } from '@prisma/client';
import { getServerSession } from "next-auth/next";



// Input validation schema
const streamSchema = z.object({
  userId: z.string(),
  url: z.string(),
});

// YouTube URL regex
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

// Spotify URL regex
const spotifyRegex = /^(https?:\/\/)?(open\.)?spotify\.com\/(track|album|playlist|artist)\/([a-zA-Z0-9]+)(.*)$/;

// Extract YouTube video ID
const extractYouTubeId = (url: string): string | null => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/);
  return match ? match[1].split('&')[0] : null;
};

// Extract Spotify ID
const extractSpotifyId = (url: string): string | null => {
  const match = url.match(spotifyRegex);
  return match ? match[4] : null;
};

// Determine stream type and extract ID
const getStreamTypeAndId = (url: string): { type: StreamType; extractedId: string | null } => {
  if (youtubeRegex.test(url)) {
    return { type: 'YouTube', extractedId: extractYouTubeId(url) };
  } else if (spotifyRegex.test(url)) {
    return { type: 'Spotify', extractedId: extractSpotifyId(url) };
  }
  return { type: 'YouTube', extractedId: null }; // Default to YouTube, but with null ID to indicate invalid URL
};

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }
  try {
    // Parse the request body
    const body = await req.json();
    console.log(body)
    const { userId, url } = streamSchema.parse(body);
    console.log(userId)
    console.log(url);

    // Determine stream type and extract ID
    const { type, extractedId } = getStreamTypeAndId(url);
    console.log(type)
    console.log(extractedId);

    if (!extractedId) {
      return NextResponse.json(
        { message: `Invalid ${type} URL` },
        { status: 400 }
      );
    }


    // Create stream
    const stream = await prismaClient.stream.create({
      data: {
        title:"BEST SONG",
        type,
        url,
        extractedId,
        userId,
      },
    });

    return NextResponse.json({
      message: "Added stream",
      stream
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating stream:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Define Zod schema for validating query parameters
const querySchema = z.object({
  creatorId: z.string(),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }
  try {
    // Extract query parameters from the request
    const url = new URL(req.url);
    console.log(url)
    const creatorId = url.searchParams.get('creatorId');

    if (!creatorId) {
      return NextResponse.json(
        { message: 'creatorId query parameter is required' },
        { status: 400 }
      );
    }

    // Validate query parameter
    querySchema.parse({ creatorId });

    // Find all streams for the given userId
    const streams = await prismaClient.stream.findMany({
      where: { userId: creatorId },
    });

    return NextResponse.json(streams, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error fetching streams:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}