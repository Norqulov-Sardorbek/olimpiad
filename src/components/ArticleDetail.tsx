import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

const BASE_URL = import.meta.env.VITE_API_URL

type Article = {
  id: number
  title: string
  content?: string
  pdf_file?: string
  author?: string
  published_date: string
}

const ArticleDetail = () => {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [numPages, setNumPages] = useState<number>()
  const [containerWidth, setContainerWidth] = useState<number>(window.innerWidth - 100)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${BASE_URL}/articles/all/?id=${id}`)
        const data = await res.json()
        setArticle(data[0])
      } catch (error) {
        console.error("Maqola olishda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth - 100)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (loading) return <p className="p-10 text-center">Yuklanmoqda...</p>
  if (!article) return <p className="p-10 text-center">Maqola topilmadi</p>

  return (
    <div className="container mt-20 mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
      {article.pdf_file ? (
        <Document
          file={`${BASE_URL}${article.pdf_file}`}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth}
            />
          ))}
        </Document>
      ) : (
        <p className="text-lg leading-relaxed whitespace-pre-line">
          {article.content}
        </p>
      )}
    </div>
  )
}

export default ArticleDetail
