
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Flag, Target, Trophy, Calendar } from 'lucide-react';

export function StoryMissionsTab() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Story Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Our Story</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Who We Are</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2019, Mima Group was born from a shared passion for creating intuitive digital experiences. Our team of designers and developers came together with a mission to transform how people interact with technology.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                What started as a small project has evolved into a dedicated studio focused on creating meaningful digital products that solve real-world problems.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                We believe that thoughtful design and technology can create positive change. Our vision is to build digital products that not only look beautiful but also significantly improve how people work, learn, and connect.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                With each project, we strive to push the boundaries of what's possible while maintaining a user-first approach to everything we create.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Separator className="my-8" />
      
      {/* Missions Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Our Missions</h2>
          <Badge variant="outline" className="px-3 py-1">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>2023-2024</span>
          </Badge>
        </div>
        
        <div className="grid gap-5">
          <Card className="overflow-hidden border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Flag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">Launch Our Design System</CardTitle>
                  <CardDescription className="text-gray-600">
                    Create and open-source a comprehensive design system to help other creators build consistent and accessible experiences across platforms.
                  </CardDescription>
                  <Badge className="mt-3" variant="secondary">In progress</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">Expand Educational Resources</CardTitle>
                  <CardDescription className="text-gray-600">
                    Develop a series of workshops and tutorials to teach practical design and development skills to aspiring creators around the world.
                  </CardDescription>
                  <Badge className="mt-3" variant="secondary">Planned Q3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">Sustainable Design Initiative</CardTitle>
                  <CardDescription className="text-gray-600">
                    Create guidelines and tools for eco-friendly digital design practices that reduce carbon footprint while maintaining exceptional user experiences.
                  </CardDescription>
                  <Badge className="mt-3" variant="secondary">Upcoming</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
