import React from "react";

function Headers() {
  const dragUrl = React.useRef();
  return (
    <div>
      {/* <header className="headers">
        <ul>
          <li>Start</li>
          <li>In Progress</li>
          <li>Done</li>
        </ul>
      </header> */}
      <header className="headers">
        <ul>
          <li
            draggable="true"
            onDragStart={(e) => {
              // e.preventDefault();
              dragUrl.current = e.target.src;
            }}
          >
            Start
          </li>
          <li
            draggable="true"
            onDragStart={(e) => {
              // e.preventDefault();
              dragUrl.current = e.target.src;
            }}
          >
            In Progress
          </li>
          <li
            draggable="true"
            onDragStart={(e) => {
              // e.preventDefault();
              dragUrl.current = e.target.src;
            }}
          >
            Done
          </li>
        </ul>
      </header>
    </div>
  );
}
export default Headers;
