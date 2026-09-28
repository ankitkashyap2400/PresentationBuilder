import {
  ArrowRight,
  Sparkles,
  Presentation,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../styles/landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      <nav className="landing-nav">

        <div className="logo">
          <div className="logo-icon">
            <Presentation size={20} />
          </div>

          <span>SlideAI</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#templates">Templates</a>
          <a href="#pricing">Pricing</a>
        </div>

        <button
          className="nav-button"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </button>

      </nav>

      <main className="hero">

        <div className="hero-badge">
          <Sparkles size={16} />
          AI-powered presentation builder
        </div>

        <h1>
          Create stunning
          <span> presentations </span>
          with AI
        </h1>

        <p>
          Turn your ideas into professional presentations in seconds.
          Generate slides, edit content and customize your design effortlessly.
        </p>

        <div className="hero-actions">

          <button
            className="primary-button"
            onClick={() => navigate("/create")}
          >
            Create Presentation
            <ArrowRight size={18} />
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate("/templates")}
          >
            Explore Templates
          </button>

        </div>

        <div className="hero-preview">

          <div className="preview-sidebar">

            <div className="mini-slide active">
              01
            </div>

            <div className="mini-slide">
              02
            </div>

            <div className="mini-slide">
              03
            </div>

            <div className="mini-slide">
              04
            </div>

          </div>

          <div className="preview-content">

            <span className="preview-label">
              AI GENERATED
            </span>

            <h2>
              The Future of
              <br />
              Artificial Intelligence
            </h2>

            <p>
              Transforming industries through intelligent systems,
              automation and data-driven decisions.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Landing;