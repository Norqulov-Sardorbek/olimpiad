import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, BookOpen, FileText, Calculator, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '../assets/mathLogo.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false); // 🔑 Auth holati

  const navItems = [
    { href: '/home', label: 'Bosh sahifa', icon: Home },
    { href: '/tests', label: 'Testlar', icon: Calculator },
    { href: '/books', label: 'Kitoblar', icon: BookOpen },
    { href: '/articles', label: 'Maqolalar', icon: FileText },
    { href: '/ai', label: 'AI Yordamchisi', icon: Bot },
  ];

  // 🔑 Sahifa ochilganda tokenlarni tekshirish
  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (access && refresh) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  // 🔑 Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuth(false);
    window.location.reload(); // sahifani yangilash
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="" className="w-20" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-primary">MathOlympiad.Uz</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  "hover:bg-primary/5 hover:text-primary hover:shadow-soft"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuth ? (
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleLogout}
              >
                Chiqish
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Kirish</Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-primary hover:shadow-glow">
                  <Link to="/register">Ro'yxatdan o'tish</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-large animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-card hover:bg-primary/5 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                {isAuth ? (
                  <Button
                    size="sm"
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    Chiqish
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to="/login">Kirish</Link>
                    </Button>
                    <Button asChild size="sm" className="w-full bg-gradient-primary">
                      <Link to="/register">Ro'yxatdan o'tish</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
