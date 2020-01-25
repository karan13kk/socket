import React, { Component } from "react";
import { connect } from "react-redux";
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Hola"
    };
  }
  render() {
    return <div>This is my first Demo Page</div>;
  }
}
function mapStateToProps({ demo }) {
  return { demo };
}
function mapDispatchToProps() {}
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
