import React, { useEffect } from "react";
import "./letter.css";

const Letter = () => {
  useEffect(() => {
    const initializeLetters = () => {
      const letters = document.querySelectorAll(".letter");
      const lettersContainer = document.querySelector(".letters");
      const envelope = document.querySelector(".envelope");
      let zIndexCounter = 10;
      let isDragging = false;
      let currentLetter = null;
      let offsetX = 0,
        offsetY = 0;

      if (!letters.length || !lettersContainer || !envelope) return;

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      // Shuffle and position letters
      const shuffledLetters = shuffleArray(Array.from(letters));

      shuffledLetters.forEach((letter) => {
        lettersContainer.appendChild(letter);

        // Center the letter
        const containerWidth = document.querySelector(".cssletter").offsetWidth;
        const letterWidth = letter.offsetWidth;
        const center = (containerWidth - letterWidth) / 2;
        letter.style.left = `${center}px`;

        // Add center class if not overflown
        function isOverflown(element) {
          return (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
          );
        }

        if (!isOverflown(letter)) {
          letter.classList.add("center");
        }

        // Improved drag functionality
        const startDrag = (e) => {
          // Don't drag if clicking the close button
          if (e.target.classList.contains("closeLetter")) return;

          isDragging = true;
          currentLetter = letter;

          const rect = letter.getBoundingClientRect();
          offsetX = e.clientX - rect.left;
          offsetY = e.clientY - rect.top;

          letter.style.zIndex = zIndexCounter++;
          letter.style.cursor = "grabbing";
          letter.style.willChange = "transform"; // Add for performance

          e.preventDefault();
        };

        const onMouseMove = (e) => {
          if (!isDragging || !currentLetter) return;

          const x = e.clientX - offsetX;
          const y = e.clientY - offsetY;

          currentLetter.style.transform = `translate(${x}px, ${y}px)`;
          currentLetter.style.position = "fixed";
          currentLetter.style.left = "0";
          currentLetter.style.top = "0";
        };

        const stopDrag = () => {
          isDragging = false;
          currentLetter = null;
          if (letter) {
            letter.style.cursor = "grab";
          }
        };

        // Add event listeners
        letter.addEventListener("mousedown", startDrag);
        letter.addEventListener(
          "touchstart",
          (e) => {
            startDrag(e.touches[0]);
          },
          { passive: false }
        );

        // Add global event listeners
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener(
          "touchmove",
          (e) => {
            onMouseMove(e.touches[0]);
          },
          { passive: false }
        );
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
      });

      // Open envelope event
      const openEnvelope = document.querySelector("#openEnvelope");
      if (openEnvelope) {
        openEnvelope.addEventListener("click", () => {
          envelope.classList.add("active");
        });
      }

      // Close buttons events
      const closeButtons = document.querySelectorAll(".closeLetter");
      closeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation(); // Prevent drag from triggering
          const letter = e.target.closest(".letter");
          if (letter) {
            letter.style.display = "none";
          }
        });
      });

      // Cleanup function
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopDrag);
      };
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initializeLetters, 100);
  }, []);

  return (
    <div className="letter-container">
      <section className="cssletter">
        <div className="envelope">
          <button
            className="heart"
            id="openEnvelope"
            aria-label="Open Envelope"
          >
            <span className="heart-text">Open</span>
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
        </div>
        <div className="letters">
          {/* Your letters here - keep the same structure */}
          <blockquote className="letter" id="1" tabIndex="0">
            <button className="closeLetter" title="Close Amelia's letter">
              Close Amelia's letter
            </button>
            <p>
              From the moment our paths intertwined, you filled my days with
              laughter and my nights with sweet dreams. Your love is a constant
              melody that plays softly in my heart, making every moment magical.
            </p>
            <cite>Amelia Rose</cite>
          </blockquote>

          {/* Add all your other letters here */}
          <blockquote className="letter" id="2" tabIndex="0">
            <button className="closeLetter" title="Close Oliver's letter">
              Close Oliver's letter
            </button>
            <p>
              Every shared glance and whispered secret adds another verse to our
              endless love song. You make even the simplest moments sparkle with
              joy and wonder, as if we're living in our very own romantic film.
            </p>
            <cite>Oliver James</cite>
          </blockquote>

          {/* ... rest of your letters */}
        </div>
      </section>

      <footer>{/* Your footer content */}</footer>
    </div>
  );
};

export default Letter;
