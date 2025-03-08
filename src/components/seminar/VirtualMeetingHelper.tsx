import React, { useState } from 'react';
import { Video, Download, Info, Check, HelpCircle, ChevronDown, ExternalLink, Copy, Calendar, Mic, Settings, AlertTriangle } from 'lucide-react';

const VirtualMeetingHelper = () => {
  const [expandedSection, setExpandedSection] = useState('join');
  const [copied, setCopied] = useState(false);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection('');
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleConnectionTest = () => {
    // Simulate connection test
    setTimeout(() => setTestSuccess(true), 1000);
  };
  
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md border border-gray-200">
      {/* Meeting Instructions */}
      <div className="p-4 bg-blue-50 rounded-t-lg border-b border-blue-100">
        <p className="text-sm text-blue-700 font-medium">Meeting details will be shared after registration</p>
      </div>
      
      {/* Quick Actions - Modified button sizes and layout */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-start gap-2">
          <button 
            onClick={handleCopy}
            className="flex items-center justify-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            {copied ? <Check size={14} className="mr-1.5" /> : <Copy size={14} className="mr-1.5" />}
            {copied ? "Copied!" : "Copy invitation"}
          </button>
          
          <button 
            onClick={handleConnectionTest}
            className="flex items-center justify-center px-3 py-1.5 bg-blue-600 rounded-md text-xs font-medium text-white hover:bg-blue-700"
          >
            <Video size={14} className="mr-1.5" />
            Test connection
          </button>
        </div>
        
        {testSuccess !== null && (
          <div className={`mt-4 p-3 rounded-md ${testSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
            {testSuccess ? 
              <div className="flex items-center text-green-800">
                <Check size={16} className="mr-2" />
                <span>Your connection is ready for the meeting</span>
              </div> : 
              <div className="flex items-center text-red-800">
                <AlertTriangle size={16} className="mr-2" />
                <span>Connection issues detected</span>
              </div>
            }
          </div>
        )}
      </div>
      
      {/* Guided Setup */}
      <div className="py-2">
        {/* Join Instructions */}
        <div className="border-b border-gray-100">
          <button 
            onClick={() => toggleSection('join')}
            className="flex items-center justify-between w-full p-3 text-left"
          >
            <div className="flex items-center">
              <Video size={18} className="text-blue-600 mr-2" />
              <span className="font-medium">How to join</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${expandedSection === 'join' ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSection === 'join' && (
            <div className="px-4 pb-3 text-sm text-gray-600">
              <ol className="list-decimal pl-5 space-y-1">
                <li>You'll receive an email with meeting link and password</li>
                <li>Click the link or open Zoom and enter the meeting ID</li>
                <li>Enter the meeting password when prompted</li>
                <li>Choose your video and audio settings</li>
                <li>Click "Join Meeting"</li>
              </ol>
              <div className="mt-2 flex items-center text-blue-600">
                <a href="https://zoom.us/join" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                  <ExternalLink size={14} className="mr-1" />
                  <span>How to join a Zoom meeting</span>
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Installation Guide */}
        <div className="border-b border-gray-100">
          <button 
            onClick={() => toggleSection('install')}
            className="flex items-center justify-between w-full p-3 text-left"
          >
            <div className="flex items-center">
              <Download size={18} className="text-blue-600 mr-2" />
              <span className="font-medium">Get Zoom</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${expandedSection === 'install' ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSection === 'install' && (
            <div className="px-4 pb-3 text-sm text-gray-600">
              <div className="space-y-2">
                <a 
                  href="https://zoom.us/download" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100"
                >
                  <Download size={16} className="text-blue-600 mr-2" />
                  <span>Download Zoom Desktop App</span>
                </a>
                
                <a 
                  href="https://apps.apple.com/us/app/zoom-cloud-meetings/id546505307" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100"
                >
                  <Download size={16} className="text-blue-600 mr-2" />
                  <span>Download Zoom for iOS</span>
                </a>
                
                <a 
                  href="https://play.google.com/store/apps/details?id=us.zoom.videomeetings" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100"
                >
                  <Download size={16} className="text-blue-600 mr-2" />
                  <span>Download Zoom for Android</span>
                </a>
              </div>
              <p className="mt-2 text-xs">Don't want to install? <a href="#" className="text-blue-600 hover:underline">Join from your browser</a> (some features limited)</p>
            </div>
          )}
        </div>
        
        {/* Quick Setup */}
        <div className="border-b border-gray-100">
          <button 
            onClick={() => toggleSection('setup')}
            className="flex items-center justify-between w-full p-3 text-left"
          >
            <div className="flex items-center">
              <Settings size={18} className="text-blue-600 mr-2" />
              <span className="font-medium">Audio & video setup</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${expandedSection === 'setup' ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSection === 'setup' && (
            <div className="px-4 pb-3 text-sm text-gray-600">
              <div className="space-y-3">
                <div className="bg-gray-50 p-2 rounded border border-gray-200">
                  <div className="flex items-center">
                    <Video size={16} className="text-blue-600 mr-2" />
                    <p className="font-medium">Video</p>
                  </div>
                  <p className="mt-1 text-xs">Test your camera before joining. Select a neutral background or use a virtual background.</p>
                </div>
                
                <div className="bg-gray-50 p-2 rounded border border-gray-200">
                  <div className="flex items-center">
                    <Mic size={16} className="text-blue-600 mr-2" />
                    <p className="font-medium">Audio</p>
                  </div>
                  <p className="mt-1 text-xs">Test your speaker and microphone. Find a quiet location. Use headphones if possible.</p>
                </div>
                
                <button className="w-full flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100">
                  <Settings size={14} className="mr-1" />
                  <span className="text-xs">Launch audio/video test</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Troubleshooting */}
        <div>
          <button 
            onClick={() => toggleSection('troubleshoot')}
            className="flex items-center justify-between w-full p-3 text-left"
          >
            <div className="flex items-center">
              <HelpCircle size={18} className="text-blue-600 mr-2" />
              <span className="font-medium">Troubleshooting</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${expandedSection === 'troubleshoot' ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSection === 'troubleshoot' && (
            <div className="px-4 pb-3 text-sm text-gray-600">
              <div className="space-y-2">
                <details className="text-xs">
                  <summary className="font-medium cursor-pointer">Can't hear others?</summary>
                  <ul className="pl-4 mt-1 list-disc space-y-1">
                    <li>Check speaker selection in Zoom</li>
                    <li>Increase volume on your device</li>
                    <li>Try leaving and rejoining the meeting</li>
                  </ul>
                </details>
                
                <details className="text-xs">
                  <summary className="font-medium cursor-pointer">Others can't hear you?</summary>
                  <ul className="pl-4 mt-1 list-disc space-y-1">
                    <li>Check if you're muted (microphone icon with line through it)</li>
                    <li>Select the correct microphone in Zoom settings</li>
                    <li>Check if your browser has microphone permissions</li>
                  </ul>
                </details>
                
                <details className="text-xs">
                  <summary className="font-medium cursor-pointer">Video not working?</summary>
                  <ul className="pl-4 mt-1 list-disc space-y-1">
                    <li>Check if your camera is blocked or covered</li>
                    <li>Select the correct camera in Zoom settings</li>
                    <li>Close other apps that might be using your camera</li>
                  </ul>
                </details>
                
                <details className="text-xs">
                  <summary className="font-medium cursor-pointer">Connection issues?</summary>
                  <ul className="pl-4 mt-1 list-disc space-y-1">
                    <li>Move closer to your WiFi router</li>
                    <li>Close other bandwidth-heavy applications</li>
                    <li>Try connecting via phone for audio</li>
                  </ul>
                </details>
              </div>
              
              <a 
                href="https://support.zoom.us/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 flex items-center text-blue-600 text-xs hover:underline"
              >
                <ExternalLink size={12} className="mr-1" />
                <span>Visit Zoom Support Center</span>
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Tips Footer */}
      <div className="p-3 bg-gray-50 text-xs text-gray-500 rounded-b-lg">
        <p className="font-medium mb-1">Quick tips:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Join 5 minutes early to test your setup</li>
          <li>Mute when not speaking</li>
          <li>Use the chat for questions</li>
          <li>"Raise Hand" feature to indicate you want to speak</li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualMeetingHelper;
