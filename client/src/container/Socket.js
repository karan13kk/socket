import React, { Component } from "react";
import { connect } from "react-redux";
import { SocketioComponent } from "../component/Socket";
class Socketio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      socket: require("socket.io-client")("http://192.168.0.113:8000"),
      myId: "",
      connectedUsers: [],
      existingUsers: [],
      selectedUser: ""
    };
  }
  componentDidMount() {
    let self = this;
    let socket = self.state.socket;
    // let selectedUser = self.state.selectedUser;
    socket.on("connect", function(data) {
      console.log(data, "connected");
    });
    socket.on("event", function(data) {
      console.log(data);
    });
    socket.on("disconnect", function(data) {
      console.log(data);
    });
    socket.on("message", function(data) {
      if (data.id) {
        let msg = self.state.messageList;
        msg.push({
          id: data.id,
          message: data.msg || ""
        });
        self.setState({ messageList: msg });
      }
    });
    socket.on("connected-users", function(data) {
      self.setState({ connectedUsers: data });
    });
    socket.on("existing-users", function(data) {
      self.setState({ existingUsers: data });
    });
    socket.on("private-message", function(data) {
      console.log(data);
      if (data.id) {
        let msg = self.state.messageList;
        msg.push({
          id: data.id,
          message: data.msg || ""
        });
        self.setState({ messageList: msg });
      }
    });
  }
  sendMessage = e => {
    let msg = e.target.msg.value;
    let selectedUser = this.state.selectedUser;
    if (selectedUser) {
      console.log("message sent");
      this.state.socket.emit("private-message", selectedUser, msg);
    } else console.log("no selected user");
  };
  setStateFunc = ({ key, value }) => {
    this.setState({ [key]: value });
  };
  render() {
    return (
      <>
        My socket page <br></br>
        <SocketioComponent
          {...this.state}
          sendMessage={this.sendMessage}
          setStateFunc={this.setStateFunc}
        ></SocketioComponent>
      </>
    );
  }
}

function mapStateToProps({ demo }) {
  return { demo };
}
export default connect(mapStateToProps)(Socketio);
