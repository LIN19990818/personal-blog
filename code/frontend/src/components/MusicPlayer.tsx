import { useEffect, useState, useRef } from 'react'
import { Button, Slider } from 'antd'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
  UnorderedListOutlined,
  UpOutlined,
  DownOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { musicApi, Music } from '@/api'

const MusicNoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
)

const MusicPlayer = () => {
  const [playlist, setPlaylist] = useState<Music[]>([])
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    loadPlaylist()
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const loadPlaylist = async () => {
    try {
      const response = await musicApi.getAll()
      if (response && response.length > 0) {
        setPlaylist(response)
        setCurrentTrack(response[0])
      }
    } catch (error) {
      console.error('Failed to load playlist:', error)
    }
  }

  const handlePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('Audio play failed:', error)
          setIsPlaying(false)
        }
      }
    }
  }

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setCurrentTrack(playlist[newIndex])
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }

  const handleNext = () => {
    const newIndex = currentIndex === playlist.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setCurrentTrack(playlist[newIndex])
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }

  const handleTrackSelect = (index: number) => {
    setCurrentIndex(index)
    setCurrentTrack(playlist[index])
    setIsPlaying(true)
    setShowPlaylist(false)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  const handleVolumeChange = (value: number) => {
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    setIsExpanded(false)
    setShowPlaylist(false)
  }

  const handleExpand = () => {
    setIsMinimized(false)
    setIsExpanded(true)
  }

  if (playlist.length === 0) {
    return null
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />

      {isMinimized ? (
        <button
          onClick={handleExpand}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gray-800 rounded-xl z-50 flex items-center justify-center hover:bg-gray-700 hover:scale-105 transition-all duration-300 group"
          title="打开音乐播放器"
        >
          <MusicNoteIcon className="text-white w-7 h-7" />
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse" />
          )}
          <div className="absolute -top-12 right-0 bg-white text-gray-800 text-xs px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100">
            <div className="font-medium">{currentTrack?.title}</div>
            <div className="text-gray-500">{currentTrack?.artist}</div>
          </div>
        </button>
      ) : (
        <div className={`fixed bottom-0 left-0 right-0 bg-white text-gray-800 shadow-2xl z-50 transition-all duration-300 border-t border-gray-200 ${isExpanded ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                {currentTrack?.coverUrl ? (
                  <img
                    src={currentTrack.coverUrl}
                    alt={currentTrack.title}
                    className="w-12 h-12 rounded-lg object-cover mr-3 shadow"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mr-3">
                    <MusicNoteIcon className="text-white w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{currentTrack?.title}</h4>
                  <p className="text-sm text-gray-500 truncate">{currentTrack?.artist}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="text"
                  size="small"
                  icon={<StepBackwardOutlined className="text-gray-600 hover:text-primary-500 text-lg" />}
                  onClick={handlePrev}
                />
                <Button
                  type="text"
                  size="small"
                  icon={
                    isPlaying ? (
                      <PauseCircleOutlined className="text-primary-500 text-2xl" />
                    ) : (
                      <PlayCircleOutlined className="text-primary-500 text-2xl" />
                    )
                  }
                  onClick={handlePlay}
                />
                <Button
                  type="text"
                  size="small"
                  icon={<StepForwardOutlined className="text-gray-600 hover:text-primary-500 text-lg" />}
                  onClick={handleNext}
                />
              </div>

              <div className="flex items-center gap-3 flex-1 justify-end">
                <span className="text-xs text-gray-500 w-20 text-right">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <Slider
                  value={currentTime}
                  max={duration}
                  onChange={handleSeek}
                  className="w-24"
                  tooltip={{ formatter: (value) => formatTime(value || 0) }}
                />
                <SoundOutlined className="text-gray-500 text-sm" />
                <Slider
                  value={volume}
                  max={1}
                  step={0.01}
                  onChange={handleVolumeChange}
                  className="w-16"
                  tooltip={{ formatter: (value) => `${Math.round((value || 0) * 100)}%` }}
                />
                <Button
                  type="text"
                  size="small"
                  icon={<UnorderedListOutlined className="text-gray-600 hover:text-primary-500 text-lg" />}
                  onClick={() => setShowPlaylist(!showPlaylist)}
                />
                <Button
                  type="text"
                  size="small"
                  icon={showPlaylist ? <DownOutlined className="text-gray-600" /> : <UpOutlined className="text-gray-600" />}
                  onClick={() => setShowPlaylist(!showPlaylist)}
                />
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
                  onClick={handleMinimize}
                />
              </div>
            </div>
          </div>

          {showPlaylist && (
            <div className="bg-gray-50 border-t border-gray-200 max-h-48 overflow-y-auto">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <h3 className="font-bold mb-2 text-gray-800">播放列表 ({playlist.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {playlist.map((track, index) => (
                    <div
                      key={track.id}
                      className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-white transition-colors ${
                        currentIndex === index ? 'bg-white border border-primary-500 shadow-sm' : ''
                      }`}
                      onClick={() => handleTrackSelect(index)}
                    >
                      <span className="w-6 text-gray-400 text-sm">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{track.title}</p>
                        <p className="text-xs text-gray-500 truncate">{track.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default MusicPlayer
