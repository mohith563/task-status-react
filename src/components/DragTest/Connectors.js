import React from "react";
import { Stage, Layer, Circle, Line, Text } from "react-konva";

function generateShapes() {
  const shapes = [];
  for (var i = 0; i < 10; i++) {
    shapes.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    });
  }
  return shapes;
}

const INITIAL_SHAPES = generateShapes();

const Connectors = () => {
  const [shapes, setShapes] = React.useState(INITIAL_SHAPES);
  const [connectors, setConnectors] = React.useState([]);

  const [fromShapeId, setFromShapeId] = React.useState(null);

  return (
    <Layer>
      {connectors.map((con) => {
        const from = shapes.find((s) => s.id === con.from);
        const to = shapes.find((s) => s.id === con.to);

        return (
          <Line
            key={con.id}
            points={[from.x, from.y, to.x, to.y]}
            stroke="black"
          />
        );
      })}
      {shapes.map((shape) => (
        <Circle
          x={shape.x}
          y={shape.y}
          key={shape.id}
          fill={fromShapeId === shape.id ? "red" : "green"}
          radius={20}
          shadowBlur={10}
          onClick={() => {
            if (fromShapeId) {
              const newConnector = {
                from: fromShapeId,
                to: shape.id,
                id: connectors.length,
              };
              setConnectors(connectors.concat([newConnector]));
              setFromShapeId(null);
            } else {
              setFromShapeId(shape.id);
            }
          }}
        />
      ))}
      <Text text="Click on on circle then on another to connect them" />
    </Layer>
  );
};

export default Connectors;
