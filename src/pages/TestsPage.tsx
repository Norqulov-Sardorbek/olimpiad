import Navbar from '@/components/Navbar';
import TestsSection from '@/components/TestsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <TestsSection />
      <Footer />
    </div>
  );
};

export default Index;
