
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, CheckCircle, Clock, AlertCircle, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProjectTimeline = () => {
  // Sample project data - you can replace with your actual data
  const [phases, setPhases] = useState([
    {
      id: 1,
      title: 'Planning & Research',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'completed',
      description: 'Initial project planning, requirements gathering, and market research',
      expanded: false,
      tasks: [
        { id: 101, title: 'Stakeholder interviews', status: 'completed', date: '2025-03-03' },
        { id: 102, title: 'Site architecture draft', status: 'completed', date: '2025-03-08' },
        { id: 103, title: 'Technology stack selection', status: 'completed', date: '2025-03-12' }
      ]
    },
    {
      id: 2,
      title: 'Design Phase',
      startDate: '2025-03-16',
      endDate: '2025-04-10',
      status: 'in-progress',
      description: 'UI/UX design for main website and all sub-websites',
      expanded: false,
      tasks: [
        { id: 201, title: 'Design system creation', status: 'completed', date: '2025-03-20' },
        { id: 202, title: 'Main website prototyping', status: 'in-progress', date: '2025-03-25' },
        { id: 203, title: 'Sub-websites design mockups', status: 'pending', date: '2025-04-05' }
      ]
    },
    {
      id: 3,
      title: 'Development - Core Website',
      startDate: '2025-04-11',
      endDate: '2025-05-15',
      status: 'pending',
      description: 'Building the main website framework and core functionality',
      expanded: false,
      tasks: [
        { id: 301, title: 'Frontend framework setup', status: 'pending', date: '2025-04-15' },
        { id: 302, title: 'Core functionality development', status: 'pending', date: '2025-04-25' },
        { id: 303, title: 'CMS integration', status: 'pending', date: '2025-05-05' }
      ]
    },
    {
      id: 4,
      title: 'Development - Sub-websites',
      startDate: '2025-05-16',
      endDate: '2025-06-20',
      status: 'pending',
      description: 'Building all sub-websites with shared components',
      expanded: false,
      tasks: [
        { id: 401, title: 'Sub-website 1 development', status: 'pending', date: '2025-05-20' },
        { id: 402, title: 'Sub-website 2 development', status: 'pending', date: '2025-06-01' },
        { id: 403, title: 'Sub-website 3 development', status: 'pending', date: '2025-06-10' }
      ]
    },
    {
      id: 5,
      title: 'Testing & Quality Assurance',
      startDate: '2025-06-21',
      endDate: '2025-07-15',
      status: 'pending',
      description: 'Comprehensive testing of all websites and functionality',
      expanded: false,
      tasks: [
        { id: 501, title: 'User acceptance testing', status: 'pending', date: '2025-06-25' },
        { id: 502, title: 'Cross-browser testing', status: 'pending', date: '2025-07-01' },
        { id: 503, title: 'Performance optimization', status: 'pending', date: '2025-07-10' }
      ]
    },
    {
      id: 6,
      title: 'Deployment & Launch',
      startDate: '2025-07-16',
      endDate: '2025-07-31',
      status: 'pending',
      description: 'Final deployment and public launch of all websites',
      expanded: false,
      tasks: [
        { id: 601, title: 'Production environment setup', status: 'pending', date: '2025-07-18' },
        { id: 602, title: 'Content migration', status: 'pending', date: '2025-07-22' },
        { id: 603, title: 'Go-live and monitoring', status: 'pending', date: '2025-07-30' }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Function to toggle expanded state of a phase
  const toggleExpand = (id: number) => {
    setPhases(phases.map(phase => 
      phase.id === id ? { ...phase, expanded: !phase.expanded } : phase
    ));
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'in-progress':
        return <Clock className="text-blue-500" size={18} />;
      case 'pending':
        return <AlertCircle className="text-gray-400" size={18} />;
      default:
        return null;
    }
  };

  // Function to handle search and filtering
  const filteredPhases = phases.filter(phase => {
    // Filter by status
    if (statusFilter !== 'all' && phase.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        phase.title.toLowerCase().includes(query) || 
        phase.description.toLowerCase().includes(query) ||
        phase.tasks.some(task => task.title.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Function to expand all phases
  const expandAll = () => {
    setPhases(phases.map(phase => ({ ...phase, expanded: true })));
  };

  // Function to collapse all phases
  const collapseAll = () => {
    setPhases(phases.map(phase => ({ ...phase, expanded: false })));
  };

  return (
    <div className="w-full max-w-none mx-auto bg-white">
      {/* Header with controls */}
      <div className="mb-8 bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Website Project Timeline</h1>
            <div className="flex items-center gap-3">
              <p className="text-gray-600">March 2025 - July 2025</p>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">On Track</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={expandAll}>
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll}>
              Collapse All
            </Button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search tasks or phases..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-full sm:w-48 flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative px-4 sm:px-6">
        <AnimatePresence>
          {filteredPhases.length > 0 ? (
            filteredPhases.map((phase, index) => (
              <motion.div 
                key={phase.id} 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Phase header */}
                <div 
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    phase.status === 'completed' 
                      ? 'bg-green-50 border-l-4 border-green-500' 
                      : phase.status === 'in-progress'
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'bg-gray-50 border-l-4 border-gray-300'
                  }`}
                  onClick={() => toggleExpand(phase.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      {getStatusIcon(phase.status)}
                      <h2 className="text-lg font-semibold ml-2">{phase.title}</h2>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(phase.startDate)} - {formatDate(phase.endDate)}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1 rounded-full hover:bg-gray-200">
                    {phase.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </Button>
                </div>
                
                {/* Phase details when expanded */}
                <AnimatePresence>
                  {phase.expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 ml-6 pl-6 border-l-2 border-dashed border-gray-300">
                        <p className="text-gray-700 mb-3">{phase.description}</p>
                        <div className="space-y-3">
                          {phase.tasks.map(task => (
                            <motion.div 
                              key={task.id} 
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
                            >
                              {getStatusIcon(task.status)}
                              <span className="ml-2 flex-1">{task.title}</span>
                              <span className="text-sm text-gray-500">{formatDate(task.date)}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500">No phases match your search criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export function TimelineTab() {
  return (
    <div className="w-full mx-auto">
      <ProjectTimeline />
    </div>
  );
}

export default ProjectTimeline;
