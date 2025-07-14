
'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, subject: value });
  };

  const contactInfo = [
    { icon: Mail, title: "Email", content: "contato@achoulevaai.com.br", description: "Resposta em até 24h" },
    { icon: MessageCircle, title: "WhatsApp", content: "(11) 99999-9999", description: "Atendimento direto" },
    { icon: Clock, title: "Horário", content: "Seg - Sex: 9h às 18h", description: "Sáb: 9h às 14h" }
  ];

  return (
    <section id="contato" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Fale
            <span className="block text-primary">Conosco</span>
          </h2>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto leading-relaxed">
            Estamos aqui para ajudar você a encontrar o melhor para seu pet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="observe-fade-in opacity-0">
            <div className="bg-card rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6">Envie sua Mensagem</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" required />
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required />
                </div>
                <Select name="subject" value={formData.subject} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um assunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="produto">Dúvida sobre produto</SelectItem>
                    <SelectItem value="entrega">Informações de entrega</SelectItem>
                    <SelectItem value="sugestao">Sugestão de produto</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Como podemos ajudar você e seu pet?" required />
                <Button type="submit" className="w-full text-lg py-6 rounded-xl">
                  <Send size={20} />
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
          <div className="observe-fade-in opacity-0">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">{info.title}</h4>
                      <p className="text-primary font-medium mb-1">{info.content}</p>
                      <p className="text-secondary-foreground text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
