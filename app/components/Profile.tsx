"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Music, ThumbsUp, Users, Headphones, Award, Mic2 } from "lucide-react"
import { Streamlist } from "./Streamlist"
import { useEffect, useState } from "react"

interface Stream {
  id: string;
  type: string; // You can replace this with the actual type if you have a StreamType enum
  url: string;
  extractedId: string;
  title: string;
  active: boolean;
  userId: string;
  timesPlayed: number;
  playedDate: string | null;
  thumbnailUrl: string | null;
  artist: string | null;
  description: string | null;
}

export function Profile() {
  const [songsPlayed,setSongsPlayed] = useState<number>(0);
  const [totalUpvotes,setTotalUpvotes] = useState<number>(0);
  const [username,setUsername] = useState<string>('');
  const [userId,setUserId] = useState<string>('');
  const [streams, setStreams] = useState<Stream[]>([]);
  const [cards, setCards] = useState<any[]>([]); // Update this type based on your card structure

  const streamer = {
    name: username,
    username: userId,
    avatar: "/placeholder.svg?height=100&width=100",
    songsPlayed: songsPlayed,
    totalUpvotes: totalUpvotes,
    followers: 10000,
    hoursStreamed: 500,
    topGenre: "Electronic",
    achievements: ["Top 100 Streamer", "1M Total Listeners", "24 Hour Stream"]
  }
  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch("/api/profile/streams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch streams');
        }
  
        const data = await response.json(); // Type the fetched data
        setStreams(data.streams); // Update streams state
        console.log(data.streams);
        setSongsPlayed(data.numberOfStreams);
        setTotalUpvotes(data.totalUpvotes);
        setUserId(data.userId);
        setUsername(data.username)
  
        // Map streams to cards
        const newCards = data.streams.map((stream: Stream) => ({
          title: stream.title,
          description: stream.artist || 'Unknown Artist',
          src: stream.thumbnailUrl || '', // You can set a default thumbnail URL if needed
          ctaText: 'Play',
          ctaLink: stream.url,
          content: () => (
            <p>
              {stream.description || 'No description available.'}
            </p>
          ),
        }));
  
        setCards(newCards); // Update cards state
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchStreams();
  }, []); // Empty dependency array ensures this runs once on mount

  const stats = [
    { title: "Songs Played", value: streamer.songsPlayed, icon: Music, color: "text-blue-400", progress: 75 },
    { title: "Total Upvotes", value: streamer.totalUpvotes.toLocaleString(), icon: ThumbsUp, color: "text-green-400", progress: 80 },
    { title: "Followers", value: streamer.followers.toLocaleString(), icon: Users, color: "text-purple-400", progress: 60 },
    { title: "Hours Streamed", value: streamer.hoursStreamed, icon: Headphones, color: "text-yellow-400", progress: 50 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4 pb-0">
            <Avatar className="w-24 h-24 border-2 border-blue-400">
              <AvatarImage src={streamer.avatar} alt={streamer.name} />
              <AvatarFallback>{streamer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-grow">
              <CardTitle className="text-3xl font-bold">{streamer.name}</CardTitle>
              <p className="text-blue-400">@{streamer.username}</p>
            </div>
            <Badge variant="secondary" className="text-lg self-start mt-2 sm:mt-0">
              <Mic2 className="h-4 w-4 mr-1" />
              {streamer.topGenre}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-700 border-gray-600">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <Progress value={stat.progress} className="mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {streamer.achievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="text-yellow-400 border-yellow-400">
                    <Award className="h-4 w-4 mr-1" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="streams" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="streams">Streams</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="streams">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Recent Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <Streamlist cards={cards}/>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="about">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>About {username}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{username} is an electronic music producer and streamer known for his energetic sets and interactive streams. With a passion for blending various electronic sub-genres, he creates a unique experience for his listeners.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}