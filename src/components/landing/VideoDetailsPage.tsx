
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Share2, Heart, MessageCircle, MoreHorizontal, ChevronLeft, CheckCircle, Clock, Flag, Facebook, Instagram } from 'lucide-react';

const VideoDetailsPage = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Mock video data
  const video = {
    id: 'v12345',
    title: 'How to Master Modern Web Design in 2025',
    views: 1248932,
    uploadDate: '2025-02-15',
    likes: 45892,
    comments: 3214,
    duration: '14:35',
    quality: '4K',
    videoUrl: 'https://cdnjs.cloudflare.com/ajax/libs/Tunis-Flowbite-on-Tailwind.CSS/1.1.2/others/commercial.mp4',
    thumbnailUrl: '/api/placeholder/1920/1080',
    channel: {
      name: 'DesignMasters',
      avatar: '/api/placeholder/48/48',
      subscribers: '2.4M',
      isVerified: true,
      memberSince: '2018-05-12',
      totalVideos: 342,
      description: 'Professional UI/UX design tutorials and resources for modern web developers. Join our creative community and level up your design skills with our premium courses and weekly livestreams.',
      socialLinks: {
        facebook: 'designmasters.official',
        instagram: '@designmasters_official',
        twitter: '@designmasters',
        tiktok: '@designmasters'
      }
    },
    description: 'In this comprehensive tutorial, we explore the latest trends in web design for 2025. Learn how to create stunning interfaces that combine aesthetics with performance and accessibility.\n\nWe\'ll cover:\n- Modern color theory and psychological impact\n- Responsive design patterns for multi-device experiences\n- Accessibility features that enhance user experience\n- Performance optimization techniques\n- Interactive animations that delight users\n\nDownload the project files and follow along! Premium members get access to extended tutorials and code examples.',
    tags: ['web design', 'ui/ux', 'frontend', 'tutorial', 'react', 'accessibility', 'performance'],
    relatedContent: [
      { id: 'v12346', title: 'Advanced CSS Techniques for 2025', thumbnail: '/api/placeholder/320/180', views: '456K', channel: 'DesignMasters', duration: '18:22' },
      { id: 'v12347', title: 'Building Accessible Components in React', thumbnail: '/api/placeholder/320/180', views: '287K', channel: 'DesignMasters', duration: '21:15' }
    ]
  };

  // Format view count
  const formatCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Calculate channel membership duration
  const getChannelAge = () => {
    const startDate = new Date(video.channel.memberSince);
    const now = new Date();
    const years = now.getFullYear() - startDate.getFullYear();
    const months = now.getMonth() - startDate.getMonth();
    
    if (months < 0 || (months === 0 && now.getDate() < startDate.getDate())) {
      return `${years - 1} years`;
    }
    return `${years} years`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  // Toggle like
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  
  // Toggle comment
  const toggleComment = () => {
    setIsCommented(!isCommented);
  };

  // Toggle subscribe
  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  // Update progress bar and current time when video is playing
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateProgress = () => {
      const duration = videoElement.duration;
      if (duration) {
        setProgress((videoElement.currentTime / duration) * 100);
        setCurrentTime(videoElement.currentTime);
      }
    };

    videoElement.addEventListener('timeupdate', updateProgress);
    videoElement.addEventListener('play', () => setIsPlaying(true));
    videoElement.addEventListener('pause', () => setIsPlaying(false));
    videoElement.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      videoElement.removeEventListener('timeupdate', updateProgress);
      videoElement.removeEventListener('play', () => setIsPlaying(true));
      videoElement.removeEventListener('pause', () => setIsPlaying(false));
      videoElement.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Parse duration string (MM:SS) to seconds
  const parseDuration = (durationString) => {
    const [minutes, seconds] = durationString.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  // Seek to position in video
  const handleSeek = (e) => {
    const seekPosition = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      videoRef.current.currentTime = seekPosition * videoRef.current.duration;
    }
  };

  // Custom X (Twitter) Icon
  const XIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="text-gray-700"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  // Custom TikTok Icon
  const TikTokIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="text-gray-700"
    >
      <path d="M9 4.5c.3-1.1 1.5-1.9 2.8-1.9 3.2 0 4 2.7 4 6H19c1.5 0 2.5-1.6 2.5-3c-2 0-3.5-2.1-3.5-4.5H16c0 1.9 1 3.3 2.6 3.8C17.9 1.6 16 0 13.5 0c-2.4 0-4.5 1.8-4.5 5V7.7c-3.4 0-6 3-6 6.3c0 2.8 2 5.3 5.3 5.3c3.2 0 6.7-2.6 6.7-7.3V7.9c1.4 1 3.3 1.6 5 1.6v-3c-1.4 0-2.8-.7-3-2H9V4.5zM7 14c0-1.8 1.2-3.3 3-3.3v6.6C7.8 17.3 7 15.7 7 14z" />
    </svg>
  );

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Video Player Section */}
      <div className="relative w-full aspect-video bg-gray-900">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          onClick={togglePlay}
          muted={isMuted}
          volume={volume / 100}
        ></video>
        
        {/* Play/Pause Overlay - only visible when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={togglePlay}
              className="bg-white/70 hover:bg-white/90 rounded-full p-4 backdrop-blur-sm transition-all transform hover:scale-110"
            >
              <Play size={32} className="text-gray-800" />
            </button>
          </div>
        )}
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex flex-col gap-2">
            {/* Progress Bar */}
            <div 
              className="w-full h-2 bg-gray-400/40 rounded-full overflow-hidden cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlay}
                  className="text-white hover:text-gray-200"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div className="relative">
                  <button 
                    onClick={toggleMute}
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    className="text-white hover:text-gray-200"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  
                  {showVolumeSlider && (
                    <div 
                      className="absolute bottom-8 left-0 bg-white p-2 rounded-lg shadow-lg"
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume} 
                        onChange={handleVolumeChange}
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
                
                <span className="text-sm text-white">
                  {formatTime(currentTime)} / {video.duration}
                </span>
              </div>
              
              <div>
                <button className="text-white hover:text-gray-200">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full">
          {/* Title and Stats */}
          <h1 className="text-2xl font-bold mb-2 text-gray-900">{video.title}</h1>
          
          {/* Updated Stats bar with 4K badge and evenly spaced items */}
          <div className="flex items-center justify-between text-gray-600 text-sm mb-6 border-b border-gray-200 pb-4">
            <div className="flex items-center">
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded mr-2">4K</span>
              <span>{formatCount(video.views)} views</span>
            </div>
            
            <div className="flex items-center">
              <Clock size={18} className="mr-1.5" />
              <span>{formatDate(video.uploadDate)}</span>
            </div>
            
            <div className="flex items-center">
              <MoreHorizontal size={18} className="cursor-pointer hover:text-gray-900" />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button 
              onClick={toggleLike}
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded-full ${isLiked ? 'bg-red-100 text-red-600' : 'hover:bg-gray-200'}`}
            >
              <Heart size={18} className={isLiked ? 'fill-red-500' : ''} />
              <span>{formatCount(isLiked ? video.likes + 1 : video.likes)}</span>
            </button>
            
            <button 
              onClick={toggleComment}
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded-full ${isCommented ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
            >
              <MessageCircle size={18} />
              <span>{formatCount(video.comments)}</span>
            </button>
            
            <button className="flex items-center justify-center gap-1 px-3 py-2 rounded-full hover:bg-gray-200">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
          
          {/* Enhanced Channel Info */}
          <div className="bg-white rounded-xl mb-6 overflow-hidden shadow-md">
            <div className="p-5">
              {/* Upper section with avatar, name, and subscribe button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <img 
                      src="/api/placeholder/64/64" 
                      alt={video.channel.name} 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 sm:p-1 shadow-sm">
                      <Clock size={14} className="text-purple-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold truncate text-gray-900">{video.channel.name}</h3>
                      {video.channel.isVerified && (
                        <CheckCircle size={16} className="text-blue-600 fill-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{video.channel.subscribers} subscribers • {video.channel.totalVideos} videos</p>
                    <p className="text-xs text-gray-500 truncate">Member since {formatDate(video.channel.memberSince)} • {getChannelAge()}</p>
                  </div>
                </div>
                
                <button 
                  onClick={toggleSubscribe}
                  className={`px-6 py-2.5 rounded-full font-medium transition-colors flex-shrink-0 ${
                    isSubscribed 
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              
              {/* Channel description */}
              <div className="mt-4 text-gray-700 text-sm">
                <p className="line-clamp-3">{video.channel.description}</p>
              </div>
              
              {/* Social links with icons */}
              <div className="mt-4">
                <h4 className="text-xs text-gray-600 mb-2">Follow on:</h4>
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                  <a 
                    href="#" 
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <Facebook size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs text-gray-700">Facebook</span>
                  </a>
                  <a 
                    href="#" 
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <Instagram size={20} className="text-pink-600 mb-1" />
                    <span className="text-xs text-gray-700">Instagram</span>
                  </a>
                  <a 
                    href="#" 
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <XIcon />
                    <span className="text-xs text-gray-700">X</span>
                  </a>
                  <a 
                    href="#" 
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <TikTokIcon />
                    <span className="text-xs text-gray-700">TikTok</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Channel stats */}
            <div className="bg-gray-100 grid grid-cols-3 divide-x divide-gray-200 mt-4">
              <div className="p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{video.channel.totalVideos}</p>
                <p className="text-xs text-gray-600">Videos</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{video.channel.subscribers}</p>
                <p className="text-xs text-gray-600">Subscribers</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">4.9 ⭐</p>
                <p className="text-xs text-gray-600">Rating</p>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="bg-white p-5 rounded-xl mb-6 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg text-gray-900">Description</h3>
              <button className="text-gray-500 hover:text-gray-700">
                <Flag size={16} />
              </button>
            </div>
            
            <div className="text-gray-700 whitespace-pre-line">
              {showMoreDescription 
                ? video.description
                : video.description.split('\n\n')[0] + '...'}
              
              <button 
                onClick={() => setShowMoreDescription(!showMoreDescription)}
                className="block mt-2 text-blue-600 hover:text-blue-800"
              >
                {showMoreDescription ? 'Show less' : 'Show more'}
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {video.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Related Content */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">More from {video.channel.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {video.relatedContent.map((item) => (
                <div key={item.id} className="flex gap-3 group cursor-pointer">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-32 sm:w-40 h-20 sm:h-24 rounded-lg object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 px-1 rounded text-xs text-white">
                      {item.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm group-hover:text-blue-600 line-clamp-2 text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {item.channel}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.views} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsPage;
