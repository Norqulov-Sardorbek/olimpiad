import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Bot, Send, MessageCircle } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL

const AISection = () => {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Chat tarixini olish
  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem('access')
      if (!token) {
        setShowLoginModal(true)
        return
      }

      const res = await fetch(`${BASE_URL}/aihelper/chat/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setChatHistory(data)
    } catch (err) {
      console.error('Tarixni olishda xatolik:', err)
    }
  }

  useEffect(() => {
    fetchChatHistory()
  }, [])

  // User message yuborish
  const handleSendMessage = async () => {
    if (!message.trim()) return

    const token = localStorage.getItem('access')
    if (!token) {
      setShowLoginModal(true)
      return
    }

    setIsTyping(true)
    try {
      const res = await fetch(`${BASE_URL}/aihelper/chat/with-ai/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
        }),
      })

      const data = await res.json()
      if (data.success) {
        await fetchChatHistory()
      }
    } catch (err) {
      console.error('Xabar yuborishda xatolik:', err)
    } finally {
      setIsTyping(false)
      setMessage('')
    }
  }

  return (
    <section id="ai" className="py-20 mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Chat Interface */}
          <Card className="shadow-large border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Bot className="w-6 h-6 text-primary" />
                <span>Matematik Suhbat</span>
                <Badge variant="secondary" className="ml-auto">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Faol
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-96 overflow-y-auto mb-4 p-4 bg-muted/30 rounded-lg space-y-4">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        chat.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-8'
                          : 'bg-background border shadow-soft mr-8'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{chat.message}</p>
                      <p
                        className={`text-xs mt-2 ${
                          chat.type === 'user'
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {new Date(chat.messaged_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-background border shadow-soft p-4 rounded-lg mr-8">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <Input
                  placeholder="Matematik savol yoki masalangizni yozing..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-primary hover:shadow-glow"
                  disabled={!message.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Modal */}
          {showLoginModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                <h3 className="text-lg font-semibold mb-4">Login talab qilinadi</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Chatdan foydalanish uchun iltimos, hisobingizga kiring.
                </p>
                <Button
                  onClick={() => {
                    setShowLoginModal(false)
                    window.location.href = '/login'
                  }}
                  className="bg-gradient-primary hover:shadow-glow w-full"
                >
                  Login qilish
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AISection
