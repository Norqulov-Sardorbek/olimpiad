import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const BASE_URL = import.meta.env.VITE_API_URL

export default function BookPage() {
  const { id } = useParams()  // URL dan id olish
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${BASE_URL}/books/get_all_books/?id=${id}`)
        const data = await res.json()
        setBook(data[0])
      } catch (err) {
        console.error("Error fetching book:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  if (loading) return <p className="text-center p-4">Yuklanmoqda...</p>
  if (!book) return <p className="text-center p-4">Kitob topilmadi</p>

  return (
    <div className="max-w-5xl mx-auto p-6 mt-16">
      <Card className="overflow-hidden shadow-xl rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rasm to‘liq chiqishi uchun height olib tashlandi */}
          <img
            src={BASE_URL + book.image}
            alt={book.title}
            className="w-full h-full object-contain ml-2 mt-2 mb-2 rounded-l-2xl"
          />

          <div className="p-6 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2">{book.title}</CardTitle>
              <p className="text-lg text-muted-foreground">by {book.author}</p>
            </CardHeader>

            <CardContent className="space-y-3 mt-4 text-base">
              <p>
                <span className="font-semibold">📚 Kategoriya:</span> {book.category}
              </p>
              <p>
                <span className="font-semibold">📄 Sahifalar:</span> {book.pages}
              </p>
              <p>
                <span className="font-semibold">⬇️ Yuklamalar:</span> {book.downloads}
              </p>
              <p>
                <span className="font-semibold">⭐ Level:</span> {book.level}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                {book.description}
              </p>
            </CardContent>

            <div className="p-4 flex gap-4 mt-6">
              <Button asChild size="lg" className="px-6">
                <a href={BASE_URL + book.book} target="_blank" rel="noopener noreferrer">
                  Open PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
