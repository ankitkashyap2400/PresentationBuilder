import { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";


import AIGenerator from "../components/ai/AIGenerator";
import GenerationLoader from "../components/ai/GenerationLoader";
import "../styles/presentation.css";

function CreatePresentation() {
  const [slides, setSlides] = useState([
    {
      title: "The Future of Artificial Intelligence",
      content:
        "How AI is transforming businesses, industries, and everyday life.",
      layout: "title",
    },
    {
      title: "What is Artificial Intelligence?",
      content:
        "Artificial Intelligence enables machines to learn, reason, and make decisions.",
      layout: "content",
    },
    {
      title: "Applications of AI",
      content:
        "Healthcare • Finance • Education • Transportation • Customer Service",
      layout: "content",
    },
  ]);


  const [activeSlide, setActiveSlide] = useState(0);

  const [theme, setTheme] = useState("purple");

  const currentSlide = slides[activeSlide];
 const [showGenerator, setShowGenerator] = useState(false);
  /* UPDATE SLIDE */

  const updateSlide = (field, value) => {
    const updated = [...slides];

    updated[activeSlide] = {
      ...updated[activeSlide],
      [field]: value,
    };

    setSlides(updated);
  };

  /* ADD SLIDE */

  const addSlide = () => {
    const newSlide = {
      title: "New Slide",
      content: "Add your content here...",
      layout: "content",
    };

    setSlides([...slides, newSlide]);

    setActiveSlide(slides.length);
  };

  /* DUPLICATE */

  const duplicateSlide = () => {
    const copied = {
      ...currentSlide,
    };

    const updated = [...slides];

    updated.splice(activeSlide + 1, 0, copied);

    setSlides(updated);

    setActiveSlide(activeSlide + 1);
  };

  /* DELETE */

  const deleteSlide = () => {
    if (slides.length === 1) return;

    const updated = slides.filter(
      (_, index) => index !== activeSlide
    );

    setSlides(updated);

    setActiveSlide(
      Math.min(activeSlide, updated.length - 1)
    );
  };
  const handleAIGenerate = ({ topic, slideCount, tone }) => {
  setShowGenerator(false);
  setGenerating(true);

  setTimeout(() => {
    const generatedSlides = [
      {
        title: topic,
        content: `An overview of ${topic} and its importance in today's world.`,
        layout: "title",
      },
      {
        title: `Introduction to ${topic}`,
        content: `Understanding the fundamentals, concepts, and background of ${topic}.`,
        layout: "content",
      },
      {
        title: "Key Concepts",
        content: `Core concepts and important ideas related to ${topic}.`,
        layout: "content",
      },
      {
        title: "Applications",
        content: `Real-world applications and use cases of ${topic}.`,
        layout: "content",
      },
      {
        title: "Benefits",
        content: `Key benefits, opportunities, and advantages associated with ${topic}.`,
        layout: "center",
      },
      {
        title: "Challenges",
        content: `Important challenges, risks, and limitations to consider.`,
        layout: "content",
      },
      {
        title: "Future Outlook",
        content: `Emerging trends and the future direction of ${topic}.`,
        layout: "content",
      },
      {
        title: "Conclusion",
        content: `Key takeaways and final thoughts on ${topic}.`,
        layout: "center",
      },
    ];

    setSlides(generatedSlides.slice(0, slideCount));
    setActiveSlide(0);
    setGenerating(false);
  }, 2000);
};
  /* NAVIGATION */

  const nextSlide = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const previousSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  /* CHANGE LAYOUT */

  const changeLayout = (layout) => {
    updateSlide("layout", layout);
  };

  return (
    <div className={`presentation-page theme-${theme}`}>

      {/* HEADER */}

      <header className="presentation-header">

        <div className="presentation-logo">

          <div className="logo-box">
            AI
          </div>

          <span>SlideAI</span>

        </div>

        <div className="presentation-name">
          AI Presentation
        </div>

        <div className="presentation-actions">

          <button>
            Save
          </button>

          <button className="present-button">
            <Play size={16} />
            Present
          </button>

        </div>

      </header>


      {/* EDITOR */}

      <div className="presentation-editor">


        {/* SIDEBAR */}

        <aside className="presentation-sidebar">

          <div className="sidebar-header">

            <span>Slides</span>

            <button onClick={addSlide}>
              <Plus size={17} />
            </button>

          </div>


          <div className="slide-list">

            {slides.map((slide, index) => (

              <div
                key={index}
                className={
                  activeSlide === index
                    ? "presentation-thumbnail active"
                    : "presentation-thumbnail"
                }
                onClick={() => setActiveSlide(index)}
              >

                <span className="slide-index">
                  {index + 1}
                </span>

                <div className="thumbnail-preview">

                  <h4>
                    {slide.title}
                  </h4>

                  <p>
                    {slide.content}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </aside>


        {/* WORKSPACE */}

        <main className="presentation-workspace">


          
          
          
          
          
          
          
          
          
          
          
          
          
          

          <div className="workspace-toolbar">
  <button>Text</button>
  <button>Image</button>
  <button>Shape</button>
  <button>Theme</button>

  <button
    className="ai-toolbar-button"
    onClick={() => setShowGenerator(true)}
  >
    ✨ Generate with AI
  </button>
</div>
          {/* TOOLBAR */}

          

          
       

          

         

      


          {/* CANVAS */}

          <div className="presentation-canvas-container">

            <div
              className={`presentation-canvas layout-${currentSlide.layout}`}
            >

              <textarea
                className="presentation-title"
                value={currentSlide.title}
                onChange={(e) =>
                  updateSlide("title", e.target.value)
                }
              />

              <textarea
                className="presentation-content"
                value={currentSlide.content}
                onChange={(e) =>
                  updateSlide("content", e.target.value)
                }
              />

              <div className="canvas-decoration"></div>

            </div>

          </div>


          {/* FOOTER */}

          <div className="presentation-footer">

            <span>
              Slide {activeSlide + 1} / {slides.length}
            </span>

            <div className="slide-controls">

              <button onClick={previousSlide}>
                <ChevronLeft size={18} />
              </button>

              <button onClick={nextSlide}>
                <ChevronRight size={18} />
              </button>

              <button onClick={duplicateSlide}>
                <Copy size={16} />
              </button>

              <button onClick={deleteSlide}>
                <Trash2 size={16} />
              </button>

            </div>

          </div>

        </main>


        {/* DESIGN */}

        <aside className="presentation-design">

          <h3>
            Design
          </h3>


          {/* THEMES */}

          <div className="design-section">

            <h4>
              Theme
            </h4>

            <div className="theme-list">

              <button
                className="theme purple"
                onClick={() => setTheme("purple")}
              />

              <button
                className="theme blue"
                onClick={() => setTheme("blue")}
              />

              <button
                className="theme dark"
                onClick={() => setTheme("dark")}
              />

              <button
                className="theme green"
                onClick={() => setTheme("green")}
              />

            </div>

          </div>


          {/* LAYOUT */}

          <div className="design-section">

            <h4>
              Layout
            </h4>

            <div className="layout-list">

              <button
                onClick={() => changeLayout("title")}
              >
                Title Slide
              </button>

              <button
                onClick={() => changeLayout("content")}
              >
                Content
              </button>

              <button
                onClick={() => changeLayout("center")}
              >
                Centered
              </button>
       
            </div>
  
          </div>

        </aside>

      </div>
    </div>
  );
}

export default  CreatePresentation;