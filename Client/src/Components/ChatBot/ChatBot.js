import React, { useState, useRef, useEffect } from "react";

const questions = [
  { id: 1, text: "Opening hours?" },
  { id: 2, text: "Vegetarian options?" },
  { id: 3, text: "Services?" },
  { id: 4, text: "Location?" },
  { id: 5, text: "Delivery options?" },
  { id: 6, text: "Special offers?" },
  { id: 7, text: "Chef registration?" },
  { id: 8, text: "Popular dishes?" },
];

const answers = {
  1: "We are open from 11:00 AM to 11:00 PM, seven days a week.",
  2: "Yes, we offer a variety of delicious vegetarian dishes.",
  3: "We provide professional chef services and home-made food delivery.",
  4: "We are located in Peshawar and Islamabad, Pakistan.",
  5: "We offer home delivery within a 10km radius of our locations.",
  6: "Check our website for current special offers and promotions.",
  7: "Professional chefs can register on our platform to offer their services.",
  8: "Our most popular dishes include biryani, karahi, and kebabs.",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleQuestionClick = (id) => {
    const question = questions.find((q) => q.id === id);
    setMessages((prev) => [
      ...prev,
      { type: "user", text: question.text },
      { type: "bot", text: answers[id] },
    ]);
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { type: "user", text: inputValue }]);
      setInputValue("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Thank you for your message. A staff member will respond to your query soon.",
          },
        ]);
      }, 500);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed-bottom right-0 mb-4 mr-4" style={{ zIndex: 1000 }}>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="btn rounded-circle shadow-lg"
          style={{
            width: "60px",
            height: "60px",
            fontSize: "24px",
            backgroundColor: "#D4AF37",
            color: "#1E1E1E",
            border: "none",
            marginLeft: "10px"
          }}
        >
          💬
        </button>
      )}
      {isOpen && (
        <div
          className="card shadow-lg"
          style={{
            width: "370px",
            height: "650px",
            border: "none",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#1E1E1E",
            marginLeft: "10px"
          }}
        >
          <div
            className="card-header py-3"
            style={{ backgroundColor: "#D4AF37", borderBottom: "none" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5
                className="mb-0 font-weight-bold"
                style={{ color: "#1E1E1E" }}
              >
                KHANSAMA CHAT
              </h5>
              <button
                type="button"
                className="close"
                onClick={toggleChat}
                style={{ color: "#1E1E1E" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div
            className="card-body d-flex flex-column p-0"
            style={{ backgroundColor: "#1E1E1E" }}
          >
            <div
              ref={chatContainerRef}
              className="flex-grow-1 overflow-auto p-3"
              style={{ fontSize: "16px", color: "white" }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex ${
                    msg.type === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      msg.type === "user" ? "bg-dark" : "bg-secondary"
                    }`}
                    style={{ maxWidth: "80%", color: "white" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3" style={{ backgroundColor: "#2A2A2A" }}>
              <div
                className="d-flex flex-wrap justify-content-between mb-2"
                style={{ gap: "5px" }}
              >
                {questions.map((q) => (
                  <button
                    key={q.id}
                    className="btn"
                    onClick={() => handleQuestionClick(q.id)}
                    style={{
                      fontSize: "16px",
                      color: "#D4AF37",
                      border: "1px solid #D4AF37",
                      backgroundColor: "transparent",
                      borderRadius: "20px",
                      padding: "5px 10px",
                      margin: "2px",
                      flexBasis: "calc(50% - 10px)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {q.text}
                  </button>
                ))}
              </div>
              <form
                onSubmit={handleInputSubmit}
                className="input-group"
                style={{
                  backgroundColor: "#1E1E1E",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: "#1E1E1E",
                    color: "white",
                    border: "none",
                    borderRadius: "20px 0 0 20px",
                    paddingLeft: "15px",
                  }}
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#D4AF37",
                      color: "#1E1E1E",
                      borderRadius: "0 20px 20px 0",
                      padding: "0 15px",
                    }}
                  >
                    ➤
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
