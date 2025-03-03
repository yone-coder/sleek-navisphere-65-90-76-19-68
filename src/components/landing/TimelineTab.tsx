
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Clock } from 'lucide-react';

const CircularProgress = ({ progress, size = 40, strokeWidth = 5, textSize = 12 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-purple-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span 
        className="absolute text-purple-600 font-medium" 
        style={{ fontSize: `${textSize}px` }}
      >
        {progress === 100 ? (
          <Check size={textSize * 1.2} className="text-purple-600" />
        ) : (
          `${Math.round(progress)}%`
        )}
      </span>
    </div>
  );
};

const ProjectTimeline = () => {
  // Sample timeline data - reduced to two items
  const [timelineData, setTimelineData] = useState([
    {
      id: 1,
      date: 'January 2025',
      title: 'Project Inception',
      description: 'Initial concept development and market research completed.',
      category: 'planning',
      completed: true,
      progress: 100,
      tasks: [
        { id: 101, title: 'Market research', completed: true, completedDate: '2025-01-10', details: 'Analyzed 15 competitors and identified key market opportunities.' },
        { id: 102, title: 'Competitive analysis', completed: true, completedDate: '2025-01-15', details: 'Compared features, pricing, and positioning of top 5 competitors.' },
        { id: 103, title: 'Initial sketches', completed: true, completedDate: '2025-01-20', details: 'Created 12 concept sketches exploring various UI approaches.' },
        { id: 104, title: 'Stakeholder interviews', completed: true, completedDate: '2025-01-25', details: 'Conducted interviews with 8 key stakeholders to gather requirements.' }
      ]
    },
    {
      id: 4,
      date: 'April 2025',
      title: 'User Testing',
      description: 'Beta version released to select users for feedback and iteration.',
      category: 'testing',
      completed: false,
      progress: 75,
      tasks: [
        { id: 401, title: 'Test plan creation', completed: true, completedDate: '2025-04-03', details: 'Developed comprehensive test protocol covering 15 key user journeys.' },
        { id: 402, title: 'User recruitment', completed: true, completedDate: '2025-04-10', details: 'Recruited 25 beta testers across 4 target customer segments.' },
        { id: 403, title: 'Usability testing sessions', completed: true, completedDate: '2025-04-20', details: 'Conducted 15 moderated sessions and collected 25 survey responses.' },
        { id: 404, title: 'Feedback analysis', completed: false, completedDate: '', details: 'Currently categorizing feedback into 5 priority tiers for implementation.' },
        { id: 405, title: 'Prioritization of changes', completed: false, completedDate: '', details: 'Will create sprint plan for implementing top 20 user-requested features.' }
      ]
    }
  ]);

  const [expandedItem, setExpandedItem] = useState(null);

  // Calculate overall project completion based on task completion rather than milestone progress
  const calculateOverallProgress = () => {
    const totalTasks = timelineData.reduce((acc, item) => acc + item.tasks.length, 0);
    const completedTasks = timelineData.reduce((acc, item) => 
      acc + item.tasks.filter(task => task.completed).length, 0);
    
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const overallProgress = calculateOverallProgress();

  // Toggle expanded view for a timeline item
  const toggleExpand = (id, e) => {
    // Prevent the entire card from being clicked when clicking the expand button
    if (e) {
      e.stopPropagation();
    }
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Get category color
  const getCategoryColor = (category) => {
    const categories = {
      'planning': 'bg-blue-600',
      'funding': 'bg-green-600',
      'development': 'bg-purple-600',
      'testing': 'bg-yellow-600',
      'marketing': 'bg-pink-600'
    };
    return categories[category] || 'bg-gray-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Project Timeline</h2>
        <p className="text-gray-600">Track our progress from concept to launch</p>
      </div>

      {/* Progress summary with circular indicator - MOVED TO TOP */}
      <div className="mb-6 p-4 bg-gray-100 rounded-xl">
        <div className="flex items-center">
          <div className="mr-4">
            <CircularProgress progress={overallProgress} size={70} strokeWidth={7} textSize={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Overall Project Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-purple-600 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {overallProgress}% of tasks completed across all milestones
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline connector line - adjusted left position */}
        <div className="absolute left-4 top-6 bottom-0 w-1 bg-gray-300 rounded-full"></div>

        {/* Timeline items - adjusted padding */}
        {timelineData.map((item, index) => {
          // Calculate milestone progress based on completed tasks
          const totalTasks = item.tasks.length;
          const completedTasks = item.tasks.filter(task => task.completed).length;
          const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
          
          return (
            <div 
              key={item.id}
              className={`relative mb-8 pl-12 ${
                index === timelineData.length - 1 ? '' : 'pb-4'
              }`}
            >
              {/* Timeline dot - adjusted position and size */}
              <div className="absolute left-0 top-8 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow">
                <CircularProgress progress={taskProgress} size={44} strokeWidth={4} textSize={12} />
              </div>

              {/* Timeline content */}
              <div 
                className={`
                  transition-all duration-300 bg-white rounded-xl shadow-lg relative
                  ${expandedItem === item.id ? '' : 'hover:bg-gray-50'}
                `}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${getCategoryColor(item.category)}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <span className="text-gray-500 text-sm">{item.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {completedTasks} of {totalTasks} tasks completed ({taskProgress}%)
                  </p>
                  
                  {expandedItem === item.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {/* Task List Section */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-3">Tasks:</h4>
                        <div className="space-y-3">
                          {item.tasks.map((task) => (
                            <div key={task.id} className="p-3 bg-gray-50 rounded-lg w-full">
                              <div className="flex">
                                <div className="mr-3">
                                  <div className={`w-10 h-10 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center`}>
                                    {task.completed ? 
                                      <Check size={20} className="text-white" /> : 
                                      <Clock size={20} className="text-white" />
                                    }
                                  </div>
                                </div>
                                <div className="flex-1 flex flex-col">
                                  <span className={`text-sm font-medium ${task.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                                    {task.title}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1">
                                    {task.completed ? task.completedDate : 'Pending'}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1">
                                    {task.details}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Expand/collapse button */}
                <div className="relative h-0 mb-6">
                  <button 
                    onClick={(e) => toggleExpand(item.id, e)}
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg border border-gray-200 z-10 text-gray-500"
                  >
                    {expandedItem === item.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function TimelineTab() {
  return (
    <div className="w-full">
      <ProjectTimeline />
    </div>
  );
}

export default ProjectTimeline;
