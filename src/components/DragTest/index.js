import React from "react";

import Headers from "./Headers";
import DropStage from "./DropStage";
import "./Canvasdnd.scss";

class DragTest extends React.Component {
  constructor() {
    super();
    this.state = {
      dragText: "",
    };
  }

  getDragText = (text) => {
    this.setState({
      dragText: text,
    });
  };

  render() {
    return (
      <div className="ml-10 mr-10">
        <h1 style={{ textAlign: "center" }}>
          Drag and Drop from the headers. Click two elements to connect them
          together
        </h1>
        <Headers getDragText={this.getDragText} />
        <DropStage dragText={this.state.dragText} />
      </div>
    );
  }
}

export default DragTest;
