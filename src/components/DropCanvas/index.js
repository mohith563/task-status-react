import React from "react";
import { Stage, Layer, Circle, Label, Tag, Text, Group } from "react-konva";

import Headers from "./Headers";
import Arrows from "./Arrows";
import "./DropCanvas.scss";

const BLUE1_DEFAULTS = {
  x: 200,
  y: 200,
  stroke: "blue",
  radius: 50,
};

const BLUE2_DEFAULTS = {
  x: 500,
  y: 200,
  stroke: "blue",
  radius: 50,
};

function DropCanvas(props) {
  const [blue1Node, updateBlue1Node] = React.useState(BLUE1_DEFAULTS);
  const [blue2Node, updateBlue2Node] = React.useState(BLUE2_DEFAULTS);
  return (
    <div className="container">
      <Headers />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <Layer>
          <Group draggable="true">
            <Arrows node1={blue2Node} node2={blue1Node} />
            <Group>
              <Circle
                {...blue1Node}
                onDragMove={(e) => {
                  updateBlue1Node({ ...blue1Node, ...e.target.position() });
                }}
              />
              <Text
                x={180}
                y={190}
                text="Start"
                fill="black"
                align="center"
                verticalAlign="middle"
                fontSize="18"
              />
            </Group>
            <Group>
              <Circle
                {...blue2Node}
                onDragMove={(e) => {
                  updateBlue2Node({ ...blue2Node, ...e.target.position() });
                }}
              />
              <Text
                x={460}
                y={160}
                width={80}
                height={70}
                text="In Progress"
                fill="black"
                align="center"
                verticalAlign="middle"
                fontSize="18"
              />
            </Group>
          </Group>
        </Layer>
      </Stage>
    </div>
  );
  // return <Connectors />;
}

export default DropCanvas;
