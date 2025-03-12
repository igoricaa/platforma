'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Clock, Calendar } from 'lucide-react';

// This is a placeholder - in a real app, you'd fetch the course data from your API
const courseData = {
  id: '1',
  title: 'Advanced Strength Training Program',
  description: 'A comprehensive program designed to help athletes build strength, power, and muscle mass.',
  coach: {
    name: 'John Smith',
    image: '/placeholder.jpg',
  },
  price: 99,
  enrolledStudents: 248,
  lastUpdated: '2023-05-15',
  duration: '8 weeks',
  modules: [
    {
      id: '1',
      title: 'Introduction to Advanced Strength Training',
      description: 'Learn the fundamentals of advanced strength training techniques.',
      lessons: [
        {
          id: '1',
          title: 'Understanding Progressive Overload',
          description: 'The science behind progressive overload and how to implement it effectively.',
          videoUrl: 'https://example.com/video1',
          duration: 15,
        },
        {
          id: '2',
          title: 'Setting Up Your Training Program',
          description: 'How to structure your training program for optimal results.',
          videoUrl: 'https://example.com/video2',
          duration: 20,
        },
      ],
    },
    {
      id: '2',
      title: 'Compound Movements',
      description: 'Master the essential compound movements for strength development.',
      lessons: [
        {
          id: '3',
          title: 'Squat Technique Mastery',
          description: 'Detailed breakdown of proper squat technique and variations.',
          videoUrl: 'https://example.com/video3',
          duration: 25,
        },
        {
          id: '4',
          title: 'Deadlift Fundamentals',
          description: 'Learn proper deadlift form and programming strategies.',
          videoUrl: 'https://example.com/video4',
          duration: 30,
        },
      ],
    },
  ],
};

export default function CoursePage({ params }: { params: { id: string } }) {
  const [activeModule, setActiveModule] = useState(courseData.modules[0].id);
  const [activeLesson, setActiveLesson] = useState(courseData.modules[0].lessons[0].id);

  const currentModule = courseData.modules.find(module => module.id === activeModule);
  const currentLesson = currentModule?.lessons.find(lesson => lesson.id === activeLesson);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{courseData.title}</h1>
          <p className="text-muted-foreground mt-1">
            By {courseData.coach.name}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{courseData.enrolledStudents} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{courseData.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Last updated: {courseData.lastUpdated}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Modules</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {courseData.modules.map((module) => (
                      <div key={module.id} className="py-2 px-4">
                        <button
                          onClick={() => {
                            setActiveModule(module.id);
                            setActiveLesson(module.lessons[0].id);
                          }}
                          className={`w-full text-left p-2 rounded-md transition-colors ${
                            activeModule === module.id
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <h3 className="font-medium">{module.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {module.lessons.length} lessons
                          </p>
                        </button>
                        {activeModule === module.id && (
                          <div className="ml-4 mt-2 space-y-1">
                            {module.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson.id)}
                                className={`w-full text-left p-2 text-sm rounded-md transition-colors ${
                                  activeLesson === lesson.id
                                    ? 'bg-primary/5 text-primary'
                                    : 'hover:bg-muted'
                                }`}
                              >
                                <div className="flex items-center">
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  {lesson.title}
                                </div>
                                <p className="text-xs text-muted-foreground ml-6 mt-1">
                                  {lesson.duration} min
                                </p>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-4">
              {currentLesson && (
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">{currentLesson.title}</h2>
                      <p className="text-muted-foreground">{currentLesson.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>
                What you'll learn in this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{courseData.description}</p>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Course Content</h3>
                <ul className="space-y-2">
                  {courseData.modules.map((module) => (
                    <li key={module.id}>
                      <div className="font-medium">{module.title}</div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
              <CardDescription>
                See what other students are saying about this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No reviews yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 