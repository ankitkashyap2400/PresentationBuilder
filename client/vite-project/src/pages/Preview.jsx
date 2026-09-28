import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../styles/preview.css";

function Preview() {
  const navigate = useNavigate();

  const [presentation, setPresentation] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Load saved presentation
  useEffect(() => {
    try {
      const saved = localStorage.getItem("slideAI_presentation");

      if (!saved) {
        return;
      }

      const data = JSON.parse(saved);

      if (
        data.slides &&
        Array.isArray(data.slides) &&
        data.slides.length > 0
      ) {
        setPresentation(data);

        setActiveSlide(
          Math.min(
            data.activeSlide || 0,
            data.slides.length - 1
          )
        );
      }
    } catch (error) {
      console.error("Failed to load presentation:", error);
    }
  }, []);

  // No presentation
  if (!presentation) {
    return (
      <div className="preview-empty">
        <h2>No presentation found</h2>

        <p>
          Create or save a presentation first.
        </p>

        <button onClick={() => navigate("/editor")}>
          Open Editor
        </button>
      </div>
    );
  }

  const slides = presentation.slides;
  const slide = slides[activeSlide];

  // Previous slide
  const previousSlide = () => {
    setActiveSlide((current) =>
      Math.max(current - 1, 0)
    );
  };

  // Next slide
  const nextSlide = () => {
    setActiveSlide((current) =>
      Math.min(current + 1, slides.length - 1)
    );
  };

  // Start presentation mode
  const startPresentation = () => {
    setPresenting(true);
  };

  // Fullscreen
  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error(
        "Fullscreen failed:",
        error
      );
    }
  };

  // Download PDF
  const downloadPDF = async () => {
    if (!slides.length) {
      alert("No slides available.");
      return;
    }

    setDownloading(true);

    try {
      const originalSlide = activeSlide;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1280, 720],
      });

      for (let i = 0; i < slides.length; i++) {
        setActiveSlide(i);

        // Wait for React to render the slide
        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );

        const slideElement =
          document.querySelector(".preview-slide");

        if (!slideElement) {
          continue;
        }

        const canvas = await html2canvas(
          slideElement,
          {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
          }
        );

        const imageData =
          canvas.toDataURL("image/png", 1);

        if (i > 0) {
          pdf.addPage(
            [1280, 720],
            "landscape"
          );
        }

        pdf.addImage(
          imageData,
          "PNG",
          0,
          0,
          1280,
          720
        );
      }

      pdf.save("SlideAI-Presentation.pdf");

      setActiveSlide(
        Math.min(
          originalSlide,
          slides.length - 1
        )
      );
    } catch (error) {
      console.error(
        "PDF download failed:",
        error
      );

      alert(
        "Unable to download presentation."
      );
    } finally {
      setDownloading(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "ArrowLeft") {
        setActiveSlide((current) =>
          Math.max(current - 1, 0)
        );
      }

      if (event.key === "ArrowRight") {
        setActiveSlide((current) =>
          Math.min(
            current + 1,
            slides.length - 1
          )
        );
      }

      if (
        event.key === "Escape" &&
        presenting
      ) {
        setPresenting(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [slides.length, presenting]);

  // Presentation mode
  if (presenting) {
    return (
      <div
        className={`presentation-mode theme-${slide.theme}`}
      >
        <div className="presentation-slide">
          <div className="preview-decoration one" />

          <div className="preview-decoration two" />

          <h1
            style={{
              fontSize: `${
                slide.titleStyle?.fontSize ||
                34
              }px`,
              fontWeight:
                slide.titleStyle?.bold
                  ? 700
                  : 400,
              fontStyle:
                slide.titleStyle?.italic
                  ? "italic"
                  : "normal",
              textAlign:
                slide.titleStyle?.align ||
                "left",
              color:
                slide.titleStyle?.color ||
                "#111827",
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              fontSize: `${
                slide.contentStyle
                  ?.fontSize || 20
              }px`,
              fontWeight:
                slide.contentStyle?.bold
                  ? 700
                  : 400,
              fontStyle:
                slide.contentStyle?.italic
                  ? "italic"
                  : "normal",
              textAlign:
                slide.contentStyle?.align ||
                "left",
              color:
                slide.contentStyle?.color ||
                "#374151",
            }}
          >
            {slide.content}
          </p>

          {slide.image && (
            <img
              src={slide.image}
              alt="Presentation"
            />
          )}
        </div>

        <div className="presentation-controls">
          <button
            onClick={previousSlide}
            disabled={activeSlide === 0}
          >
            <ChevronLeft size={22} />
          </button>

          <span>
            {activeSlide + 1} / {slides.length}
          </span>

          <button
            onClick={nextSlide}
            disabled={
              activeSlide ===
              slides.length - 1
            }
          >
            <ChevronRight size={22} />
          </button>

          <button
            onClick={() =>
              setPresenting(false)
            }
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-page">
      {/* HEADER */}
      <header className="preview-header">
        <div className="preview-left">
          <button
            onClick={() =>
              navigate("/editor")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <strong>
              Presentation Preview
            </strong>

            <span>
              {activeSlide + 1} /{" "}
              {slides.length}
            </span>
          </div>
        </div>

        <div className="preview-actions">
          <button
            className="download-pdf-button"
            onClick={downloadPDF}
            disabled={downloading}
          >
            <Download size={17} />

            {downloading
              ? "Downloading..."
              : "Download PDF"}
          </button>

          <button
            onClick={startPresentation}
          >
            <Play size={17} />
            Present
          </button>

          <button
            onClick={enterFullscreen}
          >
            <Maximize size={17} />
            Fullscreen
          </button>
        </div>
      </header>

      {/* SLIDE */}
      <main className="preview-main">
        <div
          className={`preview-slide theme-${slide.theme}`}
        >
          <div className="preview-decoration one" />

          <div className="preview-decoration two" />

          <h1
            style={{
              fontSize: `${
                slide.titleStyle?.fontSize ||
                34
              }px`,
              fontWeight:
                slide.titleStyle?.bold
                  ? 700
                  : 400,
              fontStyle:
                slide.titleStyle?.italic
                  ? "italic"
                  : "normal",
              textAlign:
                slide.titleStyle?.align ||
                "left",
              color:
                slide.titleStyle?.color ||
                "#111827",
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              fontSize: `${
                slide.contentStyle
                  ?.fontSize || 20
              }px`,
              fontWeight:
                slide.contentStyle?.bold
                  ? 700
                  : 400,
              fontStyle:
                slide.contentStyle?.italic
                  ? "italic"
                  : "normal",
              textAlign:
                slide.contentStyle?.align ||
                "left",
              color:
                slide.contentStyle?.color ||
                "#374151",
            }}
          >
            {slide.content}
          </p>

          {slide.image && (
            <img
              className="preview-image"
              src={slide.image}
              alt="Presentation"
            />
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="preview-footer">
        <button
          disabled={activeSlide === 0}
          onClick={previousSlide}
        >
          <ChevronLeft size={20} />
        </button>

        <span>
          Slide {activeSlide + 1} of{" "}
          {slides.length}
        </span>

        <button
          disabled={
            activeSlide ===
            slides.length - 1
          }
          onClick={nextSlide}
        >
          <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
}

export default Preview;

