import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { Briefcase, Leaf, Heart, Church, School, GraduationCap, Building } from 'lucide-react';

export function ServicesTab() {
  const [activeProjectType, setActiveProjectType] = useState('apps');
  
  const handleProjectTypeChange = (value: string) => {
    setActiveProjectType(value);
  };

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
          <Tabs defaultValue="lakou-agri" className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="inline-flex w-auto p-1 h-10">
                <TabsTrigger value="lakou-agri" className="px-3 text-sm flex items-center gap-1.5">
                  <Leaf className="w-4 h-4" />
                  <span>Lakou Agri</span>
                </TabsTrigger>
                
                <TabsTrigger value="hearts-hands" className="px-3 text-sm flex items-center gap-1.5">
                  <Heart className="w-4 h-4" />
                  <span>Hearts & Hands Foundation</span>
                </TabsTrigger>
                
                <TabsTrigger value="holy-light" className="px-3 text-sm flex items-center gap-1.5">
                  <Church className="w-4 h-4" />
                  <span>Holy Light Church</span>
                </TabsTrigger>
                
                <TabsTrigger value="college-nova" className="px-3 text-sm flex items-center gap-1.5">
                  <School className="w-4 h-4" />
                  <span>Collège Nova de Désarmes</span>
                </TabsTrigger>
                
                <TabsTrigger value="ecole-polytechnique" className="px-3 text-sm flex items-center gap-1.5">
                  <Building className="w-4 h-4" />
                  <span>École Polytechnique Horizon</span>
                </TabsTrigger>
                
                <TabsTrigger value="universite-nova" className="px-3 text-sm flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Université Nova</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="lakou-agri" className="mt-6">
              {/* Empty content for Lakou Agri as requested */}
            </TabsContent>
            
            <TabsContent value="hearts-hands" className="mt-6">
              {/* Empty content for Hearts & Hands Foundation as requested */}
            </TabsContent>
            
            <TabsContent value="holy-light" className="mt-6">
              {/* Empty content for Holy Light Church as requested */}
            </TabsContent>
            
            <TabsContent value="college-nova" className="mt-6">
              {/* Empty content for Collège Nova de Désarmes as requested */}
            </TabsContent>
            
            <TabsContent value="ecole-polytechnique" className="mt-6">
              {/* Empty content for École Polytechnique Horizon as requested */}
            </TabsContent>
            
            <TabsContent value="universite-nova" className="mt-6">
              {/* Empty content for Université Nova as requested */}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
