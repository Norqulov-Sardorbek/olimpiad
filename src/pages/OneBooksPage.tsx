import Navbar from '@/components/Navbar';
import Book from '@/components/OneBookSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Book />
      <Footer />
    </div>
  );
};

export default Index;
