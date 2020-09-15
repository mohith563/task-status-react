import React from "react";

function Headers(props) {
  const dragText = React.useRef();
  return (
    <div>
      <header className="headers">
        <ul>
          <li
            key="start"
            draggable="true"
            onDragStart={(e) => {
              // e.preventDefault();
              dragText.current = e.target.textContent;
              props.getDragText(e.target.textContent);
            }}
            style={{ backgroundColor: "#348ceb" }}
          >
            Start
          </li>
          <li
            key="progress"
            draggable="true"
            onDragStart={(e) => {
              // e.preventDefault();
              dragText.current = e.target.textContent;
              props.getDragText(e.target.textContent);
            }}
            style={{
              backgroundColor: "coral",
              paddingTop: "14px",
            }}
          >
            In Progress
          </li>
          <li
            key="done"
            draggable="true"
            onDragStart={(e) => {
              // e.preventDefault();
              dragText.current = e.target.textContent;
              props.getDragText(e.target.textContent);
            }}
            style={{ backgroundColor: "#04c220" }}
          >
            Done
          </li>
        </ul>
      </header>
    </div>
  );
}
export default Headers;
