/*
 * Code by whoisryosuke
 * https://gist.github.com/whoisryosuke/99f23c9957d90e8cc3eb7689ffa5757c
 */

import { useState, useEffect } from "react";

const useMousePosition = (x, y) => {
  const [mousePosition, setMousePosition] = useState({ x, y });

  const updateMousePosition = (ev) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export default useMousePosition;
