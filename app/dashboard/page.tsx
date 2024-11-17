'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Youtube, ThumbsUp, ThumbsDown, Plus, Loader2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'
import axios from 'axios'

interface Song {
  id: string
  title: string
  votes: number
  thumbnail: string
}

const REFRESH_INTERVAL_MS = 10 * 1000;

export default function FuturisticSongVotingPlatform() {
  const [currentVideo, setCurrentVideo] = useState<string>('dQw4w9WgXcQ')
  const [queue, setQueue] = useState<Song[]>([
    { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', votes: 5, thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg' },
    { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', votes: 3, thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/default.jpg' },
    { id: 'Zi_XLOBDo_Y', title: 'Billie Jean', votes: 2, thumbnail: 'https://i.ytimg.com/vi/Zi_XLOBDo_Y/default.jpg' },
  ])
  const [newSongUrl, setNewSongUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleVote = (id: string, increment: number) => {
    setQueue(queue.map(song => 
      song.id === id ? { ...song, votes: song.votes + increment } : song
    ).sort((a, b) => b.votes - a.votes))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    const videoId = newSongUrl.split('v=')[1] || ''
    const newSong: Song = {
      id: videoId,
      title: `New Song ${queue.length + 1}`,
      votes: 0,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/default.jpg`
    }
    setQueue([...queue, newSong])
    setNewSongUrl('')
    setIsLoading(false)
  }

  async function refreshStreams(){
    const res = await axios.get('/api/streams/my',{
      withCredentials: true
    });
    console.log(res);
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(()=>{
      refreshStreams();
    }, REFRESH_INTERVAL_MS);
  }, [])




  return (
    <div className="min-h-screen bg-black text-white p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black z-0"
      />
      <div className="relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Stream Music Voting
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-900 border-gray-800 shadow-2xl rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${currentVideo}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Queue */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-900 border-gray-800 shadow-2xl rounded-xl h-full overflow-hidden">
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Up Next</h2>
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <AnimatePresence>
                    {queue.map((song, index) => (
                      <motion.div
                        key={song.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-4 mb-4 bg-gray-800 p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-750 transition-all duration-300"
                      >
                        <Image src={song.thumbnail} alt={song.title} width={2000} height={2000} className="w-16 h-16 rounded-md object-cover" />
                        <div className="flex-grow">
                          <h3 className="font-medium text-lg text-blue-300">{song.title}</h3>
                          <p className="text-sm text-gray-400">Votes: {song.votes}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleVote(song.id, 1)}
                            className="hover:bg-blue-700 hover:text-white transition-colors group"
                          >
                            <ThumbsUp size={18} className="mr-1" />
                            <span className="text-xs group-hover:text-white">{song.votes}</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleVote(song.id, -1)}
                            className="hover:bg-red-700 hover:text-white transition-colors group"
                          >
                            <ThumbsDown size={18} className="mr-1" />
                            <span className="text-xs group-hover:text-white">0</span>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submission Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="bg-gray-900 border-gray-800 shadow-2xl rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Submit a Song</h2>
                <form onSubmit={handleSubmit} className="flex space-x-4">
                  <div className="flex-grow relative">
                    <Input
                      type="text"
                      placeholder="Paste YouTube URL here"
                      value={newSongUrl}
                      onChange={(e) => setNewSongUrl(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white pl-10 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Plus size={20} className="mr-2" />
                    )}
                    Add to Queue
                  </Button>
                </form>
                <AnimatePresence>
                  {newSongUrl && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Preview:</h3>
                      <div className="aspect-video max-w-md rounded-lg overflow-hidden shadow-xl">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${newSongUrl.split('v=')[1]}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}