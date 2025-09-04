import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, MessageCircle, Lightbulb, Calculator, BookOpen } from 'lucide-react';

const AISection = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatHistory = [
    {
      id: 1,
      type: 'ai',
      message: 'Assalomu alaykum! Men sizning matematik AI yordamchingizman. Qanday matematik savol yoki masala bo\'yicha yordam kerak?',
      time: '10:30'
    },
    {
      id: 2,
      type: 'user',
      message: 'Kvadrat tenglamaning diskriminanti nima?',
      time: '10:31'
    },
    {
      id: 3,
      type: 'ai',
      message: 'Kvadrat tenglamaning diskriminanti - bu ax² + bx + c = 0 ko\'rinishidagi tenglamaning yechimi mavjudligini va nechta yechimi borligini aniqlash uchun ishlatiladigan formula. Diskriminant D = b² - 4ac formula bilan hisoblanadi.',
      time: '10:31'
    },
  ];

  const quickQuestions = [
    {
      icon: Calculator,
      question: 'Trigonometriya formulalari',
      category: 'Geometriya'
    },
    {
      icon: BookOpen,
      question: 'Logarifm xossalari',
      category: 'Algebra'
    },
    {
      icon: Lightbulb,
      question: 'Kombinatorika masalalari',
      category: 'Ehtimollar'
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to chat
      setIsTyping(true);
      // Simulate AI response delay
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      setMessage('');
    }
  };

  return (
    <section id="ai" className="py-20 mt-20">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-glow">
              <Bot className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            AI Matematik Yordamchisi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sun'iy intellekt bilan matematik masalalaringizni yeching. 
            Savol bering, tushuntirish oling va bilimingizni oshiring.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          
          {/* Quick Questions */}
          <div className="mb-12 animate-fade-in-up">
            <h3 className="text-xl font-semibold mb-6 text-center">Tez-tez so'raladigan savollar:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {quickQuestions.map((item, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-medium border-2 hover:border-primary/20 bg-gradient-card"
                >
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">{item.question}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <Card className="animate-fade-in-up shadow-large border-2 border-primary/10">
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
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto mb-4 p-4 bg-muted/30 rounded-lg space-y-4">
                {chatHistory.map((chat) => (
                  <div 
                    key={chat.id} 
                    className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-8' 
                        : 'bg-background border shadow-soft mr-8'
                    }`}>
                      <p className="text-sm leading-relaxed">{chat.message}</p>
                      <p className={`text-xs mt-2 ${
                        chat.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {chat.time}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-background border shadow-soft p-4 rounded-lg mr-8">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
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
              
              <p className="text-xs text-muted-foreground mt-3 text-center">
                AI yordamchisi matematik masalalar va tushuntirishlar bo'yicha yordam beradi
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AISection;