import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Presentation,
  Sparkles,
} from "lucide-react";

import "../styles/templates.css";

const templates = [
  {
    id: 1,
    title: "Modern Business",
    category: "Business",
    description: "Clean and professional business presentations.",
    color: "purple",
  },
  {
    id: 2,
    title: "Startup Pitch",
    category: "Pitch Deck",
    description: "Designed for startup ideas and investor pitches.",
    color: "blue",
  },
  {
    id: 3,
    title: "Education",
    category: "Education",
    description: "Simple layouts for classes and learning.",
    color: "green",
  },
  {
    id: 4,
    title: "Dark Professional",
    category: "Business",
    description: "Elegant dark presentation for professional use.",
    color: "dark",
  },
  {
    id: 5,
    title: "Minimal",
    category: "General",
    description: "Minimal design with clean typography.",
    color: "orange",
  },
  {
    id: 6,
    title: "Technology",
    category: "Technology",
    description: "Modern design for technology presentations.",
    color: "cyan",
  },
];

function Templates() {
  const navigate = useNavigate();

  const useTemplate = (template) => {
    navigate("/editor", {
      state: {
        template: template.title,
        category: template.category,
      },
    });
  };

  return (
    <div className="templates-page">

      {/* HEADER */}

      <header className="templates-header">

        <button
          className="templates-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="templates-logo">

          <div className="templates-logo-icon">
            <Presentation size={19} />
          </div>

          <span>SlideAI</span>

        </div>

        <div></div>

      </header>


      {/* MAIN */}

      <main className="templates-container">

        <div className="templates-heading">

          <div className="templates-heading-icon">
            <Sparkles size={23} />
          </div>

          <h1>Choose a template</h1>

          <p>
            Start with a professionally designed presentation
            and customize it to your needs.
          </p>

        </div>


        {/* FILTERS */}

        <div className="template-filters">

          <button className="filter active">
            All
          </button>

          <button className="filter">
            Business
          </button>

          <button className="filter">
            Education
          </button>

          <button className="filter">
            Pitch Deck
          </button>

          <button className="filter">
            Technology
          </button>

        </div>


        {/* TEMPLATE GRID */}

        <div className="templates-grid">

          {templates.map((template) => (

            <div
              className="template-item"
              key={template.id}
            >

              <div
                className={`template-large-preview ${template.color}`}
              >

                <div className="preview-line large"></div>

                <div className="preview-line medium"></div>

                <div className="preview-line small"></div>

                <div className="preview-circle"></div>

              </div>


              <div className="template-info">

                <div>

                  <h3>
                    {template.title}
                  </h3>

                  <span>
                    {template.category}
                  </span>

                  <p>
                    {template.description}
                  </p>

                </div>

                <button
                  onClick={() => useTemplate(template)}
                >
                  Use Template
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Templates;