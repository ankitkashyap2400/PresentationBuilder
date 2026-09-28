import { useState } from "react";
import { Sparkles, X } from "lucide-react";

function AIGenerator({ onClose, onGenerate }) {
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState(8);
  const [tone, setTone] = useState("Professional");

  const handleGenerate = () => {
    if (!topic.trim()) {
      alert("Please enter a presentation topic.");
      return;
    }

    onGenerate({
      topic,
      slideCount,
      tone,
    });
  };

  return (
    <div className="ai-overlay">

      <div className="ai-modal">

        <div className="ai-modal-header">

          <div>
            <div className="ai-icon">
              <Sparkles size={20} />
            </div>

            <h2>Generate Presentation</h2>

            <p>
              Tell AI what you want to create.
            </p>
          </div>

          <button
            className="ai-close"
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>


        <div className="ai-form">

          <label>
            Presentation topic
          </label>

          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: The future of artificial intelligence..."
          />


          <label>
            Number of slides
          </label>

          <select
            value={slideCount}
            onChange={(e) =>
              setSlideCount(Number(e.target.value))
            }
          >
            <option value={5}>5 slides</option>
            <option value={8}>8 slides</option>
            <option value={10}>10 slides</option>
            <option value={15}>15 slides</option>
          </select>


          <label>
            Tone
          </label>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>Professional</option>
            <option>Creative</option>
            <option>Academic</option>
            <option>Minimal</option>
            <option>Persuasive</option>
          </select>


          <button
            className="ai-generate-button"
            onClick={handleGenerate}
          >
            <Sparkles size={18} />
            Generate Slides
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIGenerator;