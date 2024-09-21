import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/app/lib/db';
import { z } from 'zod';
import { StreamType } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import axios from 'axios';



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

    // Determine stream type and extract ID
    const { type, extractedId } = getStreamTypeAndId(url);
    if (!extractedId) {
      return NextResponse.json(
        { message: `Invalid ${type} URL` },
        { status: 400 }
      );
    }

    

      const youtubeApiKey = process.env.YOUTUBE_API_KEY; // Ensure this is in your .env.local
      const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${extractedId}&key=${youtubeApiKey}`;
  
      // Make the API call server-side
      const youtubeResponse = await fetch(youtubeApiUrl, {
        method: 'GET',
      });
  
      // Parse the response
      const youtubeData = await youtubeResponse.json();
  
      // Log the response to inspect it
  
      if (youtubeData.error) {
        return NextResponse.json({ message: 'Error fetching video data' }, { status: 503 });
      }

    // if (youtubeData.error) {
    //   return NextResponse.json({ message: 'Error fetching video data' }, { status: 500 });
    // }

    const stream = await prismaClient.stream.create({
      data: {
        title: youtubeData.items[0].snippet.title,
        type,
        url,
        extractedId,
        userId,
        artist: youtubeData.items[0].snippet.channelTitle,
        thumbnailUrl: youtubeData.items[0].snippet.thumbnails.maxres.url,
        description: youtubeData.items[0].snippet.description.trim().slice(0, 100) + '...',
      },
    });
    

    return NextResponse.json({
      message: 'Added stream',
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
  try {
    // Get the creatorId from the request query
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
    
    if (currentStream?.stream) {
      // Update the current stream to increment timesPlayed and set playedDate
      await prismaClient.stream.update({
        where: { id: currentStream.stream.id },
        data: {
          timesPlayed: {
            increment: 1,
          },
          playedDate: new Date(),
        },
      });
    }
    
    // Fetch the latest 20 songs for the creator from the database
    const streams = await prismaClient.stream.findMany({
      where: {
        userId: creatorId,         // Streams belonging to the user
        timesPlayed: 0,            // Only fetch streams where timesPlayed is 0
      },
      orderBy: {
        playedDate: 'desc',        // Sort by the most recently played
      },
      take: 20,                     // Limit the result to the latest 20 streams
      include: {
        _count: {
          select: { upvotes: true }, // Count the number of upvotes
        },
        upvotes: {
          where: {
            userId: user.id,         // Filter upvotes for the current user
          },
          select: {
            id: true,                // Select specific fields from upvotes, e.g., id
          },
        },
      },
    });
    
    // Map streams to include additional details
    const mappedStreams = streams.map((stream) => ({
      ...stream,
      upvoteCount: stream._count.upvotes,
      hasUserUpvoted: stream.upvotes.length > 0, // To check if the logged-in user has upvoted
    }));
    
    return NextResponse.json({ currentStream: currentStream?.stream, streams: mappedStreams }, { status: 200 });
  } catch (error) {
    console.error('Error fetching streams:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
