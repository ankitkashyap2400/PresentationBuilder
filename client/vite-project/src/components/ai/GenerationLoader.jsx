    import { Sparkles } from "lucide-react";

import "../../styles/generation.css";

function GenerationLoader() {
  return (
    <div className="generation-overlay">

      <div className="generation-box">

        <div className="generation-icon">
          <Sparkles size={28} />
        </div>

        <h2>Creating your presentation</h2>

        <p>
          AI is generating your slides...
        </p>

        <div className="generation-loader">
          <div></div>
        </div>

        <div className="generation-steps">

          <div className="generation-step active">
            <span>✓</span>
            <p>Understanding your topic</p>
          </div>

          <div className="generation-step active">
            <span>✓</span>
            <p>Creating presentation outline</p>
          </div>

          <div className="generation-step">
            <span>•</span>
            <p>Designing slides</p>
          </div>

          <div className="generation-step">
            <span>•</span>
            <p>Finalizing presentation</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default GenerationLoader;