import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/app/lib/db';
import { z } from 'zod';
import { StreamType } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import axios from 'axios';

const apiKey = process.env.YOUTUBE_API_KEY; // Ensure this is set in your environment variables

async function fetchYouTubeVideoDetails(videoId:string) {
  console.log("Sending req to Youtube")
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
        key: apiKey
      }
    });
    console.log(response)

    const videoDetails = response.data.items[0];

    return {
      title: "videoDetails.snippet.title",
      description: "videoDetails.snippet.description",
      thumbnails: "videoDetails.snippet.thumbnails",
      duration: "videoDetails.contentDetails.duration",
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw new Error('Failed to fetch video details');
  }
}

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
    const id = user.id;

  try {
    // Parse the request body
    const body = await req.json();
    const { userId, url } = streamSchema.parse(body);
    console.log(url)
    console.log(userId)
    console.log(session.user)
    if (userId !== id) {
      return NextResponse.json(
        { message: 'Unauthorized user' },
        { status: 403 }
      );
    }

    // Determine stream type and extract ID
    const { type, extractedId } = getStreamTypeAndId(url);
    if (!extractedId) {
      return NextResponse.json(
        { message: `Invalid ${type} URL` },
        { status: 400 }
      );
    }
    console.log("YT Extracted id ",extractedId)
    // Fetch YouTube video details
    const videoDetails = await fetchYouTubeVideoDetails(extractedId);
    console.log("Fetched youtube detials ", videoDetails)

    // Create stream
    // const stream = await prismaClient.stream.create({
    //   data: {
    //     title: "videoDetails.title",
    //     type,
    //     url,
    //     extractedId,
    //     userId,
    //   },
    // });
    // console.log(stream)

    return NextResponse.json({
      message: 'Added stream',
      // stream
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
  try {
    // Get the creatorId from the request query
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get('creatorId');

    if (!creatorId) {
      return NextResponse.json({ message: 'Missing creatorId' }, { status: 400 });
    }

    // Fetch the current song for the creator
    const currentStream = await prismaClient.currentStream.findUnique({
      where: { userId: creatorId },
      include: { stream: true }, // Include the related stream details
    });

    // Fetch all songs for the creator from the database
    const streams = await prismaClient.stream.findMany({
      where: { userId: creatorId },
      orderBy: {
        upvotes: {
          _count: 'desc', // Order by upvotes count (most upvoted first)
        },
      },
    });

    return NextResponse.json({ currentStream, streams }, { status: 200 });
  } catch (error) {
    console.error('Error fetching streams:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
