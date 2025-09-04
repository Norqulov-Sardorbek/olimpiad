import Navbar from '@/components/Navbar';
import BooksSection from '@/components/BooksSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      {/* <Hero /> */}
      <BooksSection />
      <Footer />
    </div>
  );
};

export default Index;
