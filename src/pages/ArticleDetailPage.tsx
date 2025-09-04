import Navbar from '@/components/Navbar';

import Footer from '@/components/Footer';
import ArticleDetail from '@/components/ArticleDetail';

const ArticleDetailPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <ArticleDetail />
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
