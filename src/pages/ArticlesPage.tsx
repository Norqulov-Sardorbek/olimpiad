import Navbar from '@/components/Navbar';
import ArticlesSection from '@/components/ArticlesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <ArticlesSection />
      <Footer />
    </div>
  );
};

export default Index;
