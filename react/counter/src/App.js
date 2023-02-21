import { useEffect, useState } from "react";
import "./app.css";

export const App = () => {
  const [count, setCount] = useState(0);

  const changeCount = (num) => {
    setCount((prev) => prev + num);
  };
  const escFunction = (event) => {
    if (event.key === "Escape") {
      setCount(0);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  });

  return (
    <div className="wrapper">
      <button className="button" onClick={() => changeCount(1)}>
        +
      </button>
      <div>Current count : {count}</div>
      <button className="button" onClick={() => changeCount(-1)}>
        -
      </button>
    </div>
  );
};
