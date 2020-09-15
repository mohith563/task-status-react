import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Group } from "react-konva";
import Konva from "konva";

import CircleWithText from "./CircleWithText";

function DropStage(props) {
  const stageRef = useRef();
  const [circles, setCircles] = useState([]);
  const [id, setId] = useState(1);
  const [connectors, setConnectors] = useState([]);

  const [connections, setConnections] = useState([]);

  const [fromShapeId, setFromShapeId] = useState(null);
  const [drawingLine, setDrawingLine] = useState(false);

  const handleMouseDown = (e) => {
    const onCircle = e.target instanceof Konva.Circle;

    console.log(onCircle);
    if (!onCircle) return;
    connections.push({
      points: [e.target.x(), e.target.y()],
    });
    setDrawingLine(true);
  };

  const handleMouseMove = (e) => {
    if (!drawingLine) return;
    console.log("inside handlemove");
    const pos = e.target.getStage().getPointerPosition();
    const lastLine = connections[connections.length - 1];
    lastLine.points = [lastLine.points[0], lastLine.points[1], pos.x, pos.y];
    console.log(lastLine);
  };

  const handleMouseUp = (e) => {
    console.log("up");
    const onCircle = e.target instanceof Konva.Circle;
    console.log(onCircle);
    if (!onCircle) return;
    setDrawingLine(false);
    const lastLine = connections[connections.length - 1];
    lastLine.points = [
      lastLine.points[0],
      lastLine.points[1],
      e.target.x(),
      e.target.y(),
    ];
  };

  const updatePosition = (index, e) => {
    setCircles((prevState) => {
      let node = { ...prevState[index - 1] };
      node.x = e.target.x();
      node.y = e.target.y();
      prevState[index - 1] = node;
      return prevState.slice();
    });
  };

  return (
    <div
      onDrop={(e) => {
        // register event position
        stageRef.current.setPointersPositions(e);
        // add image
        setId(id + 1);
        setCircles(
          circles.concat([
            {
              ...stageRef.current.getPointerPosition(),
              text: props.dragText,
              id,
              key: id,
            },
          ])
        );
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{ border: "black solid 5px" }}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ border: "1px solid grey" }}
        ref={stageRef}
      >
        <Layer>
          <Group>
            {connections.map((line) => {
              return <Line key={line.id} points={line.points} stroke="black" />;
            })}
            {connectors.map((con) => {
              const from = circles.find((s) => s.id === con.from);
              const to = circles.find((s) => s.id === con.to);

              return (
                <Line
                  key={con.id}
                  // fromId={from.id}
                  // toId={to.id}
                  points={[from.x, from.y, to.x, to.y]}
                  stroke="black"
                />
              );
            })}
            {circles.map((image) => {
              return (
                <CircleWithText
                  updatePosition={updatePosition}
                  image={image}
                  handleClick={() => {
                    if (fromShapeId) {
                      const newConnector = {
                        from: fromShapeId,
                        to: image.id,
                        id: connectors.length,
                      };
                      setConnectors(connectors.concat([newConnector]));
                      setFromShapeId(null);
                    } else {
                      setFromShapeId(image.id);
                    }
                  }}
                />
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

export default DropStage;
