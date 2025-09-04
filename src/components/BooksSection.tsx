import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Eye, Download, BookOpen } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL;

const BooksSection = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/books/get_all_books/`);
        if (!res.ok) throw new Error("Kitoblarni yuklab bo‘lmadi");
        const data = await res.json();
        setBooks(data); // 🔑 API dan kelgan kitoblar
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section id="books" className="py-20 mt-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Matematik Kitoblar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eng yaxshi matematik kitoblar to'plami. Olimpiadaga tayyorgarlik uchun
            professional mualliflarning asarlarini o'qing.
          </p>
        </div>

        {/* Agar yuklanayotgan bo‘lsa */}
        {loading && <p className="text-center">Yuklanmoqda...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {books.map((book) => (
            <Card
              key={book.id}
              className="group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-large border-2 hover:border-primary/20 bg-gradient-card overflow-hidden"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {book.category}
                  </Badge>
                  <Badge
                    variant={
                      book.level === "easy"
                        ? "default"
                        : book.level === "medium"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {book.level == "easy" && "Oson"}
                    {book.level == "medium" && "O'rtacha"}
                    {book.level == "hard" && "Qiyin"}
                  </Badge>
                </div>

                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                  {book.title}
                </CardTitle>

                <p className="text-sm text-muted-foreground mb-2">
                {book.description.length > 48
                  ? book.description.slice(0, 48) + "..."
                  : book.description}
              </p>


                <p className="text-sm font-medium text-accent">{book.author}</p>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>{book.pages} sahifa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-success" />
                    <span>{book.downloads}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <a href={`books/${book.id}`}>
                    <Button className="w-full bg-gradient-primary hover:shadow-glow group-hover:scale-105 transition-all">
                      <Eye className="w-4 h-4 mr-2" />
                      Kitobni o'qish
                    </Button>
                  </a>
                  <Button
                    onClick={() => window.open(BASE_URL + book.book, "_blank")}
                    variant="outline"
                    className="w-full text-xs"
                     // 🔽 pdf_url API dan kelsa
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Yuklab olish (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {books.length > 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8 hover:bg-primary/5">
              Barcha kitoblarni ko'rish
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
