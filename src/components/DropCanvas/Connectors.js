import React from "react";
import { Stage, Layer, Circle, Arrow, Text, Group } from "react-konva";

const BLUE1_DEFAULTS = {
  x: 100,
  y: 100,
  stroke: "blue",
  radius: 50,
  draggable: true,
};

const BLUE2_DEFAULTS = {
  x: 100,
  y: 300,
  stroke: "blue",
  radius: 50,
  draggable: true,
};

const degrees_to_radians = (degrees) => degrees * (Math.PI / 180);

const Edge = ({ node1, node2 }) => {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 20;

  const arrowStart = {
    x: node2.x + -radius * Math.cos(angle + Math.PI),
    y: node2.y + radius * Math.sin(angle + Math.PI),
  };

  const arrowEnd = {
    x: node1.x + -radius * Math.cos(angle),
    y: node1.y + radius * Math.sin(angle),
  };

  const arrowMiddle = {
    x: (arrowStart.x + arrowEnd.x) / 2,
    y: (arrowStart.y + arrowEnd.y) / 2,
  };

  const text = "SOme text";

  return (
    <Group>
      <Arrow
        points={[
          arrowStart.x,
          arrowStart.y,
          arrowMiddle.x,
          arrowMiddle.y,
          arrowEnd.x,
          arrowEnd.y,
        ]}
        stroke="#000"
        fill="#000"
        strokeWidth={1}
        pointerWidth={6}
      />
      <Text
        fill="red"
        x={(node1.x + node2.x) / 2 - 100}
        y={(node1.y + node2.y) / 2 - 100}
        width={200}
        height={200}
        align="center"
        verticalAlign="middle"
        text={text}
      />
    </Group>
  );
};

const Connectors = () => {
  const [blue1Node, updateBlue1Node] = React.useState(BLUE1_DEFAULTS);
  const [blue2Node, updateBlue2Node] = React.useState(BLUE2_DEFAULTS);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* <Edge node1={blue2Node} node2={blue1Node} /> */}

        {/*  */}
        <Group>
          <Circle
            {...blue1Node}
            onDragMove={(e) => {
              updateBlue1Node({ ...blue1Node, ...e.target.position() });
            }}
          />
          <Text
            text="Start"
            fill="black"
            align="center"
            verticalAlign="middle"
            fontSize="24"
          />
        </Group>
        {/*  */}

        {/* <Circle
          {...blue1Node}
          onDragMove={(e) => {
            updateBlue1Node({ ...blue1Node, ...e.target.position() });
          }}
        /> */}
        {/* <Circle
          {...blue2Node}
          onDragMove={(e) => {
            updateBlue2Node({ ...blue2Node, ...e.target.position() });
          }}
        /> */}
      </Layer>
    </Stage>
  );
};

export default Connectors;
