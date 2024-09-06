"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PauseIcon } from './Icons';
import YouTube, { YouTubePlayer } from 'react-youtube';






export function Space({ creatorId }: any) {
  const playerRef = useRef<YouTubePlayer | null>(null); // YouTube player reference


  const onReady = (event: any) => {
    playerRef.current = event.target;
  };

  const onPlay = () => {
    setIsPlaying(true);
    playerRef.current?.playVideo();
  };

  const onPause = () => {
    setIsPlaying(false);
    playerRef.current?.pauseVideo();
  };
  const router = useRouter();
  const [newSongUrl, setNewSongUrl] = useState<string>("");
  const [songs, setSongs] = useState<
    Array<{ streamId: string; title: string; upvotes: number }>
  >([]);
  const [curSong, setCurSong] = useState<{ streamId: string; title: string; extractedId: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handlePlayNext = async () => {
    try {
      const response = await axios.get(
        "/api/streams/next",
        {
          withCredentials: true,
        }
      );
  
      console.log("Top song is:", response.data);
  
      // Extract the mostUpvotedStream from the response
      const mostUpvotedStream = response.data.mostUpvotedStream;
  
      // Update the curSong state
      setCurSong({
        streamId: mostUpvotedStream.id,
        title: mostUpvotedStream.title,
        extractedId: mostUpvotedStream.extractedId
      });
  
    } catch (error) {
      console.error("Error getting top song:", error);
    }
  }

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchSongs = async () => {
      if (status === "authenticated") {
        try {
          const response = await axios.get("/api/streams/my", {
            withCredentials: true,
          });
          const streams = response.data.streams.map((stream: any) => ({
            streamId: stream.id,
            title: stream.title,
            upvotes: stream.upvoteCount,
          }));

          setSongs(streams);
        } catch (error) {
          console.error("Error fetching songs:", error);
        }
      } else if (status === "unauthenticated") {
        router.push("/");
      }
    };
    fetchSongs();

    const intervalId = setInterval(() => {
      fetchSongs();
    }, 20000);
    return () => clearInterval(intervalId);
  }, [status, session]);

  const handleUpvote = async (index: number) => {
    console.log(songs[index]);
    const songId = songs[index].streamId;

    try {
      const response = await axios.post(
        "/api/streams/upvote",
        {
          streamId: songId,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Upvote response:", response.data);
      const updatedSongs = [...songs];
      updatedSongs[index].upvotes++;
      updatedSongs.sort((a, b) => b.upvotes - a.upvotes);
      setSongs(updatedSongs);
    } catch (error) {
      console.error("Error upvoting song:", error);
    }
  };
  const handleDownvote = async (index: number) => {
    const songId = songs[index].streamId;

    try {
      const response = await axios.post(
        "/api/streams/downvote",
        {
          streamId: songId,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Downvote response:", response.data);
      const updatedSongs = [...songs];
      if (updatedSongs[index].upvotes > 0) {
        updatedSongs[index].upvotes--;
      }
      updatedSongs.sort((a, b) => b.upvotes - a.upvotes);
      setSongs(updatedSongs);
    } catch (error) {
      console.error("Error downvoting song:", error);
    }
  };

  const handleAddToQueue = async () => {
    if (newSongUrl.trim() !== "") {
      console.log("Song url ", newSongUrl);
      try {
        const response = await axios.post(
          "/api/streams",
          {
            userId: creatorId,
            url: newSongUrl,
          },
          {
            withCredentials: true,
          }
        );

        console.log("Stream added:", response.data);
        const newStream = response.data.stream;
        setSongs((prevSongs) => [
          ...prevSongs,
          {
            streamId: newStream.id,
            title: newStream.title,
            upvotes: 0,
          },
        ]);
        console.log(songs);
      } catch (error) {
        console.error("Error adding stream:", error);
      }

      setNewSongUrl("");
    }
  };
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-r from-[#4a90e2] to-[#8e44ad] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#e0e0e0] border-b">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Music2Icon className="h-6 w-6 fill-[#4a90e2]" />
          <span className="sr-only">Soundscape</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button
            variant="ghost"
            className="px-4 py-2 rounded-md hover:bg-[#d0d0d0]/10"
          >
            Explore
          </Button>
          <Button
            variant="ghost"
            className="px-4 py-2 rounded-md hover:bg-[#d0d0d0]/10"
          >
            My Spaces
          </Button>
          <Button
            variant="ghost"
            className="px-4 py-2 rounded-md hover:bg-[#d0d0d0]/10"
          >
            Settings
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 rounded-md border-[#c5335f] text-[#ff3333]"
          >
            <LogInIcon className="h-4 w-4 mr-2 fill-[#d72f86]" />
            Log Out
          </Button>
        </nav>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 p-8">
      <div className="flex flex-col gap-4">
  <div className="flex items-center gap-4">
    <img
      src="/placeholder.svg"
      width="100"
      height="100"
      alt="Song Thumbnail"
      className="rounded-lg"
      style={{ aspectRatio: "100/100", objectFit: "cover" }}
    />
    <div>
      <h3 className="text-xl font-bold text-[#333333]">Song Title</h3>
      <p className="text-[#333333]">Artist Name</p>
    </div>
  </div>
  <div className="flex items-center gap-4">
    <Button variant="ghost" size="icon">
      <RewindIcon className="h-6 w-6 fill-[#4a90e2]" />
    </Button>
    <Button variant="ghost" size="icon">
      <PlayIcon className="h-6 w-6 fill-[#4a90e2]" />
    </Button>
    <Button variant="ghost" size="icon">
      <ForwardIcon className="h-6 w-6 fill-[#4a90e2]" />
    </Button>
    <Slider
      className="flex-1 [&>span:first-child]:h-1 [&>span:first-child]:bg-[#757575] [&_[role=slider]]:bg-[#4a90e2] [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-[#4a90e2] [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
      defaultValue={[40]}
    />
    <Button variant="ghost" size="icon">
      <Volume2Icon className="h-6 w-6 fill-[#4a90e2]" />
    </Button>
  </div>
  <div className="flex items-center gap-4">
    <Input
      type="text"
      placeholder="Add song URL"
      value={newSongUrl}
      onChange={(e) => setNewSongUrl(e.target.value)}
      className="flex-1 rounded-md border-[#4a90e2] bg-white text-[#d16ba5] px-4 py-2"
    />
    <Button
      onClick={handleAddToQueue}
      className="px-4 py-2 rounded-md border border-black text-blue-500 bg-black hover:text-white transition-all duration-300 ease-in-out shadow-md"
    >
      Add to queue
    </Button>
  </div>
  <div className="flex items-center gap-4 justify-center">
    <Button
      onClick={() => handlePlayNext()}
      className="px-6 py-2 rounded-lg border border-black text-blue-500 bg-black hover:text-white transition-all duration-300 ease-in-out shadow-md"
    >
      Play Next
    </Button>
  </div>
  {curSong ? (
    <>
      <YouTube
        videoId={curSong.extractedId}
        opts={{
          height: '390',
          width: '640',
          playerVars: { autoplay: 1 }
        }}
        onReady={onReady}
        className="mt-4"  // Adjust the margin-top to reduce gap
      />
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={onPlay} variant="ghost" size="icon">
          <PlayIcon className="h-6 w-6 fill-[#4a90e2]" />
        </Button>
        <Button onClick={onPause} variant="ghost" size="icon">
          <PauseIcon className="h-6 w-6 fill-[#4a90e2]" />
        </Button>
      </div>
    </>
  ) : (
    <p>No song playing</p>
  )}
</div>

        <div className="flex flex-col gap-4 overflow-auto max-h-[80vh]">
          <ScrollArea className="flex-1">
            <div className="grid gap-4">
              {songs.map((song, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-[#4a90e2] to-[#8e44ad] rounded-md p-4"
                >
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {song.title}
                    </h4>
                    {/* <p className="text-[#d0d0d0]">{song.artist}</p> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#d0d0d0]">
                      {song.upvotes} Upvotes
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpvote(index)}
                    >
                      <ArrowUpIcon className="h-4 w-4 fill-white" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownvote(index)}
                    >
                      <ArrowDownIcon className="h-4 w-4 fill-white" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-[#d0d0d0]">
          &copy; 2024 Soundscape. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-[#4a90e2]"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-[#4a90e2]"
            prefetch={false}
          >
            Privacy
          </Link>
          {/* <Button variant="ghost" size="sm" onClick={handleShare}>
            <ShareIcon className="h-6 w-6 fill-[#4a90e2]" />
            <span className="sr-only">Share</span>
          </Button> */}
        </nav>
      </footer>
    </div>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function ForwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 17 20 12 15 7" />
      <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
    </svg>
  );
}

function LogInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function Music2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function RewindIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 19 2 12 11 5 11 19" />
      <polygon points="22 19 13 12 22 5 22 19" />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function Volume2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
