import React from "react";
import { Circle, Text, Group } from "react-konva";

function CircleWithText({ image, handleClick, updatePosition }) {
  let fillColor,
    textX = image.x - 40,
    textY = image.y - 20;
  if (image.text === "Start") {
    fillColor = "#348ceb";
    textY = image.y - 10;
  } else if (image.text === "Done") {
    fillColor = "#04c220";
    textY = image.y - 10;
  } else {
    fillColor = "coral";
  }
  return (
    <Group
      // dragBoundFunc={function (pos) {
      //   var newY = pos.y < 50 ? 50 : pos.y;
      //   return {
      //     x: pos.x,
      //     y: newY,
      //   };
      // }}
      // draggable="true"
      onDragMove={(e) => updatePosition(image.id, e)}
      onClick={handleClick}
    >
      <Circle
        dragBoundFunc={function (pos) {
          // important pos - is absolute position of the node
          // you should return absolute position too

          let newX = pos.x <= 50 ? 50 : pos.x;
          let newY = pos.y <= 50 ? 50 : pos.y;
          newX = pos.x <= 50 ? 50 : pos.x;
          newY = pos.y <= 50 ? 50 : pos.y;
          console.log(pos.x, window.innerWidth);
          return {
            x: newX,
            y: newY,
          };
        }}
        draggable
        radius={50}
        x={image.x}
        y={image.y}
        fill={fillColor}
      />

      {/*  RIGHT CONNECTOR CIRCLE */}
      {image.text !== "Done" ? (
        <Circle
          // onMouseDown={(e) => handleMouseDown(e, image.id)}
          // onMouseMove={(e) => handleMouseMove(e)}
          // onMouseUp={(e) => handleMouseUp(e)}
          id={image.id}
          radius={5}
          x={image.x + 50}
          y={image.y}
          fill="black"
          type="connector"
        />
      ) : null}

      {/* LEFT CONNECTOR CIRCLE */}
      {image.text !== "Start" ? (
        <Circle
          // onMouseDown={(e) => handleMouseDown(e, image.id)}
          // onMouseMove={(e) => handleMouseMove(e)}
          // onMouseUp={(e) => handleMouseUp(e)}
          id={image.id}
          radius={5}
          x={image.x - 50}
          y={image.y}
          fill="black"
          type="connector"
        />
      ) : null}

      <Text
        x={textX}
        y={textY}
        text={image.text}
        fontSize={18}
        wrap="word"
        width={80}
        align="center"
        verticalAlign="middle"
        fill="white"
      />
    </Group>
  );
}

export default CircleWithText;
