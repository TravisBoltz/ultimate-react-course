import { useEffect } from "react";

export function useKey(key, action) {
  //Add keypress listener
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === key.toLowerCase()) action();
    });
    return function () {
      document.removeEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === key.toLowerCase()) action();
      });
    };
  }, [action, key]);
}
