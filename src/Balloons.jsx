import { useEffect } from "react";
import "./Balloons.css"; // Create this CSS file

export default function Balloons() {
  useEffect(() => {
    const balloonContainer = document.getElementById("balloon-container");

    function random(num) {
      return Math.floor(Math.random() * num);
    }
    function getRandomStyles() {
      // Generate different shades of pink
      const basePink = 200; // Base pink value (0-255)
      const variation = 55; // How much variation in the pink shades

      // Create pink variants by keeping red high, green medium, blue high
      var r = 200 + random(55); // 200-255 (red)
      var g = random(100); // 0-100 (less green)
      var b = 150 + random(105); // 150-255 (blue)

      var mt = random(200);
      var ml = random(50);
      var dur = random(5) + 5;

      return `
    background-color: rgba(${r}, ${g}, ${b}, 0.9); /* Changed opacity from 0.7 to 0.9 */
    color: rgba(${r}, ${g}, ${b}, 0.9); /* Changed opacity from 0.7 to 0.9 */
    box-shadow: inset -7px -3px 10px rgba(${r - 20}, ${g - 10}, ${b - 20}, 0.9);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
  `;
    }

    function createBalloons(num) {
      for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.append(balloon);
      }
    }

    function removeBalloons() {
      if (balloonContainer) {
        balloonContainer.style.opacity = 0;
        setTimeout(() => {
          balloonContainer.remove();
        }, 500);
      }
    }

    createBalloons(30);

    // Add click event to remove balloons
    const handleClick = () => removeBalloons();
    document.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <div id="balloon-container"></div>;
}
