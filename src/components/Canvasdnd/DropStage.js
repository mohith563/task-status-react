import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Group } from "react-konva";
import Konva from "konva";

import CircleWithText from "./CircleWithText";

function DropStage(props) {
  const stageRef = useRef();
  const [circles, setCircles] = useState([]);
  const [smallCircles, setSmallCircles] = useState([]);
  const [id, setId] = useState(1);

  const [connections, setConnections] = useState([]);
  const [connectionsId, setConnectionsId] = useState(0);

  const [drawingLine, setDrawingLine] = useState(false);

  const handleMouseDown = (e) => {
    if (e.target.attrs.type !== "connector") return;
    const onCircle = e.target instanceof Konva.Circle;
    if (!onCircle) return;
    setConnections([
      ...connections,
      {
        id: `connection${connectionsId}`,
        points: [e.target.x(), e.target.y()],
        from: e.target.attrs.id,
      },
    ]);
    setConnectionsId(connectionsId + 1);

    setDrawingLine(true);
  };

  const handleMouseMove = (e) => {
    if (!drawingLine) return;
    const pos = e.target.getStage().getPointerPosition();
    setConnections(
      connections.map((line) => {
        if (line.id === `connection${connectionsId - 1}`) {
          return {
            ...line,
            points: [line.points[0], line.points[1], pos.x, pos.y],
          };
        } else return line;
      })
    );
  };

  const handleMouseUp = (e) => {
    if (e.target.attrs.type !== "connector") {
      // connections.pop();
      // setDrawingLine(false);
      return;
    }
    const onCircle = e.target instanceof Konva.Circle;
    if (!onCircle && drawingLine) return;
    setDrawingLine(false);
    setConnections(
      connections.map((line) => {
        if (line.id === `connection${connectionsId - 1}`) {
          return {
            ...line,
            points: [
              line.points[0],
              line.points[1],
              e.target.x(),
              e.target.y(),
            ],
            to: e.target.attrs.id,
          };
        } else return line;
      })
    );
  };

  const updatePosition = (index, e) => {
    setCircles((prevState) => {
      let node = { ...prevState[index - 1] };
      node.x = e.target.x();
      node.y = e.target.y();
      prevState[index - 1] = node;
      return prevState.slice();
    });
    setSmallCircles((prevState) => {
      let lindex;
      let lnode = prevState.find((sc, i) => {
        lindex = i;
        return sc.id === `lcircle${index}`;
      });
      lnode = { ...lnode, x: e.target.x() - 50, y: e.target.y() };
      prevState[lindex] = lnode;
      return prevState.slice();
    });
    setSmallCircles((prevState) => {
      let rindex;
      let rnode = prevState.find((sc, i) => {
        rindex = i;
        return sc.id === `rcircle${index}`;
      });
      rnode = { ...rnode, x: e.target.x() + 50, y: e.target.y() };
      prevState[rindex] = rnode;
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
        setSmallCircles(
          smallCircles.concat([
            {
              id: `lcircle${id}`,
              x: stageRef.current.getPointerPosition().x - 50,
              y: stageRef.current.getPointerPosition().y,
            },
            {
              id: `rcircle${id}`,
              x: stageRef.current.getPointerPosition().x + 50,
              y: stageRef.current.getPointerPosition().y,
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
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={(e) => handleMouseUp(e)}
      >
        <Layer>
          <Group>
            {
              // drawingLine === true
              //   ? connections.map((line) => (
              //       <Line key={line.id} points={line.points} stroke="black" />
              //     ))
              //   :
              // connections.map((line) => {
              //   const from = smallCircles.find((s) => s.id === line.from);
              //   const to = smallCircles.find((s) => s.id === line.to);
              //   try {
              //     console.log(line.points, [from.x, from.y, to.x, to.y]);
              //   } catch (e) {
              //     console.log(e);
              //   }
              //   return drawingLine ? (
              //     <Line key={line.id} points={line.points} stroke="black" />
              //   ) : (
              //     <Line
              //       key={line.id}
              //       // points={[from.x, from.y, to.x, to.y]}
              //       points={[from.x, from.y, to.x, to.y]}
              //       stroke="black"
              //     />
              //   );
              // })
            }
            {connections.map((line) => {
              if (line.to) {
                const from = smallCircles.find((s) => s.id === line.from);
                const to = smallCircles.find((s) => s.id === line.to);
                return (
                  <Line
                    key={line.id}
                    points={[from.x, from.y, to.x, to.y]}
                    stroke="black"
                  />
                );
              } else {
                return (
                  <Line key={line.id} points={line.points} stroke="black" />
                );
              }
            })}

            {circles.map((image) => {
              return (
                <CircleWithText image={image} updatePosition={updatePosition} />
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

export default DropStage;
