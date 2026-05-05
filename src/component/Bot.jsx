
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FaUserCircle } from 'react-icons/fa'
function Bot() {
    const [messages,setMessages]=useState([])
    const [input,setInput]=useState("")
    const [loading,setLoading]=useState(false)
    const messagesEndRef=useRef(null)

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[messages])

    const handleSendMessage = async () => {
        setLoading(true);
        if(!input.trim()) return;
        try {
           const res=await axios.post("http://localhost:4002/bot/v1/message",{
                text: input
            })
            if(res.status === 200) {
                setMessages([...messages, { text: res.data.userMessage, sender: 'user' }, { text: res.data.botMessage, sender: 'bot' }]);
               
            }
            console.log(res.data)
        } catch (error) {
            console.log("Error sending message:", error);
        }
         setInput("");
            setLoading(false);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage()}

  return (
    <div className='flex flex-col min-h-screen bg-[#171515] text-white'>
         {/* Navbar & Header */}
      <header className="fixed top-0 left-0 z-10 w-full border-b border-gray-800 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto ">
          <h1 className="text-lg font-bold">BotSpoofMessage</h1>
          <FaUserCircle size={30} className="cursor-pointer" />
        </div>
      </header>

      {/* Chat area */}
      <main className="flex items-center justify-center flex-1 pt-20 pb-24 overflow-y-auto">
        <div className="flex flex-col w-full max-w-4xl px-4 mx-auto space-y-3">
          {messages.length === 0 ? (
            // Centered welcome message
            <div className="text-lg text-center text-gray-400">
              👋 Hi, I'm{" "}
              <span className="font-semibold text-green-500">BotSpoofMessage</span>.
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white self-end"
                      : "bg-gray-800 text-gray-100 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl max-w-[60%] self-start">
                  Bot is typing...
                </div>
              )}
           <div ref={messagesEndRef}/>
            </>
          )}
        </div>
      </main>

      {/* Input & Footer */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d] z-10">
        <div className="flex justify-center max-w-4xl px-4 py-3 mx-auto">
          <div className="flex w-full px-4 py-2 bg-gray-900 rounded-full shadow-lg">
            <input
              type="text"
              className="flex-1 px-2 text-white placeholder-gray-400 bg-transparent outline-none"
              placeholder="Ask BotSpoof..."
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={handleKeyPress}
            />
            <button
             onClick={handleSendMessage}
              className="px-4 py-1 font-medium text-white transition-colors bg-green-600 rounded-full hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Bot