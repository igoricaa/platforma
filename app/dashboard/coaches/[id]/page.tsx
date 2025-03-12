'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Users, Star, CreditCard } from 'lucide-react';

// This is a placeholder - in a real app, you'd fetch the coach data from your API
const coachData = {
  id: '1',
  name: 'John Smith',
  bio: 'Certified strength and conditioning coach with over 10 years of experience working with professional athletes. Specializing in powerlifting, Olympic weightlifting, and sports performance.',
  profileImage: '/placeholder.jpg',
  specialties: ['Powerlifting', 'Olympic Weightlifting', 'Sports Performance', 'Injury Prevention'],
  subscriptionPrice: 29.99,
  totalStudents: 1248,
  totalCourses: 12,
  averageRating: 4.8,
  courses: [
    {
      id: '1',
      title: 'Advanced Strength Training Program',
      description: 'A comprehensive program designed to help athletes build strength, power, and muscle mass.',
      thumbnail: '/placeholder.jpg',
      price: 99,
      enrolledStudents: 248,
    },
    {
      id: '2',
      title: 'Olympic Weightlifting Fundamentals',
      description: 'Learn the basics of Olympic weightlifting with proper technique and programming.',
      thumbnail: '/placeholder.jpg',
      price: 79,
      enrolledStudents: 186,
    },
    {
      id: '3',
      title: 'Injury Prevention for Athletes',
      description: 'Strategies and exercises to prevent common injuries and improve longevity in sports.',
      thumbnail: '/placeholder.jpg',
      price: 59,
      enrolledStudents: 312,
    },
  ],
};

export default function CoachProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={coachData.profileImage} alt={coachData.name} />
              <AvatarFallback>{coachData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{coachData.name}</h1>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{coachData.averageRating} rating</span>
                <span className="text-muted-foreground">•</span>
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{coachData.totalStudents} students</span>
                <span className="text-muted-foreground">•</span>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>{coachData.totalCourses} courses</span>
              </div>
              <p className="text-muted-foreground">{coachData.bio}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {coachData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Subscribe to {coachData.name}</CardTitle>
            <CardDescription>
              Get access to all courses and content from this coach
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold">${coachData.subscriptionPrice}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Access to all {coachData.totalCourses} courses</span>
              </li>
              <li className="flex items-start gap-2">
                <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Cancel anytime</span>
              </li>
            </ul>
            <Button className="w-full">Subscribe Now</Button>
          </CardContent>
        </Card>

        <div className="flex-[2]">
          <Card>
            <CardHeader>
              <CardTitle>Courses by {coachData.name}</CardTitle>
              <CardDescription>
                Or purchase individual courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coachData.courses.map((course) => (
                  <div key={course.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                    <div className="h-24 md:w-36 bg-muted rounded flex items-center justify-center shrink-0">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {course.enrolledStudents} students
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2">
                      <span className="font-medium">${course.price}</span>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/dashboard/courses/${course.id}`}>View Course</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 