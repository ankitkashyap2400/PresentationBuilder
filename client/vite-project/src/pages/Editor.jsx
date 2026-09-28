
import { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Italic,
  Layout,
  Plus,
  Redo2,
  Save,
  Sparkles,
  Square,
  Trash2,
  Type,
  Undo2,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


import AIGenerator from "../components/ai/AIGenerator";
import GenerationLoader from "../components/ai/GenerationLoader";
import "../styles/editor.css";

const initialSlides = [
  {
    id: 1,
    title: "Artificial Intelligence",
    content:
      "Artificial Intelligence is transforming industries by enabling machines to learn, reason and make decisions.",
    image: null,
    layout: "title-content",
    theme: "purple",

    titleStyle: {
      fontSize: 34,
      bold: true,
      italic: false,
      align: "left",
      color: "#111827",
    },

    contentStyle: {
      fontSize: 20,
      bold: false,
      italic: false,
      align: "left",
      color: "#374151",
    },

    elements: {
      title: { x: 8, y: 16, width: 72 },
      content: { x: 8, y: 40, width: 68 },
      image: { x: 58, y: 58, width: 30 },
    },
  },
  {
    id: 2,
    title: "What is AI?",
    content:
      "AI enables computers to perform tasks that normally require human intelligence, including learning, reasoning and perception.",
    image: null,
    layout: "content",
    theme: "purple",

    titleStyle: {
      fontSize: 32,
      bold: true,
      italic: false,
      align: "left",
      color: "#111827",
    },

    contentStyle: {
      fontSize: 19,
      bold: false,
      italic: false,
      align: "left",
      color: "#374151",
    },

    elements: {
      title: { x: 8, y: 12, width: 80 },
      content: { x: 8, y: 34, width: 78 },
      image: { x: 60, y: 60, width: 28 },
    },
  },
  {
    id: 3,
    title: "Applications of AI",
    content:
      "Healthcare\nFinance\nAutonomous Vehicles\nRecommendation Systems\nCybersecurity",
    image: null,
    layout: "content",
    theme: "blue",

    titleStyle: {
      fontSize: 32,
      bold: true,
      italic: false,
      align: "left",
      color: "#111827",
    },

    contentStyle: {
      fontSize: 19,
      bold: false,
      italic: false,
      align: "left",
      color: "#374151",
    },

    elements: {
      title: { x: 8, y: 12, width: 80 },
      content: { x: 8, y: 34, width: 78 },
      image: { x: 60, y: 60, width: 28 },
    },
  },
];

const themes = [
  {
    id: "purple",
    name: "Purple",
    className: "theme-purple",
  },
  {
    id: "blue",
    name: "Blue",
    className: "theme-blue",
  },
  {
    id: "dark",
    name: "Dark",
    className: "theme-dark",
  },
  {
    id: "green",
    name: "Green",
    className: "theme-green",
  },
];

const layouts = [
  {
    id: "title-content",
    name: "Title + Content",
  },
  {
    id: "content",
    name: "Content",
  },
  {
    id: "center",
    name: "Centered",
  },
];

function Editor() {
  const navigate = useNavigate();

  const [slides, setSlides] = useState(initialSlides);
  const [activeSlide, setActiveSlide] = useState(0);






  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState("purple");

  const [showGenerator, setShowGenerator] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const [selectedElement, setSelectedElement] = useState(null);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const dragRef = useRef({
    dragging: false,
    resizing: false,
    element: null,
    startX: 0,
    startY: 0,
    startValue: null,
    canvasWidth: 0,
    canvasHeight: 0,
  });

  const currentSlide = slides[activeSlide];
 /*const savePresentation = () => {
  localStorage.setItem(
    "slideAI_presentation",
    JSON.stringify({
      slides,
      activeSlide,
      theme,
      savedAt: new Date().toISOString(),
    })
  );

  alert("Presentation saved successfully!");
};*/




























const savePresentation = () => {
  try {
    const presentationData = {
      slides: slides,
      activeSlide: activeSlide,
      theme: theme,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "slideAI_presentation",
      JSON.stringify(presentationData)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  } catch (error) {
    console.error("Save failed:", error);
    alert("Failed to save presentation.");
  }
};
const openPreview = () => {
  localStorage.setItem(
    "slideAI_presentation",
    JSON.stringify({
      slides,
      activeSlide,
      theme,
      savedAt: new Date().toISOString(),
    })
  );

  navigate("/preview");};
  const saveHistory = () => {
    setHistory((prev) => [
      ...prev,
      JSON.parse(JSON.stringify(slides)),
    ]);

    setFuture([]);
  };

  const updateSlide = (field, value, shouldSave = true) => {
    if (shouldSave) {
      saveHistory();
    }

    setSlides((prev) =>
      prev.map((slide, index) =>
        index === activeSlide
          ? {
              ...slide,
              [field]: value,
            }
          : slide
      )
    );
  };

  const updateElement = (element, changes) => {
    setSlides((prev) =>
      prev.map((slide, index) => {
        if (index !== activeSlide) return slide;

        return {
          ...slide,
          elements: {
            ...slide.elements,
            [element]: {
              ...slide.elements[element],
              ...changes,
            },
          },
        };
      })
    );
  };

  const updateTextStyle = (type, changes) => {
    saveHistory();

    setSlides((prev) =>
      prev.map((slide, index) => {
        if (index !== activeSlide) return slide;

        return {
          ...slide,
          [type === "title"
            ? "titleStyle"
            : "contentStyle"]: {
            ...(type === "title"
              ? slide.titleStyle
              : slide.contentStyle),
            ...changes,
          },
        };
      })
    );
  };

  const getSelectedStyle = () => {
    if (selectedElement === "title") {
      return currentSlide.titleStyle;
    }

    if (selectedElement === "content") {
      return currentSlide.contentStyle;
    }

    return null;
  };

  const undo = () => {
    if (!history.length) return;

    const previous = history[history.length - 1];

    setFuture((prev) => [
      JSON.parse(JSON.stringify(slides)),
      ...prev,
    ]);

    setSlides(previous);
    setHistory((prev) => prev.slice(0, -1));
    setSelectedElement(null);
  };

  const redo = () => {
    if (!future.length) return;

    const next = future[0];

    setHistory((prev) => [
      ...prev,
      JSON.parse(JSON.stringify(slides)),
    ]);

    setSlides(next);
    setFuture((prev) => prev.slice(1));
    setSelectedElement(null);
  };

  const addSlide = () => {
    saveHistory();

    const newSlide = {
      id: Date.now(),
      title: "New Slide",
      content: "Add your content here.",
      image: null,
      layout: "title-content",
      theme,

      titleStyle: {
        fontSize: 34,
        bold: true,
        italic: false,
        align: "left",
        color: "#111827",
      },

      contentStyle: {
        fontSize: 20,
        bold: false,
        italic: false,
        align: "left",
        color: "#374151",
      },

      elements: {
        title: {
          x: 8,
          y: 16,
          width: 72,
        },
        content: {
          x: 8,
          y: 40,
          width: 68,
        },
        image: {
          x: 58,
          y: 58,
          width: 30,
        },
      },
    };

    setSlides((prev) => [...prev, newSlide]);
    setActiveSlide(slides.length);
  };

  const deleteSlide = () => {
    if (slides.length === 1) return;

    saveHistory();

    setSlides((prev) =>
      prev.filter((_, index) => index !== activeSlide)
    );

    setActiveSlide((prev) =>
      prev >= slides.length - 1
        ? Math.max(0, slides.length - 2)
        : prev
    );

    setSelectedElement(null);
  };

  const duplicateSlide = () => {
    saveHistory();

    const copy = {
      ...JSON.parse(JSON.stringify(currentSlide)),
      id: Date.now(),
    };

    const updatedSlides = [...slides];

    updatedSlides.splice(activeSlide + 1, 0, copy);

    setSlides(updatedSlides);
    setActiveSlide(activeSlide + 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    saveHistory();

    const reader = new FileReader();

    reader.onload = () => {
      updateSlide("image", reader.result, false);
      setSelectedElement("image");
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const removeImage = () => {
    saveHistory();
    updateSlide("image", null, false);
    setSelectedElement(null);
  };

  const addText = () => {
    saveHistory();

    updateSlide(
      "content",
      `${currentSlide.content}\nNew text`,
      false
    );

    setSelectedElement("content");
  };

  const applyTheme = (themeId) => {
    saveHistory();

    setTheme(themeId);

    setSlides((prev) =>
      prev.map((slide, index) =>
        index === activeSlide
          ? {
              ...slide,
              theme: themeId,
            }
          : slide
      )
    );
  };

  const applyLayout = (layoutId) => {
    saveHistory();

    updateSlide("layout", layoutId, false);
  };

  const handleGenerate = (settings) => {
    setShowGenerator(false);
    setGenerating(true);

    setTimeout(() => {
      const generatedSlides = Array.from(
        {
          length: settings.slideCount,
        },
        (_, index) => ({
          id: Date.now() + index,

          title:
            index === 0
              ? settings.topic
              : `${settings.topic} — Section ${index + 1}`,

          content:
            index === 0
              ? `An AI-generated presentation about ${settings.topic}.`
              : `Key insights, examples and important information related to ${settings.topic}.`,

          image: null,

          layout:
            index === 0
              ? "center"
              : "title-content",

          theme,

          titleStyle: {
            fontSize: index === 0 ? 38 : 32,
            bold: true,
            italic: false,
            align: index === 0 ? "center" : "left",
            color: "#111827",
          },

          contentStyle: {
            fontSize: 20,
            bold: false,
            italic: false,
            align: index === 0 ? "center" : "left",
            color: "#374151",
          },

          elements: {
            title: {
              x: index === 0 ? 14 : 8,
              y: index === 0 ? 35 : 16,
              width: index === 0 ? 72 : 72,
            },

            content: {
              x: index === 0 ? 18 : 8,
              y: index === 0 ? 52 : 40,
              width: index === 0 ? 64 : 68,
            },

            image: {
              x: 58,
              y: 58,
              width: 30,
            },
          },
        })
      );

      setSlides(generatedSlides);
      setActiveSlide(0);
      setSelectedElement(null);
      setGenerating(false);
    }, 2200);
  };

  const startDrag = (event, element) => {
    if (event.button !== 0) return;

    event.preventDefault();

    const rect =
      canvasRef.current?.getBoundingClientRect();

    if (!rect) return;

    const elementPosition =
      currentSlide.elements[element];

    dragRef.current = {
      dragging: true,
      resizing: false,
      element,
      startX: event.clientX,
      startY: event.clientY,
      startValue: {
        ...elementPosition,
      },
      canvasWidth: rect.width,
      canvasHeight: rect.height,
    };

    setSelectedElement(element);
  };

  const startResize = (event, element) => {
    event.preventDefault();
    event.stopPropagation();

    const rect =
      canvasRef.current?.getBoundingClientRect();

    if (!rect) return;

    const elementPosition =
      currentSlide.elements[element];

    dragRef.current = {
      dragging: false,
      resizing: true,
      element,
      startX: event.clientX,
      startY: event.clientY,
      startValue: {
        ...elementPosition,
      },
      canvasWidth: rect.width,
      canvasHeight: rect.height,
    };

    setSelectedElement(element);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const drag = dragRef.current;

      if (!drag.dragging && !drag.resizing) {
        return;
      }

      const deltaX =
        ((event.clientX - drag.startX) /
          drag.canvasWidth) *
        100;

      const deltaY =
        ((event.clientY - drag.startY) /
          drag.canvasHeight) *
        100;

      if (drag.dragging) {
        const newX = Math.min(
          Math.max(0, drag.startValue.x + deltaX),
          100 - drag.startValue.width
        );

        const newY = Math.min(
          Math.max(0, drag.startValue.y + deltaY),
          90
        );

        updateElement(drag.element, {
          x: newX,
          y: newY,
        });
      }

      if (drag.resizing) {
        const newWidth = Math.min(
          Math.max(
            10,
            drag.startValue.width + deltaX
          ),
          90
        );

        updateElement(drag.element, {
          width: newWidth,
        });
      }
    };

    const handleMouseUp = () => {
      if (
        dragRef.current.dragging ||
        dragRef.current.resizing
      ) {
        setHistory((prev) => [
          ...prev,
          JSON.parse(JSON.stringify(slides)),
        ]);

        setFuture([]);
      }

      dragRef.current.dragging = false;
      dragRef.current.resizing = false;
      dragRef.current.element = null;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, [slides]);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "z"
      ) {
        event.preventDefault();

        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }

      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "y"
      ) {
        event.preventDefault();
        redo();
      }

      if (event.key === "Escape") {
        setSelectedElement(null);
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
  }, [history, future, slides]);

  const renderElement = (element) => {
    const position =
      currentSlide.elements[element];

    if (!position) return null;

    const selected =
      selectedElement === element;

    const style = {
      left: `${position.x}%`,
      top: `${position.y}%`,
      width: `${position.width}%`,
    };

    if (element === "title") {
      const textStyle =
        currentSlide.titleStyle;

      return (
        <div
          key="title"
          className={`draggable-element ${
            selected ? "element-selected" : ""
          }`}
          style={style}
          onMouseDown={(event) =>
            startDrag(event, "title")
          }
          onClick={(event) => {
            event.stopPropagation();
            setSelectedElement("title");
          }}
        >
          <textarea
            className="editor-slide-title"
            value={currentSlide.title}
            style={{
              fontSize: `${textStyle.fontSize}px`,
              fontWeight: textStyle.bold
                ? "700"
                : "400",
              fontStyle: textStyle.italic
                ? "italic"
                : "normal",
              textAlign: textStyle.align,
              color: textStyle.color,
            }}
            onChange={(event) =>
              updateSlide(
                "title",
                event.target.value,
                false
              )
            }
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            placeholder="Slide title"
          />

          {selected && (
            <div
              className="resize-handle"
              onMouseDown={(event) =>
                startResize(event, "title")
              }
            />
          )}
        </div>
      );
    }

    if (element === "content") {
      const textStyle =
        currentSlide.contentStyle;

      return (
        <div
          key="content"
          className={`draggable-element ${
            selected ? "element-selected" : ""
          }`}
          style={style}
          onMouseDown={(event) =>
            startDrag(event, "content")
          }
          onClick={(event) => {
            event.stopPropagation();
            setSelectedElement("content");
          }}
        >
          <textarea
            className="editor-slide-content"
            value={currentSlide.content}
            style={{
              fontSize: `${textStyle.fontSize}px`,
              fontWeight: textStyle.bold
                ? "700"
                : "400",
              fontStyle: textStyle.italic
                ? "italic"
                : "normal",
              textAlign: textStyle.align,
              color: textStyle.color,
            }}
            onChange={(event) =>
              updateSlide(
                "content",
                event.target.value,
                false
              )
            }
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            placeholder="Slide content"
          />

          {selected && (
            <div
              className="resize-handle"
              onMouseDown={(event) =>
                startResize(event, "content")
              }
            />
          )}
        </div>
      );
    }

    if (
      element === "image" &&
      currentSlide.image
    ) {
      return (
        <div
          key="image"
          className={`draggable-element image-element ${
            selected ? "element-selected" : ""
          }`}
          style={style}
          onMouseDown={(event) =>
            startDrag(event, "image")
          }
          onClick={(event) => {
            event.stopPropagation();
            setSelectedElement("image");
          }}
        >
          <div className="slide-image-wrapper">
            <img
              src={currentSlide.image}
              alt="Slide"
              className="slide-image"
            />

            <button
              className="remove-image-button"
              onMouseDown={(event) =>
                event.stopPropagation()
              }
              onClick={(event) => {
                event.stopPropagation();
                removeImage();
              }}
            >
              <X size={15} />
            </button>
          </div>

          {selected && (
            <div
              className="resize-handle"
              onMouseDown={(event) =>
                startResize(event, "image")
              }
            />
          )}
        </div>
      );
    }

    return null;
  };

  const selectedStyle = getSelectedStyle();

  return (
    <div className="editor-page">
      <header className="editor-header">
        <div className="editor-logo">
          <button
            className="editor-back"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div className="editor-logo-icon">
            <Sparkles size={18} />
          </div>

          <div className="editor-title">
            <strong>SlideAI</strong>
            <span>{currentSlide.title}</span>
          </div>
        </div>

        <div className="editor-actions">
        <button
  className={`editor-save-button ${
    saved ? "saved" : ""
  }`}
  onClick={savePresentation}
>
  <Save size={17} />

  {saved ? "Saved!" : "Save"}
</button>

          <button
            className="editor-preview-button"
            onClick={() =>
              navigate("/preview")
            }
          >
            Preview
          </button>
        </div>
      </header>

      <div className="editor-main">
        <aside className="editor-sidebar">
          <div className="sidebar-header">
            <div>
              <strong>Slides</strong>
              <span>{slides.length}</span>
            </div>

            <button onClick={addSlide}>
              <Plus size={17} />
            </button>
          </div>

          <div className="slide-list">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slide-thumbnail ${
                  activeSlide === index
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setActiveSlide(index);
                  setSelectedElement(null);
                }}
              >
                <div className="slide-number">
                  {index + 1}
                </div>

                <div
                  className={`thumbnail-content theme-${slide.theme}`}
                >
                  <strong>
                    {slide.title}
                  </strong>

                  <small>
                    {slide.content.slice(
                      0,
                      60
                    )}
                  </small>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-bottom">
            <button onClick={duplicateSlide}>
              <Square size={16} />
              Duplicate
            </button>

            <button
              onClick={deleteSlide}
              disabled={slides.length === 1}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </aside>

        <main className="editor-workspace">
          <div className="editor-toolbar">
            <button
              onClick={undo}
              disabled={!history.length}
              title="Undo"
            >
              <Undo2 size={17} />
            </button>

            <button
              onClick={redo}
              disabled={!future.length}
              title="Redo"
            >
              <Redo2 size={17} />
            </button>

            <div className="toolbar-divider" />

            <button onClick={addText}>
              <Type size={17} />
              Text
            </button>

            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <ImageIcon size={17} />
              Image
            </button>

            <button>
              <Square size={17} />
              Shape
            </button>

            {selectedStyle && (
              <>
                <div className="toolbar-divider" />

                <select
                  value={selectedStyle.fontSize}
                  onChange={(event) =>
                    updateTextStyle(
                      selectedElement,
                      {
                        fontSize: Number(
                          event.target.value
                        ),
                      }
                    )
                  }
                >
                  <option value={14}>
                    14px
                  </option>
                  <option value={16}>
                    16px
                  </option>
                  <option value={18}>
                    18px
                  </option>
                  <option value={20}>
                    20px
                  </option>
                  <option value={24}>
                    24px
                  </option>
                  <option value={28}>
                    28px
                  </option>
                  <option value={32}>
                    32px
                  </option>
                  <option value={36}>
                    36px
                  </option>
                  <option value={42}>
                    42px
                  </option>
                  <option value={48}>
                    48px
                  </option>
                </select>

                <button
                  className={
                    selectedStyle.bold
                      ? "format-active"
                      : ""
                  }
                  onClick={() =>
                    updateTextStyle(
                      selectedElement,
                      {
                        bold:
                          !selectedStyle.bold,
                      }
                    )
                  }
                  title="Bold"
                >
                  <Bold size={17} />
                </button>

                <button
                  className={
                    selectedStyle.italic
                      ? "format-active"
                      : ""
                  }
                  onClick={() =>
                    updateTextStyle(
                      selectedElement,
                      {
                        italic:
                          !selectedStyle.italic,
                      }
                    )
                  }
                  title="Italic"
                >
                  <Italic size={17} />
                </button>

                <button
                  className={
                    selectedStyle.align ===
                    "left"
                      ? "format-active"
                      : ""
                  }
                  onClick={() =>
                    updateTextStyle(
                      selectedElement,
                      {
                        align: "left",
                      }
                    )
                  }
                >
                  <AlignLeft size={17} />
                </button>

                <button
                  className={
                    selectedStyle.align ===
                    "center"
                      ? "format-active"
                      : ""
                  }
                  onClick={() =>
                    updateTextStyle(
                      selectedElement,
                      {
                        align: "center",
                      }
                    )
                  }
                >
                  <AlignCenter size={17} />
                </button>

                <button
                  className={
                    selectedStyle.align ===
                    "right"
                      ? "format-active"
                      : ""
                  }
                  onClick={() =>
                    updateTextStyle(
                      selectedElement,
                      {
                        align: "right",
                      }
                    )
                  }
                >
                  <AlignRight size={17} />
                </button>

                <input
                  type="color"
                  value={selectedStyle.color}
                  title="Text color"
                  onChange={(event) =>
                    updateTextStyle(
                      selectedElement,
                      {
                        color:
                          event.target.value,
                      }
                    )
                  }
                />
              </>
            )}

            <div className="toolbar-divider" />

            <button
              className="ai-toolbar-button"
              onClick={() =>
                setShowGenerator(true)
              }
            >
              <Sparkles size={17} />
              Generate with AI
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={
                handleImageUpload
              }
            />
          </div>

          <div className="editor-canvas-container">
            <div
              ref={canvasRef}
              className={`editor-canvas theme-${currentSlide.theme} layout-${currentSlide.layout}`}
              onClick={() =>
                setSelectedElement(null)
              }
            >
              <div className="editor-decoration decoration-one" />

              <div className="editor-decoration decoration-two" />

              {renderElement("title")}

              {renderElement("content")}

              {renderElement("image")}

              {!currentSlide.image && (
                <div className="image-drop-area">
                  <ImageIcon size={22} />

                  <span>
                    Upload image
                  </span>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();

                      fileInputRef.current?.click();
                    }}
                  >
                    Choose Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <footer className="editor-footer">
            <div className="editor-slide-controls">
              <button
                disabled={activeSlide === 0}
                onClick={() => {
                  setActiveSlide(
                    (prev) =>
                      Math.max(
                        0,
                        prev - 1
                      )
                  );

                  setSelectedElement(null);
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <span>
                {activeSlide + 1} /{" "}
                {slides.length}
              </span>

              <button
                disabled={
                  activeSlide ===
                  slides.length - 1
                }
                onClick={() => {
                  setActiveSlide(
                    (prev) =>
                      Math.min(
                        slides.length - 1,
                        prev + 1
                      )
                  );

                  setSelectedElement(null);
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </footer>
        </main>

        <aside className="editor-design">
          <div className="design-section">
            <div className="design-section-title">
              <Layout size={17} />
              <strong>Theme</strong>
            </div>

            <div className="theme-grid">
              {themes.map((item) => (
                <button
                  key={item.id}
                  className={`theme-option ${
                    theme === item.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    applyTheme(item.id)
                  }
                >
                  <div
                    className={`theme-preview ${item.className}`}
                  >
                    <span />
                    <span />
                  </div>

                  <small>
                    {item.name}
                  </small>
                </button>
              ))}
            </div>
          </div>

          <div className="design-section">
            <div className="design-section-title">
              <Layout size={17} />
              <strong>Layout</strong>
            </div>

            <div className="layout-list">
              {layouts.map((item) => (
                <button
                  key={item.id}
                  className={`layout-option ${
                    currentSlide.layout ===
                    item.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    applyLayout(
                      item.id
                    )
                  }
                >
                  <div
                    className={`layout-preview ${item.id}`}
                  >
                    <span />
                    <span />
                  </div>

                  <small>
                    {item.name}
                  </small>
                </button>
              ))}
            </div>
          </div>

          <div className="design-section">
            <div className="design-section-title">
              <Type size={17} />
              <strong>
                Text Formatting
              </strong>
            </div>

            <div className="element-help">
              <p>
                Select a title or content
                element to edit its font.
              </p>

              <p>
                Change size, weight, style,
                alignment and color from
                the toolbar.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {showGenerator && (
        <AIGenerator
          onClose={() =>
            setShowGenerator(false)
          }
          onGenerate={
            handleGenerate
          }
        />
      )}

      {generating && (
        <GenerationLoader />
      )}
    </div>
  );
}export default Editor;

