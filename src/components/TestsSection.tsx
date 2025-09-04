import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Play, Filter, BookOpen, Calculator, Atom } from 'lucide-react';

const TestsSection = () => {
  const grades = [
    { grade: '5-sinf', count: 45, color: 'bg-primary' },
    { grade: '6-sinf', count: 52, color: 'bg-secondary' },
    { grade: '7-sinf', count: 48, color: 'bg-accent' },
    { grade: '8-sinf', count: 61, color: 'bg-success' },
    { grade: '9-sinf', count: 58, color: 'bg-warning' },
    { grade: '10-sinf', count: 43, color: 'bg-primary' },
    { grade: '11-sinf', count: 39, color: 'bg-secondary' },
  ];

  const subjects = [
    { name: 'Algebra', icon: Calculator, count: 145 },
    { name: 'Geometriya', icon: BookOpen, count: 132 },
    { name: 'Fizika', icon: Atom, count: 89 },
  ];

  const featuredTests = [
    {
      id: 1,
      title: 'Algebra asoslari - 8-sinf',
      description: 'Kvadrat tenglamalar va funksiyalar bo\'yicha test',
      questions: 25,
      duration: 45,
      attempts: 1284,
      rating: 4.8,
      difficulty: 'O\'rtacha',
      subject: 'Algebra',
      image: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Geometriya olimpiadasi - 9-sinf',
      description: 'Uchburchak va to\'rtburchaklar mavzusida',
      questions: 30,
      duration: 60,
      attempts: 967,
      rating: 4.9,
      difficulty: 'Qiyin',
      subject: 'Geometriya',
      image: '/placeholder.svg',
    },
    {
      id: 3,
      title: 'Kombinatorika va ehtimollik',
      description: 'Matematik ehtimollik nazariyasi asoslari',
      questions: 20,
      duration: 40,
      attempts: 756,
      rating: 4.7,
      difficulty: 'Oson',
      subject: 'Algebra',
      image: '/placeholder.svg',
    },
  ];

  return (
    <section id="tests" className="py-20 bg-muted/30 mt-20
    ">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Matematik Testlar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Har xil sinf va mavzular bo'yicha testlar. O'z bilimingizni sinab ko'ring va 
            olimpiadaga tayyorlaning.
          </p>
        </div>

        {/* Grade Selection */}
        <div className="mb-12 animate-fade-in-up">
          <h3 className="text-xl font-semibold mb-6 text-center">Sinf bo'yicha tanlang:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {grades.map((item, index) => (
              <Card 
                key={item.grade} 
                className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-medium border-2 hover:border-primary/20"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-soft`}>
                    <span className="text-white font-bold">{index + 5}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.grade}</h4>
                  <p className="text-xs text-muted-foreground">{item.count} test</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>     
      </div>
    </section>
  );
};

export default TestsSection;