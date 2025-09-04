import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye, ArrowRight, Filter, BookOpen, Calculator, Lightbulb } from 'lucide-react';

const ArticlesSection = () => {
  const categories = [
    { name: 'Yangiliklar', icon: Lightbulb, count: 89 },
    { name: 'Maslahatlar', icon: BookOpen, count: 127 },
    { name: 'Uslublar', icon: Calculator, count: 94 },
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'Matematik olimpiadaga qanday tayyorlanish kerak?',
      excerpt: 'Matematik olimpiadaga samarali tayyorgarlik ko\'rish uchun eng muhim maslahatlar va strategiyalar.',
      author: 'Zarina Ahmadova',
      publishDate: '2024-01-15',
      readTime: 8,
      views: 3421,
      category: 'Maslahatlar',
      image: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Geometriya masalalarini yechish usullari',
      excerpt: 'Planimetriya va stereometriya masalalarini oson va tez yechish uchun samarali usullar.',
      author: 'Javohir Karimov',
      publishDate: '2024-01-12',
      readTime: 12,
      views: 2897,
      category: 'Uslublar',
      image: '/placeholder.svg',
    },
    {
      id: 3,
      title: 'Jahon matematik olimpiadasi yangiliklari',
      excerpt: 'O\'zbekiston jamoasining 2024-yilgi International Mathematical Olympiad natijalar haqida.',
      author: 'Muhammadali Toshev',
      publishDate: '2024-01-10',
      readTime: 6,
      views: 4156,
      category: 'Yangiliklar',
      image: '/placeholder.svg',
    },
    {
      id: 4,
      title: 'Kombinatorika masalalarini yechish strategiyalari',
      excerpt: 'Kombinatorika va ehtimollar nazariyasi bo\'yicha masalalarni yechish uchun asosiy yondashuvlar.',
      author: 'Sitora Normurodova',
      publishDate: '2024-01-08',
      readTime: 10,
      views: 2341,
      category: 'Uslublar',
      image: '/placeholder.svg',
    },
    {
      id: 5,
      title: 'Algebra tenglamalarida yangi yechim usullari',
      excerpt: 'Yuqori darajali tenglamalarni yechish uchun innovatsion matematik yondashuvlar.',
      author: 'Bobur Salimov',
      publishDate: '2024-01-05',
      readTime: 15,
      views: 1892,
      category: 'Uslublar',
      image: '/placeholder.svg',
    },
    {
      id: 6,
      title: 'Matematika o\'qituvchilari uchun yangi dastur',
      excerpt: 'Respublika bo\'ylab matematik ta\'lim sifatini oshirish maqsadida ishlab chiqilgan yangi dastur.',
      author: 'Gulnoza Rahimova',
      publishDate: '2024-01-03',
      readTime: 7,
      views: 2756,
      category: 'Yangiliklar',
      image: '/placeholder.svg',
    },
  ];

  return (
    <section id="articles" className="py-20 bg-muted/30 mt-20">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Maqolalar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Matematik ta'lim, olimpiada tayyorgarligi va eng so'nggi yangiliklar 
            haqida professional maqolalar.
          </p>
        </div>

     

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {featuredArticles.map((article) => (
            <Card 
              key={article.id} 
              className="group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-large border-2 hover:border-primary/20 bg-gradient-card overflow-hidden"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    <span>{article.views}</span>
                  </div>
                </div>
                
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors mb-3">
                  {article.title}
                </CardTitle>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(article.publishDate).toLocaleDateString('uz-UZ')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground">
                    {article.readTime} daqiqa o'qish
                  </span>
                </div>
                
                <Button className="w-full bg-gradient-primary hover:shadow-glow group-hover:scale-105 transition-all">
                  O'qishni davom ettirish
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 hover:bg-primary/5">
            Barcha maqolalarni ko'rish
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;