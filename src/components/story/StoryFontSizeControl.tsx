
import React from 'react';
import { Type } from 'lucide-react';

type StoryFontSizeControlProps = {
  fontSizeControlOpen: boolean;
  setFontSizeControlOpen: (value: boolean) => void;
  fontSizeOptions: number[];
  fontSize: number;
  handleSetFontSize: (size: number) => void;
  getFontSizePercentage: () => number;
};

export function StoryFontSizeControl({
  fontSizeControlOpen,
  setFontSizeControlOpen,
  fontSizeOptions,
  fontSize,
  handleSetFontSize,
  getFontSizePercentage
}: StoryFontSizeControlProps) {
  return (
    <>
      <div className="fixed bottom-40 right-4 z-30 flex flex-col items-end">
        <button 
          onClick={() => setFontSizeControlOpen(!fontSizeControlOpen)}
          className="font-size-toggle bg-black bg-opacity-70 hover:bg-opacity-80 text-white rounded-full p-3 shadow-lg transition-all duration-200"
        >
          <Type size={20} />
        </button>
      </div>
      
      {fontSizeControlOpen && (
        <div className="fixed bottom-40 left-0 right-0 z-20 flex justify-center">
          <div className="font-size-control mx-4 w-full max-w-xl bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl p-4 border border-white border-opacity-30">
            <div className="text-sm font-medium mb-2 text-gray-700 text-center">Text Size</div>
            
            <div className="relative h-12 mb-2">
              <div className="absolute left-8 right-8 top-1/2 h-2 -mt-1 bg-gray-200 rounded-full" />
              
              <div 
                className="absolute left-8 top-1/2 h-2 -mt-1 bg-blue-500 rounded-full"
                style={{ width: `${getFontSizePercentage()}%`, maxWidth: 'calc(100% - 64px)' }}
              />
              
              <div className="absolute left-8 right-8 top-0 h-full flex items-center justify-between">
                {fontSizeOptions.map((size) => {
                  const isActive = size === fontSize;
                  return (
                    <button
                      key={size}
                      onClick={() => handleSetFontSize(size)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                        ${isActive ? 'bg-blue-500 text-white shadow-md scale-110' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <span className="text-xs font-medium">{size}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="text-sm font-bold text-center text-blue-600">Current: {fontSize}px</div>
          </div>
        </div>
      )}
    </>
  );
}
