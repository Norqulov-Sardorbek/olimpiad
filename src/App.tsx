import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter,Navigate, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tests from "./pages/TestsPage";
import Books from "./pages/BooksPage";
import Articles from "./pages/ArticlesPage";
import Ai from "./pages/Aihelper"
import NotFound from "./pages/NotFound";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import OneBookPage from "./pages/OneBooksPage";
import ArticleDetail from "./pages/ArticleDetailPage"


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Navigate to="/home" replace />} />
           <Route path="/books/:id" element={<OneBookPage />} />
           <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Index />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/books" element={<Books />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/ai" element={<Ai/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
