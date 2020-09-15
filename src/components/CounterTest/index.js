import React, { useState, useRef, useEffect } from "react";

function CounterRenderer({}) {
  const [counter, setCounter] = useState(1);

  const counterRef = useRef(counter);

  function handleClick() {
    console.group("Counter Check");
    console.dir(`counter ==> ${counter}`);
    console.log(`counterRef ==> ${counterRef.current}`);
    console.groupEnd();
    counterRef.current = counterRef.current + 1;
    // setCounter(counterRef.current); // works fine
    setCounter(1 + counter); // wont work
    // setCounter(prevState => prevState + 1); // works fine
  }
  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      // window.removeEventListener("click", handleClick); // comment this
    };
  }, [handleClick]);
  // });
  console.log("i m printing render cycle");
  return (
    <>
      <button>Click Me</button>
      <p>{counter}</p>
    </>
  );
}

function CounterTest({}) {
  return (
    <>
      <CounterRenderer />
    </>
  );
}

export default CounterTest;
