import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, FileText, Brain } from 'lucide-react';
import heroImage from '@/assets/hero-math.jpg';

const Hero = () => {
  const stats = [
    { icon: BookOpen, label: 'Kitoblar', value: '150+', color: 'text-primary' },
    { icon: FileText, label: 'Maqolalar', value: '300+', color: 'text-accent' },
    { icon: Brain, label: 'Testlar', value: '500+', color: 'text-success' },
    { icon: Users, label: 'Talabalar', value: '10K+', color: 'text-secondary' },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          
          {/* Main Heading */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Math
              </span>
              <br />
              <span>Olympiad</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 font-medium">
              O'zbekistonning eng katta matematik ta'lim platformasi
            </p>
            
            <p className="text-lg mb-10 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Testlar, kitoblar, maqolalar va AI yordamchisi bilan matematikani o'rganing. 
              Olimpiadaga tayyorlanish uchun eng yaxshi resurslar.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-glow px-8 py-4 text-lg font-semibold"
            >
              <a href='/tests'>Testlarni boshlash</a>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <a href='/books' 
              className="px-5 py-2 bg-white text-gray-900 rounded-lg hover:opacity-40 ease-out transition-all "
            >
              Kitoblarni ko'rish
            </a >
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:bg-background/20 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto text-background">
          <path d="M0,120 C200,80 400,40 600,60 C800,80 1000,100 1200,60 L1200,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;