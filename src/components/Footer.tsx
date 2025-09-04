import { Calculator, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { name: 'Bosh sahifa', href: '#home' },
    { name: 'Testlar', href: '#tests' },
    { name: 'Kitoblar', href: '#books' },
    { name: 'Maqolalar', href: '#articles' },
    { name: 'AI Yordamchisi', href: '#ai' },
  ];

  const resources = [
    { name: 'Olimpiada yangiliklari', href: '#' },
    { name: 'Yo\'riqnomalar', href: '#' },
    { name: 'Qo\'llab-quvvatlash', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Bog\'lanish', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shadow-glow">
                <Calculator className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">MathOlympiad.Uz</h3>
                <p className="text-sm text-primary-foreground/80">Matematika Olimpiadasi</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/90 leading-relaxed mb-6 max-w-md">
              O'zbekistonning eng katta matematik ta'lim platformasi. Olimpiadaga 
              tayyorgarlik ko'rish uchun eng yaxshi resurslar va professional 
              yordamchi xizmatlari.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Andijan, Uzbekistan</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-secondary" />
                <span>contact@matholympiad.uz</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Tezkor havolalar</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resurslar</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-foreground/80">Ijtimoiy tarmoqlar:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-primary-foreground/60 ${social.color} transition-colors duration-300 hover:scale-110`}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-primary-foreground/80">
                © 2025 MathOlympiad.Uz. Barcha huquqlar himoyalangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;