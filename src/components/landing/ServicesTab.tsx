
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { Briefcase, Leaf, Heart, Church, School, Building, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

export function ServicesTab() {
  const [activeProjectType, setActiveProjectType] = useState('apps');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  const handleProjectTypeChange = (value: string) => {
    setActiveProjectType(value);
  };
  
  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  // Non-tech projects data
  const nonTechProjects = [
    {
      id: 'lakou-agri',
      name: 'Lakou Agri',
      icon: <Leaf className="w-4 h-4" />,
    },
    {
      id: 'hearts-hands',
      name: 'Hearts & Hands Foundation',
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: 'holy-light',
      name: 'Holy Light Church',
      icon: <Church className="w-4 h-4" />,
    },
    {
      id: 'college-nova',
      name: 'Collège Nova de Désarmes',
      icon: <School className="w-4 h-4" />,
    },
    {
      id: 'ecole-polytechnique',
      name: 'École Polytechnique Horizon',
      icon: <Building className="w-4 h-4" />,
    },
    {
      id: 'universite-nova',
      name: 'Université Nova',
      icon: <GraduationCap className="w-4 h-4" />,
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-3xl font-bold text-center mb-4">Our Projects</h2>
        <p className="text-gray-600 text-center max-w-xl">
          Explore our diverse portfolio of tech and non-tech initiatives designed to create positive impact.
        </p>
      </div>

      <Tabs
        value={activeProjectType}
        onValueChange={handleProjectTypeChange}
        className="w-full"
      >
        <div className="flex justify-center mb-10">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="apps" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Apps</span>
            </TabsTrigger>
            <TabsTrigger value="non-tech" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              <span>Lakou Agri</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="apps" className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Keep app projects content here, if any */}
          </motion.div>
        </TabsContent>

        <TabsContent value="non-tech" className="space-y-8">
          <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with title */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-800 text-center">Non-Tech Projects</h2>
              </div>
              <p className="mt-1 text-sm text-gray-500 text-center">{nonTechProjects.length} projects • Agricultural, Educational & Community</p>
            </div>
            
            {/* Projects section */}
            <div className="max-h-96 overflow-y-auto">
              {nonTechProjects.map((project) => (
                <div 
                  key={project.id}
                  className="transition-colors border-l-4 border-transparent hover:bg-gray-50"
                >
                  {/* Project header (always visible) */}
                  <div 
                    className="flex items-center p-4 cursor-pointer"
                    onClick={() => toggleProjectExpansion(project.id)}
                  >
                    <div className="mr-3 flex-shrink-0">
                      {project.icon}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">
                        {project.name}
                      </h3>
                    </div>
                    
                    <div className="ml-2 text-gray-400">
                      {expandedProject === project.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                  
                  {/* Project description (visible only when expanded) */}
                  {expandedProject === project.id && (
                    <div className="px-6 pb-5 ml-12 mr-4 text-sm text-gray-600 border-t border-gray-100 pt-3 animate-fade-in">
                      {/* Empty content as requested */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
