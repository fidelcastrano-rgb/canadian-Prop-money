'use client';

import { MessageSquare } from 'lucide-react';

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/18437320661"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full py-3 px-5 shadow-lg flex items-center justify-center gap-2 transition hover:scale-105"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageSquare className="w-5 h-5 fill-current" />
      <span className="font-bold hidden md:inline">Chat with us</span>
    </a>
  );
}
