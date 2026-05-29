import { useEffect } from "react";

export function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&family=Exo+2:wght@200;400;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return null;
}