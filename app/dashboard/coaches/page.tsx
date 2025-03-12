'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Users, Search, Star } from 'lucide-react';

// This is a placeholder - in a real app, you'd fetch the coaches data from your API
const coachesData = [
  {
    id: '1',
    name: 'John Smith',
    bio: 'Certified strength and conditioning coach with over 10 years of experience working with professional athletes.',
    profileImage: '/placeholder.jpg',
    specialties: ['Powerlifting', 'Olympic Weightlifting', 'Sports Performance'],
    subscriptionPrice: 29.99,
    totalStudents: 1248,
    totalCourses: 12,
    averageRating: 4.8,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    bio: 'Former Olympic athlete specializing in sprint mechanics and explosive power development.',
    profileImage: '/placeholder.jpg',
    specialties: ['Sprint Training', 'Plyometrics', 'Athletic Development'],
    subscriptionPrice: 24.99,
    totalStudents: 876,
    totalCourses: 8,
    averageRating: 4.7,
  },
  {
    id: '3',
    name: 'Michael Chen',
    bio: 'Strength coach and physical therapist focusing on injury prevention and rehabilitation.',
    profileImage: '/placeholder.jpg',
    specialties: ['Injury Prevention', 'Rehabilitation', 'Corrective Exercise'],
    subscriptionPrice: 19.99,
    totalStudents: 1542,
    totalCourses: 15,
    averageRating: 4.9,
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    bio: 'Nutrition specialist and strength coach helping athletes optimize performance through diet and training.',
    profileImage: '/placeholder.jpg',
    specialties: ['Sports Nutrition', 'Body Composition', 'Strength Training'],
    subscriptionPrice: 34.99,
    totalStudents: 932,
    totalCourses: 10,
    averageRating: 4.6,
  },
  {
    id: '5',
    name: 'David Wilson',
    bio: 'Specializing in functional fitness and mobility training for athletes of all levels.',
    profileImage: '/placeholder.jpg',
    specialties: ['Functional Training', 'Mobility', 'CrossFit'],
    subscriptionPrice: 22.99,
    totalStudents: 1105,
    totalCourses: 9,
    averageRating: 4.5,
  },
];

export default function CoachesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(coachesData.flatMap((coach) => coach.specialties))
  ).sort();

  // Filter coaches based on search query and selected specialties
  const filteredCoaches = coachesData.filter((coach) => {
    const matchesSearch =
      searchQuery === '' ||
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialties =
      selectedSpecialties.length === 0 ||
      selectedSpecialties.some((specialty) =>
        coach.specialties.includes(specialty)
      );

    return matchesSearch && matchesSpecialties;
  });

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Coaches</h1>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coaches..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allSpecialties.map((specialty) => (
          <Button
            key={specialty}
            variant={selectedSpecialties.includes(specialty) ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleSpecialty(specialty)}
          >
            {specialty}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map((coach) => (
          <Link href={`/dashboard/coaches/${coach.id}`} key={coach.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={coach.profileImage} alt={coach.name} />
                    <AvatarFallback>{coach.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{coach.name}</h2>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{coach.averageRating}</span>
                    <span className="text-muted-foreground">•</span>
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{coach.totalStudents}</span>
                    <span className="text-muted-foreground">•</span>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{coach.totalCourses}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {coach.bio}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {coach.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Subscription</span>
                      <span className="font-medium">${coach.subscriptionPrice}/mo</span>
                    </div>
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