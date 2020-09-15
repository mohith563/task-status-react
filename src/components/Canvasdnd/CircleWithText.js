import React from "react";
import { Circle, Text, Group } from "react-konva";

function CircleWithText({ image, updatePosition }) {
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
    <Group onDragMove={(e) => updatePosition(image.id, e)}>
      <Circle radius={50} x={image.x} y={image.y} fill={fillColor} draggable />

      {/*  RIGHT CONNECTOR CIRCLE */}
      {image.text !== "Done" ? (
        <Circle
          radius={5}
          id={`rcircle${image.id}`}
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
          id={`lcircle${image.id}`}
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
