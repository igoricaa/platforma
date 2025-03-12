'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Search, Clock } from 'lucide-react';

// This is a placeholder - in a real app, you'd fetch the courses data from your API
const coursesData = [
  {
    id: '1',
    title: 'Advanced Strength Training Program',
    description: 'A comprehensive program designed to help athletes build strength, power, and muscle mass.',
    thumbnail: '/placeholder.jpg',
    coach: {
      id: '1',
      name: 'John Smith',
    },
    category: 'Strength Training',
    progress: 65,
    lastAccessed: '2023-06-10',
    duration: '8 weeks',
  },
  {
    id: '2',
    title: 'Olympic Weightlifting Fundamentals',
    description: 'Learn the basics of Olympic weightlifting with proper technique and programming.',
    thumbnail: '/placeholder.jpg',
    coach: {
      id: '2',
      name: 'Sarah Johnson',
    },
    category: 'Olympic Weightlifting',
    progress: 30,
    lastAccessed: '2023-06-15',
    duration: '6 weeks',
  },
  {
    id: '3',
    title: 'Injury Prevention for Athletes',
    description: 'Strategies and exercises to prevent common injuries and improve longevity in sports.',
    thumbnail: '/placeholder.jpg',
    coach: {
      id: '3',
      name: 'Michael Chen',
    },
    category: 'Injury Prevention',
    progress: 100,
    lastAccessed: '2023-05-20',
    duration: '4 weeks',
  },
  {
    id: '4',
    title: 'Sports Nutrition Fundamentals',
    description: 'Learn how to fuel your body for optimal athletic performance and recovery.',
    thumbnail: '/placeholder.jpg',
    coach: {
      id: '4',
      name: 'Emma Rodriguez',
    },
    category: 'Nutrition',
    progress: 10,
    lastAccessed: '2023-06-18',
    duration: '5 weeks',
  },
  {
    id: '5',
    title: 'Mobility Training for Athletes',
    description: 'Improve your mobility, flexibility, and movement quality for better performance.',
    thumbnail: '/placeholder.jpg',
    coach: {
      id: '5',
      name: 'David Wilson',
    },
    category: 'Mobility',
    progress: 45,
    lastAccessed: '2023-06-05',
    duration: '6 weeks',
  },
];

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'title'>('recent');

  // Get all unique categories
  const allCategories = Array.from(
    new Set(coursesData.map((course) => course.category))
  ).sort();

  // Filter courses based on search query and selected categories
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.coach.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);

    return matchesSearch && matchesCategories;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
    } else if (sortBy === 'progress') {
      return b.progress - a.progress;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('recent')}
          >
            Recent
          </Button>
          <Button
            variant={sortBy === 'progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('progress')}
          >
            Progress
          </Button>
          <Button
            variant={sortBy === 'title' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('title')}
          >
            Title
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCourses.map((course) => (
          <Link href={`/dashboard/courses/${course.id}`} key={course.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted-foreground/20">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold line-clamp-1">{course.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    By {course.coach.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{course.duration}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {course.progress}% complete
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 