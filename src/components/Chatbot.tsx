
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Bot, User, Volume2, VolumeX, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente virtual para produtos pet. Como posso ajudar você hoje?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inicializar reconhecimento de voz
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'pt-BR';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        // Automatically send message after successful speech recognition
        handleSendMessage(transcript);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  // Auto scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Respostas do chatbot
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('ração') || message.includes('comida')) {
      return 'Temos excelentes opções de ração! Recomendo a Hill\'s Science Diet, que é premium e muito nutritiva. Também temos opções da Golden. Qual o porte do seu pet?';
    }
    
    if (message.includes('brinquedo') || message.includes('diversão')) {
      return 'Para brinquedos, temos várias opções! Bolas, cordas, brinquedos interativos... Seu pet prefere brinquedos para mastigar ou para correr?';
    }
    
    if (message.includes('higiene') || message.includes('banho') || message.includes('shampoo')) {
      return 'Para higiene, temos shampoos especiais, escovas e produtos de limpeza. O Shampoo Pet Clean Neutro é uma ótima opção. Precisa de algo específico?';
    }
    
    if (message.includes('gato') || message.includes('felino')) {
      return 'Para gatos, temos ração especial, brinquedos, arranhadores e muito mais! A ração da Hill\'s também tem linha para felinos. O que seu gatinho precisa?';
    }
    
    if (message.includes('cachorro') || message.includes('cão') || message.includes('dog')) {
      return 'Para cães, temos de tudo! Ração, brinquedos, coleiras, produtos de higiene... Qual o porte e idade do seu cachorro?';
    }
    
    if (message.includes('preço') || message.includes('valor') || message.includes('quanto')) {
      return 'Os preços variam conforme o produto. Todos nossos itens têm descontos especiais! Clique nos produtos para ver os valores atualizados na Amazon.';
    }
    
    if (message.includes('entrega') || message.includes('frete')) {
      return 'A entrega é feita pela Amazon, com opções de frete grátis para Prime. Os prazos variam conforme sua localização. Confira na página do produto!';
    }
    
    if (message.includes('obrigado') || message.includes('valeu')) {
      return 'Por nada! Fico feliz em ajudar. Se precisar de mais alguma coisa sobre produtos pet, é só chamar! 🐾';
    }
    
    return 'Interessante! Posso ajudar você a encontrar produtos para seu pet. Temos ração, brinquedos, produtos de higiene e muito mais. O que você está procurando?';
  };

  // Função para falar texto
  const speakText = (text: string) => {
    if ('speechSynthesis' in window && !isSpeaking) {
      const synthesis = window.speechSynthesis;
      synthesis.cancel(); // Cancela qualquer fala anterior
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthesis.speak(utterance);
    }
  };

  // Parar fala
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Iniciar reconhecimento de voz
  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  // Parar reconhecimento de voz
  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Enviar mensagem
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      speakText(botResponse);
    }, 1000);

    setInputText('');
  };

  const sendMessage = () => {
      handleSendMessage(inputText);
  }

  // Enviar com Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
      >
        <Bot size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-2xl border z-50 flex flex-col transition-all duration-300 h-[28rem]">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">Assistente Pet</span>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={isSpeaking ? stopSpeaking : () => speakText(messages[messages.length - 1].text)}
                className={`p-1.5 rounded-full ${isSpeaking ? 'bg-red-500 animate-pulse' : 'hover:bg-blue-500'}`}
                aria-label={isSpeaking ? 'Parar leitura' : 'Ler última mensagem'}
              >
                {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-1 rounded-full"
                aria-label="Fechar chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && <Bot className="w-6 h-6 p-1 bg-gray-200 text-gray-600 rounded-full flex-shrink-0" />}
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    message.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                 {message.isUser && <User className="w-6 h-6 p-1 bg-blue-200 text-blue-800 rounded-full flex-shrink-0" />}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-2 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
                 aria-label={isListening ? 'Parar de ouvir' : 'Ouvir mensagem'}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                 aria-label="Enviar mensagem"
              >
                <Send size={20} />
              </button>
            </div>
            {isListening && (
              <p className="text-xs text-center text-red-500 mt-1 animate-pulse">
                Ouvindo...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
