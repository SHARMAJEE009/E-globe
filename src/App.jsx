// import React, { useState, useEffect, useRef } from 'react';
// import Sidebar from './components/Sidebar';
// import ChatArea from './components/ChatArea';
// import ChatInput from './components/ChatInput';
// import Login from './components/Login';
// import { Menu, Radio, Hotel, Mic, MicOff, X, Power, Zap, Brain } from 'lucide-react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const IMG_IDLE = "/robot-idle.png";
// const IMG_LISTENING = "/robot-listening.png";
// const IMG_THINKING = "/robot-thinking.png";
// const IMG_SPEAKING = "/robot-speaking.png";

// // ==============================================
// // 🌟 REALISTIC AVATAR COMPONENT
// // ==============================================
// const RealisticAiAvatar = ({ status, onClick }) => {
//   const isSpeaking = status === 'Speaking...';
//   const isProcessing = status.includes('Processing');
//   const isListening = status === 'Listening...';
//   const isIdle = !isSpeaking && !isProcessing && !isListening;

//   return (
//     <div className="relative w-full h-full flex flex-col items-center justify-start overflow-hidden bg-white cursor-pointer group" onClick={onClick}>
//       <div className="absolute top-4 z-[200] flex flex-col items-center gap-2 w-full px-4">
//         <div className={`px-5 py-2 rounded-full border-2 backdrop-blur-xl text-[11px] font-bold tracking-widest uppercase shadow-sm flex items-center justify-center gap-2 transition-all duration-500 ${
//           isListening ? 'bg-red-50/90 border-red-500 text-red-600 animate-pulse' :
//           isProcessing ? 'bg-blue-50/90 border-blue-500 text-blue-600 animate-pulse' :
//           isSpeaking ? 'bg-emerald-50/90 border-emerald-500 text-emerald-600' :
//           'bg-slate-50/90 border-slate-300 text-slate-400'
//         }`}>
//           {isListening ? <Mic size={14} /> : isProcessing ? <Brain size={14} className="animate-spin-slow" /> : isSpeaking ? <Zap size={14} /> : <Power size={14} />}
//           <span className="truncate max-w-[180px]">{status}</span>
//         </div>
//       </div>

//       <div className="relative z-0 w-full h-full flex items-center justify-center pb-10">
//         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full blur-[70px] transition-all duration-700 z-0 pointer-events-none ${
//           isListening ? 'bg-red-600 opacity-40 scale-110' : isSpeaking ? 'bg-emerald-600 opacity-20 scale-100' : isProcessing ? 'bg-blue-600 opacity-20 scale-100' : 'bg-transparent'
//         }`}></div>

//         <img src={IMG_IDLE}      alt="AI Idle"      className={`absolute w-full h-[85%] object-contain object-bottom transition-opacity duration-500 ease-in-out z-10 ${isIdle      ? 'opacity-100' : 'opacity-0'}`} />
//         <img src={IMG_LISTENING} alt="AI Listening" className={`absolute w-full h-[85%] object-contain object-bottom transition-opacity duration-500 ease-in-out z-10 ${isListening ? 'opacity-100' : 'opacity-0'}`} />
//         <img src={IMG_THINKING}  alt="AI Thinking"  className={`absolute w-full h-[85%] object-contain object-bottom transition-opacity duration-500 ease-in-out z-10 ${isProcessing? 'opacity-100' : 'opacity-0'}`} />
//         <img src={IMG_SPEAKING}  alt="AI Speaking"  className={`absolute w-full h-[85%] object-contain object-bottom transition-opacity duration-500 ease-in-out z-10 ${isSpeaking  ? 'opacity-100' : 'opacity-0'}`} />

//         <div className={`absolute top-[18%] left-1/2 -translate-x-1/2 z-20 w-32 h-24 bg-blue-500/60 blur-2xl rounded-full animate-pulse pointer-events-none transition-opacity duration-300 ${isProcessing ? 'opacity-100' : 'opacity-0'}`}></div>

//         <div className={`absolute top-[60%] left-1/2 -translate-x-1/2 z-[100] flex items-center justify-center gap-1.5 transition-all duration-300 ${isSpeaking ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
//           <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-6 animate-[eq_0.4s_ease-in-out_infinite_alternate]"></div>
//           <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-10 animate-[eq_0.2s_ease-in-out_infinite_alternate]"></div>
//           <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-7 animate-[eq_0.5s_ease-in-out_infinite_alternate]"></div>
//           <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-11 animate-[eq_0.3s_ease-in-out_infinite_alternate]"></div>
//           <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-5 animate-[eq_0.6s_ease-in-out_infinite_alternate]"></div>
//         </div>
//       </div>
//       <style>{`@keyframes eq { 0% { transform: scaleY(0.4); opacity: 0.7; } 100% { transform: scaleY(1.3); opacity: 1; } }`}</style>
//     </div>
//   );
// };

// // ==============================================
// // 🌟 MAIN APP COMPONENT
// // ==============================================
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState("");

//   const [activeChatId, setActiveChatId] = useState(Date.now());
//   const [chatHistory, setChatHistory] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);

//   const [speechModeOpen, setSpeechModeOpen] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState('Idle');
//   const [isMuted, setIsMuted] = useState(false);
//   const [isHandsFree, setIsHandsFree] = useState(true);

//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   const currentAudioRef = useRef(null);
//   const lastFetchedDataRef = useRef(null);
//   const speechModeOpenRef = useRef(false);

//   const isFetchingRef = useRef(false);
//   const fillerTimeoutRef = useRef(null);

//   // 🌟 N8N WEBHOOK URL
//   const N8N_WEBHOOK_URL = "https://n8n.srv982383.hstgr.cloud/webhook/501e8bff-1148-41f6-a391-059da0a91dd9";

//   // ==============================================
//   // ✅ FIX: Smart response extractor for N8N
//   // Handles ALL formats: array, object, plain string
//   // ==============================================
//   const extractTextFromResponse = (data) => {
//     if (!data) return "No response received.";

//     // Plain string
//     if (typeof data === "string") return data;

//     // Array format — N8N often wraps output in an array
//     if (Array.isArray(data)) {
//       const item = data[0];
//       if (!item) return "No response received.";
//       return (
//         item.text     ||
//         item.output   ||
//         item.message  ||
//         item.response ||
//         item.content  ||
//         item.answer   ||
//         item.reply    ||
//         JSON.stringify(item)
//       );
//     }

//     // Object format — try all common N8N output keys
//     return (
//       data.text     ||
//       data.output   ||
//       data.message  ||
//       data.response ||
//       data.content  ||
//       data.answer   ||
//       data.reply    ||
//       "No response received."
//     );
//   };

//   // ==============================================
//   // SPEECH HELPERS
//   // ==============================================
//   const safeStartListening = () => {
//     if (browserSupportsSpeechRecognition && !isMuted) {
//       SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
//     }
//   };
  
//   const safeStopListening = () => {
//     if (browserSupportsSpeechRecognition) {
//       SpeechRecognition.stopListening();
//     }
//   };

//   // ==============================================
//   // AUTH
//   // ==============================================
//   useEffect(() => {
//     const savedSession = localStorage.getItem('eglobe_active_session');
//     if (savedSession) {
//       setCurrentUser(JSON.parse(savedSession));
//       setIsLoggedIn(true);
//     }
//   }, []);

//   useEffect(() => {
//     setIsConnected(true);
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setCurrentUser(userData);
//     setIsLoggedIn(true);
//     localStorage.setItem('eglobe_active_session', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//     setSpeechModeOpen(false);
//     speechModeOpenRef.current = false;
//     setIsHandsFree(false);

//     isFetchingRef.current = false;
//     clearTimeout(fillerTimeoutRef.current);

//     safeStopListening();
//     if (currentAudioRef.current) currentAudioRef.current.pause();
//     window.speechSynthesis.cancel();
//     localStorage.removeItem('eglobe_active_session');
//   };

//   // ==============================================
//   // CHAT MANAGEMENT
//   // ==============================================
//   const createNewChat = () => {
//     if (currentMessages.length > 0) {
//       const title = currentMessages[0].text.substring(0, 25) + "...";
//       setChatHistory(prev => [{ id: activeChatId, title, messages: currentMessages }, ...prev.filter(c => c.id !== activeChatId)]);
//     }
//     setActiveChatId(Date.now());
//     setCurrentMessages([]);
//   };

//   const deleteChat = (chatId) => {
//     setChatHistory(prev => prev.filter(c => c.id !== chatId));
//     if (activeChatId === chatId) createNewChat();
//   };

//   const loadChat = (id) => {
//     if (currentMessages.length > 0) {
//       const title = currentMessages[0].text.substring(0, 25) + "...";
//       setChatHistory(prev => {
//         const existing = prev.find(c => c.id === activeChatId);
//         if (existing) return prev.map(c => c.id === activeChatId ? { ...c, messages: currentMessages } : c);
//         return [{ id: activeChatId, title, messages: currentMessages }, ...prev];
//       });
//     }
//     const chatToLoad = chatHistory.find(c => c.id === id);
//     if (chatToLoad) {
//       setActiveChatId(id);
//       setCurrentMessages(chatToLoad.messages);
//     }
//   };

//   // ==============================================
//   // 🎙️ VOICE & AI LOGIC
//   // ==============================================
//   const finishSpeakingAndListen = (onEndCallback, isFiller = false) => {
//     if (onEndCallback) onEndCallback();

//     if (isFiller) {
//       setVoiceStatus('Processing...');
//       safeStopListening();
//       return;
//     }

//     if (speechModeOpenRef.current && !isMuted) {
//       setVoiceStatus('Listening...');
//       resetTranscript();
//       safeStartListening();
//     } else if (isHandsFree && !isMuted) {
//       setVoiceStatus('Idle');
//       resetTranscript();
//       safeStartListening();
//     } else {
//       setVoiceStatus('Idle');
//     }
//   };

//   const speakTextVoiceMode = async (text, onEndCallback, isFiller = false) => {
//     safeStopListening();

//     const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/\*\*/g, '');
//     const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
//     const VOICE_ID = "ErXwobaYiN019PkySvjV";

//     if (currentAudioRef.current) {
//       currentAudioRef.current.pause();
//       currentAudioRef.current = null;
//     }

//     if (!ELEVENLABS_API_KEY) {
//       runFallbackTTS(cleanText, onEndCallback, isFiller);
//       return;
//     }

//     try {
//       setVoiceStatus('Processing Audio...');
//       const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?optimize_streaming_latency=3`, {
//         method: 'POST',
//         headers: { 'Accept': 'audio/mpeg', 'xi-api-key': ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           text: cleanText,
//           model_id: "eleven_multilingual_v2",
//           voice_settings: { stability: 0.45, similarity_boost: 0.85, style: 0.4, use_speaker_boost: true }
//         })
//       });
//       if (!response.ok) throw new Error("TTS Error");
//       const audioUrl = URL.createObjectURL(await response.blob());
//       const audio = new Audio(audioUrl);
//       currentAudioRef.current = audio;

//       audio.onplay = () => {
//         setVoiceStatus('Speaking...');
//         safeStopListening();
//       };
//       audio.onended = () => { finishSpeakingAndListen(onEndCallback, isFiller); };
//       audio.play().catch(() => { finishSpeakingAndListen(onEndCallback, isFiller); });

//     } catch (error) {
//       runFallbackTTS(cleanText, onEndCallback, isFiller);
//     }
//   };

//   const runFallbackTTS = (text, onEndCallback, isFiller = false) => {
//     safeStopListening();
//     setVoiceStatus('Speaking...');
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(text);
//       window.utterances = window.utterances || [];
//       window.utterances.push(utterance);
//       utterance.rate = 1.1;
//       utterance.onend = () => {
//         window.utterances = window.utterances.filter(u => u !== utterance);
//         finishSpeakingAndListen(onEndCallback, isFiller);
//       };
//       utterance.onerror = () => {
//         window.utterances = window.utterances.filter(u => u !== utterance);
//         finishSpeakingAndListen(onEndCallback, isFiller);
//       };
//       window.speechSynthesis.speak(utterance);
//     } else {
//       finishSpeakingAndListen(onEndCallback, isFiller);
//     }
//   };

//   useEffect(() => {
//     if (isMuted || !isLoggedIn) {
//       safeStopListening();
//       return;
//     }
//     if (isFetchingRef.current) {
//       safeStopListening();
//       return;
//     }
//     if (voiceStatus === 'Idle' || voiceStatus === 'Listening...') {
//       if (speechModeOpen || isHandsFree) {
//         safeStartListening();
//       } else {
//         safeStopListening();
//       }
//     } else {
//       safeStopListening();
//     }
//   }, [isMuted, voiceStatus, isLoggedIn, speechModeOpen, isHandsFree, browserSupportsSpeechRecognition]);

//   useEffect(() => {
//     if (!transcript) return;
//     const lowerTrans = transcript.toLowerCase().trim();

//     if (!speechModeOpenRef.current && isHandsFree) {
//       if (lowerTrans.includes('hey eglobe') || lowerTrans.includes('hii globe') || lowerTrans.includes('hello robot') || lowerTrans.includes('hey iglobe')) {
//         safeStopListening();
//         speechModeOpenRef.current = true;
//         setSpeechModeOpen(true);
//         setSidebarOpen(false);
//         resetTranscript();
//         speakTextVoiceMode("Yes, I am listening. How can I help?", null, false);
//       }
//       return;
//     }

//     if (speechModeOpenRef.current && voiceStatus === 'Listening...') {
//       if (['thank you', 'stop', 'close', 'exit', 'nothing', 'no', 'never mind', 'never'].some(w => lowerTrans.includes(w))) {
//         safeStopListening();
//         speakTextVoiceMode("You're welcome. Going back to sleep mode.", () => {
//           speechModeOpenRef.current = false;
//           setSpeechModeOpen(false);
//           setSidebarOpen(true);
//           setVoiceStatus('Idle');
//           resetTranscript();
//         }, false);
//         return;
//       }

//       if (lastFetchedDataRef.current && ['explain', 'read', 'yes', 'batao'].some(w => lowerTrans.includes(w))) {
//         safeStopListening();
//         const textToRead = lastFetchedDataRef.current;
//         lastFetchedDataRef.current = null;
//         resetTranscript();
//         speakTextVoiceMode(textToRead, null, false);
//         return;
//       }

//       if (lastFetchedDataRef.current && ['no', 'next', 'skip', 'leave it'].some(w => lowerTrans.includes(w))) {
//         safeStopListening();
//         lastFetchedDataRef.current = null;
//         resetTranscript();
//         speakTextVoiceMode("Alright, what is your next query?", null, false);
//         return;
//       }

//       const timeoutId = setTimeout(() => {
//         if (transcript.trim().length > 2) {
//           safeStopListening();
//           processVoicePanelCommand(transcript);
//         }
//       }, 1200);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [transcript, voiceStatus, isHandsFree]);

//   const processVoicePanelCommand = async (text) => {
//     setVoiceStatus('Processing...');
//     resetTranscript();

//     const updatedMessages = [...currentMessages, { role: 'user', text: text }];
//     setCurrentMessages(updatedMessages);

//     isFetchingRef.current = true;
//     let fillerIndex = 0;

//     const fillerPhrases = [
//       "Give me a moment to analyze the business data...",
//       "Fetching the latest records, please hold on...",
//       "Correlating the information...",
//       "Still processing your request, almost done...",
//       "Putting the final insights together for you..."
//     ];

//     const playNextFiller = () => {
//       if (!isFetchingRef.current || fillerIndex >= fillerPhrases.length) return;
//       speakTextVoiceMode(fillerPhrases[fillerIndex], () => {
//         if (isFetchingRef.current) {
//           fillerTimeoutRef.current = setTimeout(playNextFiller, 5000);
//         }
//       }, true);
//       fillerIndex++;
//     };

//     playNextFiller();

//     try {
//       const response = await fetch(N8N_WEBHOOK_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: text,
//           messages: updatedMessages.map(m => ({
//             role: m.role,
//             text: m.text.replace(/<br\/>/g, '\n').replace(/<strong>|<\/strong>/g, '')
//           }))
//         })
//       });

//       if (!response.ok) throw new Error("HTTP error from Webhook");

//       const data = await response.json();

//       // ✅ FIX: Smart extractor handles array, object, and string formats
//       isFetchingRef.current = false;
//       clearTimeout(fillerTimeoutRef.current);

//       let rawText = extractTextFromResponse(data);
//       let formattedText = rawText
//         .replace(/\n/g, '<br/>')
//         .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

//       setCurrentMessages(prev => [...prev, {
//         role: 'assistant',
//         text: formattedText,
//         citations: data.citations,
//         follow_up: data.follow_up,
//         tableData: data.tableData,
//         vegaChart: data.vegaChart
//       }]);

//       lastFetchedDataRef.current = rawText;

//       let cleanDataText = rawText.replace(/<[^>]*>?/gm, '').replace(/[*#]/g, '').trim();
//       let sentences = cleanDataText.split(/(?<=[.!?])\s+/);
//       let initialReadout = sentences.slice(0, 2).join(' ');
//       if (!initialReadout) initialReadout = cleanDataText.substring(0, 150);

//       let finalSpeech = `${initialReadout} Would you like me to explain further, or should we move to the next query?`;
//       speakTextVoiceMode(finalSpeech, null, false);

//     } catch (error) {
//       isFetchingRef.current = false;
//       clearTimeout(fillerTimeoutRef.current);
//       console.error("Webhook Error:", error);
//       speakTextVoiceMode("I had a problem connecting to the data source. Please check your setup.", null, false);
//     }
//   };

//   // ==============================================
//   // 💬 TEXT CHAT HANDLER
//   // ==============================================
//   const handleSendMessage = async (text) => {
//     const updatedMessages = [...currentMessages, { role: 'user', text: text }];
//     setCurrentMessages(updatedMessages);

//     setIsLoading(true);
//     setLoadingMessage("Analyzing data...");

//     try {
//       const response = await fetch(N8N_WEBHOOK_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: text,
//           messages: updatedMessages.map(m => ({
//             role: m.role,
//             text: m.text.replace(/<br\/>/g, '\n').replace(/<strong>|<\/strong>/g, '')
//           }))
//         })
//       });

//       if (!response.ok) throw new Error("HTTP error from Webhook");

//       const data = await response.json();

//       // ✅ FIX: Smart extractor handles array, object, and string formats
//       const rawText = extractTextFromResponse(data);
//       let formattedText = rawText
//         .replace(/\n/g, '<br/>')
//         .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

//       setCurrentMessages(prev => [...prev, {
//         role: 'assistant',
//         text: formattedText,
//         citations: data.citations,
//         follow_up: data.follow_up,
//         tableData: data.tableData,
//         vegaChart: data.vegaChart
//       }]);

//     } catch (error) {
//       console.error("Webhook Error:", error);
//       setCurrentMessages(prev => [...prev, { role: 'assistant', text: "Connection error. Please try again." }]);
//     } finally {
//       setIsLoading(false);
//       setLoadingMessage("");
//     }
//   };

//   useEffect(() => {
//     if (!speechModeOpen) {
//       setVoiceStatus('Idle');
//       window.speechSynthesis.cancel();
//       if (currentAudioRef.current) currentAudioRef.current.pause();
//     }
//   }, [speechModeOpen]);

//   // ==============================================
//   // 🔐 AUTH GATE
//   // ==============================================
//   if (!isLoggedIn) {
//     return <Login onLogin={handleLoginSuccess} />;
//   }

//   // ==============================================
//   // 🖥️ RENDER
//   // ==============================================
//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-50 relative">

//       {/* SIDEBAR */}
//       <div className={`fixed md:relative z-40 h-full shrink-0 transition-all duration-300 ease-in-out bg-white overflow-hidden ${sidebarOpen ? 'w-[280px] border-r border-slate-200' : 'w-0 border-r-0'}`}>
//         <div className="w-[280px] h-full relative">
//           {sidebarOpen && speechModeOpen && (
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="absolute top-1 right-1 z-[9999] p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center"
//               title="Close Sidebar"
//             >
//               <X size={18} strokeWidth={2.5} />
//             </button>
//           )}
//           <Sidebar
//             chatHistory={chatHistory}
//             createNewChat={createNewChat}
//             loadChat={loadChat}
//             deleteChat={deleteChat}
//             currentUser={currentUser}
//             onLogout={handleLogout}
//           />
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className={`flex-1 flex flex-col h-full relative transition-all duration-300 ease-in-out ${speechModeOpen ? 'mr-[320px] sm:mr-[400px]' : 'mr-0'}`}>

//         {/* HEADER */}
//         <header className="h-[64px] border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 bg-white shadow-sm z-10">
//           <div className="flex items-center gap-4">
//             {!sidebarOpen && (
//               <button
//                 className="text-slate-500 hover:text-blue-600 hover:bg-slate-100 p-2 rounded-lg transition-all"
//                 onClick={() => setSidebarOpen(true)}
//                 title="Show Sidebar"
//               >
//                 <Menu size={24} />
//               </button>
//             )}
//             <div className="flex items-center gap-3 font-bold text-slate-800 tracking-tight transition-all">
//               <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100 shadow-inner">
//                 <Hotel size={20} className="text-blue-600" />
//               </div>
//               <span className="text-lg hidden sm:block">eGlobe Grand Suites</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 sm:gap-5">
//             {/* Connection status */}
//             <div className={`hidden lg:flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${isConnected ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
//               <Radio size={14} className={isConnected ? "animate-pulse" : ""} />
//               <span>{isConnected ? "Connected" : "Disconnected"}</span>
//             </div>

//             {/* Hands-Free toggle */}
//             <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-5">
//               <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:block">
//                 Hands-Free
//               </span>
//               <button
//                 onClick={() => {
//                   const nextState = !isHandsFree;
//                   setIsHandsFree(nextState);
//                   if (!nextState) safeStopListening();
//                 }}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isHandsFree ? 'bg-blue-600 shadow-inner' : 'bg-slate-300'}`}
//                 title="Enable Wake Word (Hey eGlobe)"
//               >
//                 <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isHandsFree ? 'translate-x-6' : 'translate-x-1'}`} />
//               </button>
//             </div>

//             {/* Voice Mode button */}
//             <button
//               onClick={() => {
//                 speechModeOpenRef.current = true;
//                 setSpeechModeOpen(true);
//                 setSidebarOpen(false);
//                 setVoiceStatus('Listening...');
//                 resetTranscript();
//               }}
//               className="group flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-sm font-bold text-slate-700 hover:text-blue-600"
//             >
//               <div className="flex items-center gap-0.5 h-4">
//                 <div className={`w-1 bg-blue-500 rounded-full transition-all ${isHandsFree ? 'h-full animate-[bounce_1s_infinite]' : 'h-1.5 group-hover:h-3'}`}></div>
//                 <div className={`w-1 bg-blue-500 rounded-full transition-all ${isHandsFree ? 'h-2/4 animate-[bounce_0.8s_infinite]' : 'h-3 group-hover:h-full'}`}></div>
//                 <div className={`w-1 bg-blue-500 rounded-full transition-all ${isHandsFree ? 'h-full animate-[bounce_1.2s_infinite]' : 'h-2 group-hover:h-2.5'}`}></div>
//               </div>
//               <span className="hidden md:inline">Voice Mode</span>
//             </button>
//           </div>
//         </header>

//         <ChatArea messages={currentMessages} isLoading={isLoading} onFollowUpClick={handleSendMessage} />

//         <ChatInput
//           onSend={handleSendMessage}
//           disabled={isLoading || !isConnected}
//           isHandsFree={isHandsFree}
//           onMicClick={() => {
//             speechModeOpenRef.current = true;
//             setSpeechModeOpen(true);
//             setSidebarOpen(false);
//             setVoiceStatus('Listening...');
//             resetTranscript();
//           }}
//         />

//         {sidebarOpen && (
//           <div
//             className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 transition-opacity"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}
//       </div>

//       {/* VOICE PANEL */}
//       <div className={`fixed top-0 right-0 h-full w-[320px] sm:w-[400px] bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-500 ease-out flex flex-col ${speechModeOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className="absolute top-6 right-6 z-[9999] flex gap-3">
//           <button
//             onClick={() => setIsMuted(!isMuted)}
//             className={`p-3 rounded-full transition-all shadow-xl backdrop-blur-md cursor-pointer border ${isMuted ? 'bg-red-500 text-white border-red-600 animate-pulse' : 'bg-white/90 text-slate-500 hover:bg-blue-50 hover:text-blue-600 border-slate-200'}`}
//             title={isMuted ? "Unmute Mic" : "Mute Mic"}
//           >
//             {isMuted ? <MicOff size={24} strokeWidth={2} /> : <Mic size={24} strokeWidth={2} />}
//           </button>
//           <button
//             onClick={() => {
//               speechModeOpenRef.current = false;
//               setSpeechModeOpen(false);
//               setSidebarOpen(true);
//               setVoiceStatus('Idle');
//               resetTranscript();
//             }}
//             className="p-3 rounded-full bg-white/90 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all shadow-xl backdrop-blur-md cursor-pointer border border-slate-200"
//           >
//             <X size={24} strokeWidth={2.5} />
//           </button>
//         </div>

//         <div className="flex-1 relative w-full h-full">
//           <RealisticAiAvatar status={isMuted ? 'Muted' : voiceStatus} onClick={() => {}} />
//         </div>

//         <div className={`absolute bottom-10 left-6 right-6 z-50 px-5 py-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl text-center shadow-2xl border border-white/20 transition-all duration-300 ${speechModeOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
//           <p className="text-[15px] text-white font-medium leading-relaxed tracking-wide flex flex-col items-center justify-center min-h-[24px]">
//             {transcript ? (
//               `"${transcript}"`
//             ) : voiceStatus === 'Listening...' && !isMuted ? (
//               <span className="text-slate-400 italic flex items-center gap-2"><Mic size={14} className="animate-pulse text-red-400" /> Listening...</span>
//             ) : voiceStatus === 'Speaking...' ? (
//               <span className="text-emerald-400 italic flex items-center gap-2"><Zap size={14} className="animate-pulse" /> Speaking...</span>
//             ) : voiceStatus.includes('Processing') ? (
//               <span className="text-blue-400 italic flex items-center gap-2"><Brain size={14} className="animate-pulse" /> Processing...</span>
//             ) : (
//               <span className="text-slate-500 text-xs">Waiting for voice input...</span>
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




//------------------------------------------------------------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import Login from './components/Login';
import { Radio, Hotel, Mic, MicOff, X, Power, Zap, Brain } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const IMG_IDLE = "/robot-idle.png";
const IMG_LISTENING = "/robot-listening.png";
const IMG_THINKING = "/robot-thinking.png";
const IMG_SPEAKING = "/robot-speaking.png";

// ==============================================
// 🌟 REALISTIC AVATAR COMPONENT
// ==============================================
const RealisticAiAvatar = ({ status, onClick }) => {
  const isSpeaking = status === 'Speaking...';
  const isProcessing = status.includes('Processing');
  const isListening = status === 'Listening...';
  const isIdle = !isSpeaking && !isProcessing && !isListening;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start overflow-hidden bg-white cursor-pointer group" onClick={onClick}>
      <div className="absolute top-4 z-[200] flex flex-col items-center gap-2 w-full px-4">
        <div className={`px-5 py-2 rounded-full border-2 backdrop-blur-xl text-[11px] font-bold tracking-widest uppercase shadow-sm flex items-center justify-center gap-2 transition-all duration-500 ${
          isListening ? 'bg-red-50/90 border-red-500 text-red-600 animate-pulse' :
          isProcessing ? 'bg-blue-50/90 border-blue-500 text-blue-600 animate-pulse' :
          isSpeaking ? 'bg-emerald-50/90 border-emerald-500 text-emerald-600' :
          'bg-slate-50/90 border-slate-300 text-slate-400'
        }`}>
          {isListening ? <Mic size={14} /> : isProcessing ? <Brain size={14} className="animate-spin-slow" /> : isSpeaking ? <Zap size={14} /> : <Power size={14} />}
          <span className="truncate max-w-[180px]">{status}</span>
        </div>
      </div>

      <div className="relative z-0 w-full h-full flex items-center justify-center pb-10">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full blur-[70px] transition-all duration-700 z-0 pointer-events-none ${
          isListening ? 'bg-red-600 opacity-40 scale-110' : isSpeaking ? 'bg-emerald-600 opacity-20 scale-100' : isProcessing ? 'bg-blue-600 opacity-20 scale-100' : 'bg-transparent'
        }`}></div>

        <img src={IMG_IDLE}      alt="AI Idle"      className={`absolute w-full h-[85%] object-contain object-bottom transition-opacity duration-500 ease-in-out z-10 ${isIdle      ? 'opacity-100' : 'opacity-0'}`} />
        <img src={IMG_LISTENING} alt="AI Listening" className={`absolute w-full h-[85%] object-contain object-bottom transition-opacity duration-500 ease-in-out z-10 ${isListening ? 'opacity-100' : 'opacity-0'}`} />
        <img src={IMG_THINKING}  alt="AI Thinking"  className={`absolute w-full h-[85%] object-contain object-bottom transition-opacity duration-500 ease-in-out z-10 ${isProcessing? 'opacity-100' : 'opacity-0'}`} />
        <img src={IMG_SPEAKING}  alt="AI Speaking"  className={`absolute w-full h-[85%] object-contain object-bottom transition-opacity duration-500 ease-in-out z-10 ${isSpeaking  ? 'opacity-100' : 'opacity-0'}`} />

        <div className={`absolute top-[18%] left-1/2 -translate-x-1/2 z-20 w-32 h-24 bg-blue-500/60 blur-2xl rounded-full animate-pulse pointer-events-none transition-opacity duration-300 ${isProcessing ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className={`absolute top-[60%] left-1/2 -translate-x-1/2 z-[100] flex items-center justify-center gap-1.5 transition-all duration-300 ${isSpeaking ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
          <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-6 animate-[eq_0.4s_ease-in-out_infinite_alternate]"></div>
          <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-10 animate-[eq_0.2s_ease-in-out_infinite_alternate]"></div>
          <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-7 animate-[eq_0.5s_ease-in-out_infinite_alternate]"></div>
          <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-11 animate-[eq_0.3s_ease-in-out_infinite_alternate]"></div>
          <div className="w-1.5 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-full h-5 animate-[eq_0.6s_ease-in-out_infinite_alternate]"></div>
        </div>
      </div>
      <style>{`@keyframes eq { 0% { transform: scaleY(0.4); opacity: 0.7; } 100% { transform: scaleY(1.3); opacity: 1; } }`}</style>
    </div>
  );
};

// ==============================================
// 🌟 MAIN APP COMPONENT
// ==============================================
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [currentMessages, setCurrentMessages] = useState([]);

  const [speechModeOpen, setSpeechModeOpen] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isHandsFree, setIsHandsFree] = useState(true);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const currentAudioRef = useRef(null);
  const lastFetchedDataRef = useRef(null);
  const speechModeOpenRef = useRef(false);

  const isFetchingRef = useRef(false);
  const fillerTimeoutRef = useRef(null);

  // 🌟 N8N WEBHOOK URL
  const N8N_WEBHOOK_URL = "https://n8n.srv982383.hstgr.cloud/webhook/501e8bff-1148-41f6-a391-059da0a91dd9";

  const extractTextFromResponse = (data) => {
    if (!data) return "No response received.";
    if (typeof data === "string") return data;
    if (Array.isArray(data)) {
      const item = data[0];
      if (!item) return "No response received.";
      return (
        item.text     ||
        item.output   ||
        item.message  ||
        item.response ||
        item.content  ||
        item.answer   ||
        item.reply    ||
        JSON.stringify(item)
      );
    }
    return (
      data.text     ||
      data.output   ||
      data.message  ||
      data.response ||
      data.content  ||
      data.answer   ||
      data.reply    ||
      "No response received."
    );
  };

  // ==============================================
  // SPEECH HELPERS
  // ==============================================
  const safeStartListening = () => {
    if (browserSupportsSpeechRecognition && !isMuted) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }
  };

  const safeStopListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.stopListening();
    }
  };

  // ==============================================
  // AUTH
  // ==============================================
  useEffect(() => {
    const savedSession = localStorage.getItem('eglobe_active_session');
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setIsConnected(true);
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('eglobe_active_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSpeechModeOpen(false);
    speechModeOpenRef.current = false;
    setIsHandsFree(false);

    isFetchingRef.current = false;
    clearTimeout(fillerTimeoutRef.current);

    safeStopListening();
    if (currentAudioRef.current) currentAudioRef.current.pause();
    window.speechSynthesis.cancel();
    localStorage.removeItem('eglobe_active_session');
  };

  // ==============================================
  // 🎙️ VOICE & AI LOGIC
  // ==============================================
  const finishSpeakingAndListen = (onEndCallback, isFiller = false) => {
    if (onEndCallback) onEndCallback();

    if (isFiller) {
      setVoiceStatus('Processing...');
      safeStopListening();
      return;
    }

    if (speechModeOpenRef.current && !isMuted) {
      setVoiceStatus('Listening...');
      resetTranscript();
      safeStartListening();
    } else if (isHandsFree && !isMuted) {
      setVoiceStatus('Idle');
      resetTranscript();
      safeStartListening();
    } else {
      setVoiceStatus('Idle');
    }
  };

  const speakTextVoiceMode = async (text, onEndCallback, isFiller = false) => {
    safeStopListening();

    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/\*\*/g, '');
    const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
    const VOICE_ID = "ErXwobaYiN019PkySvjV";

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    if (!ELEVENLABS_API_KEY) {
      runFallbackTTS(cleanText, onEndCallback, isFiller);
      return;
    }

    try {
      setVoiceStatus('Processing Audio...');
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?optimize_streaming_latency=3`, {
        method: 'POST',
        headers: { 'Accept': 'audio/mpeg', 'xi-api-key': ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.45, similarity_boost: 0.85, style: 0.4, use_speaker_boost: true }
        })
      });
      if (!response.ok) throw new Error("TTS Error");
      const audioUrl = URL.createObjectURL(await response.blob());
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      audio.onplay = () => {
        setVoiceStatus('Speaking...');
        safeStopListening();
      };
      audio.onended = () => { finishSpeakingAndListen(onEndCallback, isFiller); };
      audio.play().catch(() => { finishSpeakingAndListen(onEndCallback, isFiller); });

    } catch (error) {
      runFallbackTTS(cleanText, onEndCallback, isFiller);
    }
  };

  const runFallbackTTS = (text, onEndCallback, isFiller = false) => {
    safeStopListening();
    setVoiceStatus('Speaking...');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.utterances = window.utterances || [];
      window.utterances.push(utterance);
      utterance.rate = 1.1;
      utterance.onend = () => {
        window.utterances = window.utterances.filter(u => u !== utterance);
        finishSpeakingAndListen(onEndCallback, isFiller);
      };
      utterance.onerror = () => {
        window.utterances = window.utterances.filter(u => u !== utterance);
        finishSpeakingAndListen(onEndCallback, isFiller);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      finishSpeakingAndListen(onEndCallback, isFiller);
    }
  };

  useEffect(() => {
    if (isMuted || !isLoggedIn) {
      safeStopListening();
      return;
    }
    if (isFetchingRef.current) {
      safeStopListening();
      return;
    }
    if (voiceStatus === 'Idle' || voiceStatus === 'Listening...') {
      if (speechModeOpen || isHandsFree) {
        safeStartListening();
      } else {
        safeStopListening();
      }
    } else {
      safeStopListening();
    }
  }, [isMuted, voiceStatus, isLoggedIn, speechModeOpen, isHandsFree, browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (!transcript) return;
    const lowerTrans = transcript.toLowerCase().trim();

    if (!speechModeOpenRef.current && isHandsFree) {
      if (lowerTrans.includes('hey eglobe') || lowerTrans.includes('hii globe') || lowerTrans.includes('hello robot') || lowerTrans.includes('hey iglobe')) {
        safeStopListening();
        speechModeOpenRef.current = true;
        setSpeechModeOpen(true);
        resetTranscript();
        speakTextVoiceMode("Yes, I am listening. How can I help?", null, false);
      }
      return;
    }

    if (speechModeOpenRef.current && voiceStatus === 'Listening...') {
      if (['thank you', 'stop', 'close', 'exit', 'nothing', 'no', 'never mind', 'never'].some(w => lowerTrans.includes(w))) {
        safeStopListening();
        speakTextVoiceMode("You're welcome. Going back to sleep mode.", () => {
          speechModeOpenRef.current = false;
          setSpeechModeOpen(false);
          setVoiceStatus('Idle');
          resetTranscript();
        }, false);
        return;
      }

      if (lastFetchedDataRef.current && ['explain', 'read', 'yes', 'batao'].some(w => lowerTrans.includes(w))) {
        safeStopListening();
        const textToRead = lastFetchedDataRef.current;
        lastFetchedDataRef.current = null;
        resetTranscript();
        speakTextVoiceMode(textToRead, null, false);
        return;
      }

      if (lastFetchedDataRef.current && ['no', 'next', 'skip', 'leave it'].some(w => lowerTrans.includes(w))) {
        safeStopListening();
        lastFetchedDataRef.current = null;
        resetTranscript();
        speakTextVoiceMode("Alright, what is your next query?", null, false);
        return;
      }

      const timeoutId = setTimeout(() => {
        if (transcript.trim().length > 2) {
          safeStopListening();
          processVoicePanelCommand(transcript);
        }
      }, 1200);
      return () => clearTimeout(timeoutId);
    }
  }, [transcript, voiceStatus, isHandsFree]);

  const processVoicePanelCommand = async (text) => {
    setVoiceStatus('Processing...');
    resetTranscript();

    const updatedMessages = [...currentMessages, { role: 'user', text: text }];
    setCurrentMessages(updatedMessages);

    isFetchingRef.current = true;
    let fillerIndex = 0;

    const fillerPhrases = [
      "Give me a moment to analyze the business data...",
      "Fetching the latest records, please hold on...",
      "Correlating the information...",
      "Still processing your request, almost done...",
      "Putting the final insights together for you..."
    ];

    const playNextFiller = () => {
      if (!isFetchingRef.current || fillerIndex >= fillerPhrases.length) return;
      speakTextVoiceMode(fillerPhrases[fillerIndex], () => {
        if (isFetchingRef.current) {
          fillerTimeoutRef.current = setTimeout(playNextFiller, 5000);
        }
      }, true);
      fillerIndex++;
    };

    playNextFiller();

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          messages: updatedMessages.map(m => ({
            role: m.role,
            text: m.text.replace(/<br\/>/g, '\n').replace(/<strong>|<\/strong>/g, '')
          }))
        })
      });

      if (!response.ok) throw new Error("HTTP error from Webhook");

      const data = await response.json();

      isFetchingRef.current = false;
      clearTimeout(fillerTimeoutRef.current);

      let rawText = extractTextFromResponse(data);
      let formattedText = rawText
        .replace(/\n/g, '<br/>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      setCurrentMessages(prev => [...prev, {
        role: 'assistant',
        text: formattedText,
        citations: data.citations,
        follow_up: data.follow_up,
        tableData: data.tableData,
        vegaChart: data.vegaChart
      }]);

      lastFetchedDataRef.current = rawText;

      let cleanDataText = rawText.replace(/<[^>]*>?/gm, '').replace(/[*#]/g, '').trim();
      let sentences = cleanDataText.split(/(?<=[.!?])\s+/);
      let initialReadout = sentences.slice(0, 2).join(' ');
      if (!initialReadout) initialReadout = cleanDataText.substring(0, 150);

      let finalSpeech = `${initialReadout} Would you like me to explain further, or should we move to the next query?`;
      speakTextVoiceMode(finalSpeech, null, false);

    } catch (error) {
      isFetchingRef.current = false;
      clearTimeout(fillerTimeoutRef.current);
      console.error("Webhook Error:", error);
      speakTextVoiceMode("I had a problem connecting to the data source. Please check your setup.", null, false);
    }
  };

  // ==============================================
  // 💬 TEXT CHAT HANDLER
  // ==============================================
  const handleSendMessage = async (text) => {
    const updatedMessages = [...currentMessages, { role: 'user', text: text }];
    setCurrentMessages(updatedMessages);

    setIsLoading(true);
    setLoadingMessage("Analyzing data...");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          messages: updatedMessages.map(m => ({
            role: m.role,
            text: m.text.replace(/<br\/>/g, '\n').replace(/<strong>|<\/strong>/g, '')
          }))
        })
      });

      if (!response.ok) throw new Error("HTTP error from Webhook");

      const data = await response.json();

      const rawText = extractTextFromResponse(data);
      let formattedText = rawText
        .replace(/\n/g, '<br/>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      setCurrentMessages(prev => [...prev, {
        role: 'assistant',
        text: formattedText,
        citations: data.citations,
        follow_up: data.follow_up,
        tableData: data.tableData,
        vegaChart: data.vegaChart
      }]);

    } catch (error) {
      console.error("Webhook Error:", error);
      setCurrentMessages(prev => [...prev, { role: 'assistant', text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    if (!speechModeOpen) {
      setVoiceStatus('Idle');
      window.speechSynthesis.cancel();
      if (currentAudioRef.current) currentAudioRef.current.pause();
    }
  }, [speechModeOpen]);

  // ==============================================
  // 🔐 AUTH GATE
  // ==============================================
  if (!isLoggedIn) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  // ==============================================
  // 🖥️ RENDER
  // ==============================================
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 relative">

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col h-full relative transition-all duration-300 ease-in-out ${speechModeOpen ? 'mr-[320px] sm:mr-[400px]' : 'mr-0'}`}>

        {/* HEADER */}
        <header className="h-[64px] border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 bg-white shadow-sm z-10">
          <div className="flex items-center gap-3 font-bold text-slate-800 tracking-tight">
            <div className="p-1.5 bg-blue-50 rounded-lg border border-blue-100 shadow-inner">
              <Hotel size={20} className="text-blue-600" />
            </div>
            <span className="text-lg hidden sm:block">eGlobe Grand Suites</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Connection status */}
            <div className={`hidden lg:flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${isConnected ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
              <Radio size={14} className={isConnected ? "animate-pulse" : ""} />
              <span>{isConnected ? "Connected" : "Disconnected"}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-full border border-slate-200 transition-all"
            >
              Logout
            </button>

            {/* Hands-Free toggle */}
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-5">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:block">
                Hands-Free
              </span>
              <button
                onClick={() => {
                  const nextState = !isHandsFree;
                  setIsHandsFree(nextState);
                  if (!nextState) safeStopListening();
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isHandsFree ? 'bg-blue-600 shadow-inner' : 'bg-slate-300'}`}
                title="Enable Wake Word (Hey eGlobe)"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isHandsFree ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* Voice Mode button */}
            <button
              onClick={() => {
                speechModeOpenRef.current = true;
                setSpeechModeOpen(true);
                setVoiceStatus('Listening...');
                resetTranscript();
              }}
              className="group flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-sm font-bold text-slate-700 hover:text-blue-600"
            >
              <div className="flex items-center gap-0.5 h-4">
                <div className={`w-1 bg-blue-500 rounded-full transition-all ${isHandsFree ? 'h-full animate-[bounce_1s_infinite]' : 'h-1.5 group-hover:h-3'}`}></div>
                <div className={`w-1 bg-blue-500 rounded-full transition-all ${isHandsFree ? 'h-2/4 animate-[bounce_0.8s_infinite]' : 'h-3 group-hover:h-full'}`}></div>
                <div className={`w-1 bg-blue-500 rounded-full transition-all ${isHandsFree ? 'h-full animate-[bounce_1.2s_infinite]' : 'h-2 group-hover:h-2.5'}`}></div>
              </div>
              <span className="hidden md:inline">Voice Mode</span>
            </button>
          </div>
        </header>

        <ChatArea messages={currentMessages} isLoading={isLoading} onFollowUpClick={handleSendMessage} />

        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading || !isConnected}
          isHandsFree={isHandsFree}
          onMicClick={() => {
            speechModeOpenRef.current = true;
            setSpeechModeOpen(true);
            setVoiceStatus('Listening...');
            resetTranscript();
          }}
        />
      </div>

      {/* VOICE PANEL */}
      <div className={`fixed top-0 right-0 h-full w-[320px] sm:w-[400px] bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-500 ease-out flex flex-col ${speechModeOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-6 right-6 z-[9999] flex gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full transition-all shadow-xl backdrop-blur-md cursor-pointer border ${isMuted ? 'bg-red-500 text-white border-red-600 animate-pulse' : 'bg-white/90 text-slate-500 hover:bg-blue-50 hover:text-blue-600 border-slate-200'}`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMuted ? <MicOff size={24} strokeWidth={2} /> : <Mic size={24} strokeWidth={2} />}
          </button>
          <button
            onClick={() => {
              speechModeOpenRef.current = false;
              setSpeechModeOpen(false);
              setVoiceStatus('Idle');
              resetTranscript();
            }}
            className="p-3 rounded-full bg-white/90 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all shadow-xl backdrop-blur-md cursor-pointer border border-slate-200"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 relative w-full h-full">
          <RealisticAiAvatar status={isMuted ? 'Muted' : voiceStatus} onClick={() => {}} />
        </div>

        <div className={`absolute bottom-10 left-6 right-6 z-50 px-5 py-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl text-center shadow-2xl border border-white/20 transition-all duration-300 ${speechModeOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <p className="text-[15px] text-white font-medium leading-relaxed tracking-wide flex flex-col items-center justify-center min-h-[24px]">
            {transcript ? (
              `"${transcript}"`
            ) : voiceStatus === 'Listening...' && !isMuted ? (
              <span className="text-slate-400 italic flex items-center gap-2"><Mic size={14} className="animate-pulse text-red-400" /> Listening...</span>
            ) : voiceStatus === 'Speaking...' ? (
              <span className="text-emerald-400 italic flex items-center gap-2"><Zap size={14} className="animate-pulse" /> Speaking...</span>
            ) : voiceStatus.includes('Processing') ? (
              <span className="text-blue-400 italic flex items-center gap-2"><Brain size={14} className="animate-pulse" /> Processing...</span>
            ) : (
              <span className="text-slate-500 text-xs">Waiting for voice input...</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;