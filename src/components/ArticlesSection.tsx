import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Eye, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_API_URL

type Article = {
  id: number
  title: string
  content?: string
  pdf_file?: string
  author?: string
  published_date: string
  view_count: number
  category: string
}

const getReadingTime = (text: string, wordsPerMinute = 200): number => {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

const truncateText = (text: string, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

const ArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${BASE_URL}/articles/all/`)
        const data = await res.json()
        setArticles(data)
      } catch (error) {
        console.error("Maqolalarni olishda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  if (loading) {
    return (
      <section id="articles" className="py-20 bg-muted/30 mt-20 text-center">
        <p>Yuklanmoqda...</p>
      </section>
    )
  }

  return (
    <section id="articles" className="py-20 bg-muted/30 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            Maqolalar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Matematik ta'lim, olimpiada tayyorgarligi va eng so‘nggi yangiliklar 
            haqida professional maqolalar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const previewText = article.content
              ? truncateText(article.content, 100)
              : "(PDF fayl) - to‘liq ko‘rish uchun oching"
            const readTime = article.content
              ? getReadingTime(article.content)
              : 3 // PDF bo‘lsa taxminiy 3 daqiqa

            return (
              <Card 
                key={article.id} 
                className="group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-large border-2 hover:border-primary/20 bg-gradient-card overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      <span>{article.view_count}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors mb-3">
                    {article.title}
                  </CardTitle>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {previewText}
                  </p>
                </CardHeader>
                
                <CardContent>
                  {article.author ? (
                    <>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.published_date).toLocaleDateString("uz-UZ")}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-muted-foreground">
                          {readTime} daqiqa o‘qish
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.published_date).toLocaleDateString("uz-UZ")}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {readTime} daqiqa o‘qish
                      </span>
                    </div>
                  )}
                  
                  <Link to={`/articles/${article.id}`}>
                    <Button className="w-full bg-gradient-primary hover:shadow-glow group-hover:scale-105 transition-all">
                      O‘qishni davom ettirish
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ArticlesSection
