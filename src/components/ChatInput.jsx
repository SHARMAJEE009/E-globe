import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ChatInput = ({ onSend, disabled, isHandsFree }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null); 

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // 🌟 FIX 1: TEXT DICTATION LOGIC - Sirf tab type hoga jab Hands-Free OFF ho aur manual mic ON ho
  useEffect(() => {
    if (!isHandsFree && listening && transcript) {
      setInput(transcript);
    }
  }, [transcript, listening, isHandsFree]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
      resetTranscript();
      SpeechRecognition.stopListening(); // Send hone ke baad mic auto-off
      
      if (textareaRef.current) {
        textareaRef.current.style.height = '52px';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Manual Chat Dictation Toggle
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      // Yahan continuous: true rakha hai taaki lamba sentence bhi type ho sake bina ruke
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "52px"; 
    e.target.style.height = `${e.target.scrollHeight}px`; 
  };

  return (
    <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 bg-white p-4">
      <div className="max-w-4xl mx-auto relative flex items-center">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask Aquila AI..."
          rows={1}
          disabled={disabled}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-5 pr-24 text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all overflow-y-auto scrollbar-thin shadow-sm hover:border-slate-300"
          style={{ minHeight: '52px', maxHeight: '150px' }}
        />
        
        <div className="absolute right-2 flex items-center gap-1.5">
           
           {/* 🌟 FIX 2: CONDITIONAL MIC BUTTON - Hands-Free ON hone par ye button gayab ho jayega */}
           {browserSupportsSpeechRecognition && !isHandsFree && (
            <button
              onClick={toggleListening}
              disabled={disabled}
              className={`p-2.5 rounded-xl transition-all ${
                listening 
                  ? 'text-red-500 bg-red-50 shadow-inner' 
                  : 'text-slate-400 hover:bg-slate-100 hover:text-blue-600'
              }`}
              title={listening ? "Stop Voice Typing" : "Start Voice Typing"}
            >
              {listening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          )}

          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              !input.trim() || disabled 
                ? 'text-slate-300 bg-transparent' 
                : 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            <Send size={18} className={!input.trim() || disabled ? "" : "ml-0.5"} />
          </button>
        </div>
      </div>
      <div className="text-[11px] text-center font-medium text-slate-400 mt-3">
        Aquila Intelligence may produce inaccurate results. Please verify important business data.
      </div>
    </div>
  );
};

export default ChatInput;