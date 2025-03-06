
import React, { useState, useEffect } from 'react';
import { Play, ChevronRight, Clock, CheckCircle, Menu, Calendar, MapPin, Users, BookOpen, Star, ThumbsUp, MessageCircle, Bookmark, Award, FileText, Coffee, Gift } from 'lucide-react';

const Seminar = () => {
  // State for countdown
  const [countdown, setCountdown] = useState({
    days: 7,
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  
  // State for tabs
  const [activeTab, setActiveTab] = useState('details');
  
  // State for video progress
  const [progress, setProgress] = useState(42);
  
  // State for related videos
  const [relatedVideos, setRelatedVideos] = useState([
    { id: 1, title: "Machine Learning Fundamentals", duration: "42:15", views: "2.4k", thumbnail: "/api/placeholder/160/90" },
    { id: 2, title: "Data Science for Business", duration: "31:08", views: "1.8k", thumbnail: "/api/placeholder/160/90" },
    { id: 3, title: "Future of Workplace Automation", duration: "27:53", views: "3.1k", thumbnail: "/api/placeholder/160/90" }
  ]);
  
  // State for user engagement
  const [likes, setLikes] = useState(427);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: "Alex Johnson", comment: "This was incredibly helpful for our team's planning session!", time: "2 hours ago", avatar: "/api/placeholder/40/40", likes: 12 },
    { id: 2, user: "Michelle Carter", comment: "Does anyone know if the slides will be available after the seminar?", time: "5 hours ago", avatar: "/api/placeholder/40/40", likes: 5 }
  ]);
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Helper function to format countdown units
  const formatUnit = (unit) => unit.toString().padStart(2, '0');

  // Mock agenda data
  const agendaItems = [
    { time: "9:00 AM", title: "Opening Keynote: The Future of AI in Business", speaker: "Dr. Emma Richards" },
    { time: "10:30 AM", title: "Workshop: Implementing AI Solutions for Immediate ROI", speaker: "Jason Torres" },
    { time: "1:00 PM", title: "Panel Discussion: Ethical Considerations in AI Adoption", speaker: "Multiple Speakers" },
    { time: "3:00 PM", title: "Networking Session & Product Demos", speaker: "" }
  ];

  // Benefits of attending
  const benefits = [
    { icon: <Award size={20} className="text-yellow-500" />, title: "Industry Certification", description: "Receive a verified certificate of attendance" },
    { icon: <FileText size={20} className="text-blue-500" />, title: "Exclusive Content", description: "Get access to presentation materials and research papers" },
    { icon: <Coffee size={20} className="text-amber-700" />, title: "Networking Opportunities", description: "Connect with industry leaders and potential partners" },
    { icon: <Gift size={20} className="text-red-500" />, title: "Special Offers", description: "Exclusive discounts on related products and services" }
  ];
  
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto bg-gray-50 shadow-xl rounded-xl overflow-hidden">
      {/* Header with sandwich menu, logo and register button */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition">
              <Menu size={24} />
            </button>
            <div className="font-bold text-xl text-blue-600">InnoSeminar</div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition">
            Register Now
          </button>
        </div>
      </div>
      
      {/* Video Tab Content */}
      <div className="flex-grow bg-white">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Video Player */}
              <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                <img src="/api/placeholder/800/450" alt="Video thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform transition hover:scale-110">
                    <Play size={30} fill="currentColor" />
                  </button>
                </div>
                {/* Video duration overlay */}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  05:23
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Revolutionizing Industry with AI</h2>
                <div className="flex items-center gap-2 text-red-600 font-medium">
                  <Clock size={18} />
                  <span>
                    {formatUnit(countdown.days)}:{formatUnit(countdown.hours)}:
                    {formatUnit(countdown.minutes)}:{formatUnit(countdown.seconds)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp 
                    size={20} 
                    className={`cursor-pointer ${likes ? 'text-blue-600 fill-blue-600' : 'text-gray-500'}`}
                    onClick={() => setLikes(prev => prev + 1)}
                  />
                  <span className="text-sm text-gray-700">{likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={20} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{comments.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bookmark 
                    size={20} 
                    className={`cursor-pointer ${bookmarked ? 'text-blue-600 fill-blue-600' : 'text-gray-500'}`}
                    onClick={() => setBookmarked(prev => !prev)}
                  />
                  <span className="text-sm text-gray-700">{bookmarked ? 'Saved' : 'Save'}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Join our exclusive seminar where industry leaders share cutting-edge insights on how AI is transforming business landscapes. Learn practical strategies to implement in your organization immediately.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">AI Strategy</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Innovation</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Business Growth</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Digital Transformation</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-3">Key Topics</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Practical AI implementation strategies for immediate ROI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Building resilient systems in uncertain market conditions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Creating innovation pipelines that consistently deliver value</span>
                  </li>
                </ul>
              </div>
              
              {/* New Benefits Section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Benefits of Attending</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="mr-3 mt-1">{benefit.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Discussion ({comments.length})</h3>
                <div className="space-y-4 mb-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full mr-3" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium">{comment.user}</h4>
                            <span className="text-xs text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{comment.comment}</p>
                          <div className="flex items-center mt-2">
                            <button className="text-xs text-gray-500 hover:text-blue-600 mr-4 flex items-center">
                              <ThumbsUp size={14} className="mr-1" />
                              {comment.likes}
                            </button>
                            <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <img src="/api/placeholder/40/40" alt="Your avatar" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <textarea 
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm" 
                      placeholder="Add a comment..."
                      rows="2"
                    ></textarea>
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Related Videos */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedVideos.map(video => (
                    <div key={video.id} className="group cursor-pointer">
                      <div className="relative mb-2">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-auto rounded-lg" />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <h4 className="font-medium text-sm group-hover:text-blue-600 transition">{video.title}</h4>
                      <p className="text-xs text-gray-500">{video.views} views</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Tabs for sidebar content */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-4">
                  <button 
                    className={`py-2 px-1 -mb-px font-medium text-sm ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Event Details
                  </button>
                  <button 
                    className={`py-2 px-1 -mb-px font-medium text-sm ${activeTab === 'agenda' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('agenda')}
                  >
                    Agenda
                  </button>
                </div>
              </div>
              
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <h3 className="text-lg font-semibold mb-4 text-blue-800">
                    Event Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-medium">April 15-16, 2025</p>
                        <p className="text-sm text-gray-600">9:00 AM - 5:00 PM EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-medium">Tech Innovation Center</p>
                        <p className="text-sm text-gray-600">123 Future Avenue, New York, NY</p>
                        <a href="#" className="text-sm text-blue-600 hover:underline">View Map</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-medium">250 Attendees Expected</p>
                        <p className="text-sm text-gray-600">Industry leaders from 45+ companies</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <BookOpen className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-medium">Format</p>
                        <p className="text-sm text-gray-600">In-person and virtual livestream</p>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          <span className="text-xs text-green-700">116 already registered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ratings and Reviews Section */}
                  <div className="mt-5 pt-4 border-t border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Attendee Ratings</h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={16} className="text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">4.8/5</span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs">
                        <span className="w-8">5 ★</span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '85%' }}></div>
                        </div>
                        <span>85%</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="w-8">4 ★</span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '10%' }}></div>
                        </div>
                        <span>10%</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="w-8">3 ★</span>
                        <div className="flex-grow h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '5%' }}></div>
                        </div>
                        <span>5%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Early Bird Price:</span>
                      <span className="font-bold text-lg">$299</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-4">Price increases to $399 after March 15</div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
                      Register Now
                    </button>
                    <p className="text-xs text-center mt-2 text-gray-500">Group discounts available for 3+ attendees</p>
                  </div>
                </div>
              )}
              
              {/* Agenda Tab */}
              {activeTab === 'agenda' && (
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Day 1 Agenda</h3>
                  <div className="space-y-4">
                    {agendaItems.map((item, index) => (
                      <div key={index} className="relative pl-6 pb-4 border-l-2 border-blue-200 last:border-0">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                        <p className="text-sm font-semibold text-blue-600">{item.time}</p>
                        <h4 className="font-medium mt-1">{item.title}</h4>
                        {item.speaker && (
                          <p className="text-sm text-gray-600 mt-1">Presenter: {item.speaker}</p>
                        )}
                      </div>
                    ))}
                    <div className="mt-2 text-sm text-center">
                      <a href="#" className="text-blue-600 hover:underline">Download Full Schedule</a>
                    </div>
                  </div>
                  
                  {/* Day selector */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-3">Select Day</h4>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">Day 1</button>
                      <button className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition">Day 2</button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Featured Testimonial */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "This seminar completely transformed how our team approaches AI integration. The strategies we learned have already produced a 27% increase in operational efficiency."
                </p>
                <div className="flex items-center">
                  <img src="/api/placeholder/40/40" alt="Testimonial avatar" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Michael Chen</p>
                    <p className="text-xs text-gray-600">CTO, FutureTech Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seminar;
