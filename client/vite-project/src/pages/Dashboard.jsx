
import { Plus, Presentation, Search, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* HEADER */}

      <header className="dashboard-header">

        <div className="logo">

          <div className="logo-icon">
            <Presentation size={20} />
          </div>

          <span>
            SlideAI
          </span>

        </div>

        <div className="dashboard-actions">

          <div className="search-box">

            <Search size={18} />

            <input
              placeholder="Search presentations..."
            />

          </div>

          <button
            className="create-button"
            onClick={() => navigate("/create")}
          >
            <Plus size={18} />
            New Presentation
          </button>

        </div>

      </header>


      {/* CONTENT */}

      <main className="dashboard-content">

        <div className="dashboard-title">

          <div>

            <h1>
              My Presentations
            </h1>

            <p>
              Create and manage your presentations.
            </p>

          </div>

          <button
            className="create-button"
            onClick={() => navigate("/create")}
          >
            <Plus size={18} />
            Create Presentation
          </button>

        </div>


        {/* PRESENTATIONS */}

        <section className="presentation-grid">


          {/* PRESENTATION 1 */}

          <div className="presentation-card">

            <div className="presentation-preview">
              <span>
                AI
              </span>
            </div>

            <div className="presentation-info">

              <h3>
                Artificial Intelligence
              </h3>

              <p>
                Edited recently
              </p>

              <button
                className="open-editor-button"
                onClick={() => navigate("/editor")}
              >
                <Edit3 size={15} />
                Open Editor
              </button>

            </div>

          </div>


          {/* PRESENTATION 2 */}

          <div className="presentation-card">

            <div className="presentation-preview second">
              <span>
                ML
              </span>
            </div>

            <div className="presentation-info">

              <h3>
                Machine Learning
              </h3>

              <p>
                Edited recently
              </p>

              <button
                className="open-editor-button"
                onClick={() => navigate("/editor")}
              >
                <Edit3 size={15} />
                Open Editor
              </button>

            </div>

          </div>


          {/* NEW PRESENTATION */}

          <div
            className="new-card"
            onClick={() => navigate("/create")}
          >

            <Plus size={30} />

            <span>
              Create new presentation
            </span>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;

