import React, { useState, useEffect, useRef } from 'react';
import { Compass, Send, Download, Share2, Check, Bookmark, Mic } from 'lucide-react';
import jsPDF from 'jspdf';
import { INITIAL_CHAT } from '../data/mockData.jsx';
import { renderFormattedText } from '../utils/renderFormattedText.jsx';
import { sendChatMessage, saveItinerary } from '../services/api';

const exportItineraryToPDF = (text) => {
  const doc = new jsPDF();
  const marginLeft = 15;
  const marginTop = 20;
  const maxWidth = 180;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('MyCapePlanner - Trip Itinerary', marginLeft, marginTop);

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');

  const cleanText = text.replace(/\*\*/g, '');
  const lines = doc.splitTextToSize(cleanText, maxWidth);

  let cursorY = marginTop + 12;
  lines.forEach((line) => {
    if (cursorY > pageHeight - 20) {
      doc.addPage();
      cursorY = marginTop;
    }
    doc.text(line, marginLeft, cursorY);
    cursorY += lineHeight;
  });

  doc.save(`cape-itinerary-${Date.now()}.pdf`);
};

const ChatScreen = ({ savedTrips, setSavedTrips }) => {
  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Voice input is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;

    const originalText = inputText;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setInputText((originalText ? originalText + ' ' : '') + currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleExportPDF = (text) => {
    try {
      exportItineraryToPDF(text);
      showToast('PDF downloaded!');
    } catch (err) {
      console.error('PDF export error:', err);
      showToast('Could not generate PDF.');
    }
  };

  const handleShare = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Itinerary copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy text.');
    }
    document.body.removeChild(textArea);
  };

  const isSaved = (msg) => savedTrips.some((t) => t.clientId === msg.id);

  const handleSave = async (msg) => {
    if (isSaved(msg)) return;
    setSavingId(msg.id);
    try {
      const saved = await saveItinerary({ text: msg.text, isItinerary: !!msg.isItinerary });
      setSavedTrips((prev) => [...prev, { ...saved, clientId: msg.id }]);
      showToast('Saved to My Itineraries!');
    } catch (err) {
      console.error('Save itinerary error:', err);
      showToast('Failed to save. Please try again.');
    } finally {
      setSavingId(null);
    }
  };

  const handleSend = async (text = inputText) => {
    if (!text.trim()) return;

    const newUserMsg = { id: Date.now(), type: 'user', text };
    const newMessages = [...messages.filter((m) => !m.options), newUserMsg];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    try {
      const chatHistory = newMessages
        .filter((m) => m.text)
        .map((m) => ({
          role: m.type === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      const botText = await sendChatMessage({ chatHistory });
      const isItinerary = botText.includes('MyCapePlanner') || botText.includes('Trip Summary');

      setMessages((prev) => [...prev, { id: Date.now(), type: 'bot', text: botText, isItinerary }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: 'bot', text: 'My connection dropped for a second! Could you repeat that?' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF6F1] flex-1 relative">
      <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#146B71]/10 rounded-full flex items-center justify-center">
            <Compass size={24} color="#146B71" />
          </div>
          <h2 className="font-bold text-lg">Cape Companion AI Chatbot</h2>
        </div>
      </div>

      {toast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-[#146B71] text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2">
            <Check size={18} />
            {toast}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-8 pt-8 pb-32 hide-scrollbar">
        <div className="max-w-4xl mx-auto w-full">
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-6 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-[#146B71]/10 flex items-center justify-center mr-4 shrink-0 mt-2">
                  <Compass size={20} color="#146B71" />
                </div>
              )}

              <div className={`max-w-[85%] flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.text && (
                  <div
                    className={`p-6 rounded-3xl shadow-sm ${
                      msg.type === 'user'
                        ? 'bg-[#E8734A] text-white rounded-br-sm'
                        : 'bg-white text-[#2D2A26] rounded-bl-sm border border-gray-100'
                    }`}
                  >
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{renderFormattedText(msg.text)}</div>

                    {msg.isItinerary && (
                      <div className="mt-6 pt-5 border-t border-gray-100/20 flex gap-3 flex-wrap">
                        <button
                          onClick={() => handleExportPDF(msg.text)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-[#146B71]/10 text-[#146B71] hover:bg-[#146B71] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm"
                        >
                          <Download size={18} />
                          Download PDF
                        </button>
                        <button
                          onClick={() => handleShare(msg.text)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-[#E8734A]/10 text-[#E8734A] hover:bg-[#E8734A] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm"
                        >
                          <Share2 size={18} />
                          Share
                        </button>
                        <button
                          onClick={() => handleSave(msg)}
                          disabled={isSaved(msg) || savingId === msg.id}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                            isSaved(msg)
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-[#2D2A26] border border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <Bookmark size={18} className={isSaved(msg) ? 'fill-gray-400' : ''} />
                          {savingId === msg.id ? 'Saving...' : isSaved(msg) ? 'Saved' : 'Save Trip'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {msg.component === 'quickReplies' && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(opt)}
                        className="px-5 py-2.5 bg-white border border-[#146B71]/30 text-[#146B71] hover:bg-[#146B71] hover:text-white rounded-full text-sm font-bold transition-colors shadow-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {msg.time && <span className="text-xs text-gray-400 mt-2 px-1 block">{msg.time}</span>}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-6">
              <div className="w-10 h-10 rounded-full bg-[#146B71]/10 flex items-center justify-center mr-4 shrink-0 mt-2">
                <Compass size={20} color="#146B71" />
              </div>
              <div className="bg-white p-5 rounded-3xl rounded-bl-sm border border-gray-100 flex items-center gap-2 h-14 shadow-sm">
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-8 py-6 bg-gradient-to-t from-[#FAF6F1] via-[#FAF6F1] to-transparent">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white p-2.5 rounded-2xl shadow-md border border-gray-100">
          <button
            onClick={handleMicClick}
            className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all ${
              isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
            title="Dictate message"
          >
            <Mic size={20} />
          </button>
          <input
            type="text"
            placeholder={isListening ? 'Listening...' : 'E.g., I have R500 and 6 hours...'}
            className="flex-1 bg-transparent border-none outline-none px-4 text-base placeholder-gray-400"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
            className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all ${
              inputText.trim() && !isTyping ? 'bg-[#E8734A] text-white shadow-md hover:bg-[#d66239]' : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Send size={20} className={inputText.trim() && !isTyping ? 'ml-1' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
