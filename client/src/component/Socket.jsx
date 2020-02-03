import React from "react";

export const SocketioComponent = ({
  messageList,
  sendMessage,
  connectedUsers,
  existingUsers,
  selectedUser,
  setStateFunc
}) => {
  return (
    <div style={{ maxHeight: "400px", border: "1px solid black" }}>
      <div>Selected user is :{selectedUser}</div>
      <div style={{ maxHeight: "200px" }}>
        {messageList.map(val => {
          return (
            <li key={val.id + Math.random()}>
              <span>{val.id}</span>&nbsp;&nbsp; <span>{val.message}</span>
            </li>
          );
        })}
      </div>
      <div style={{ marginTop: "50px" }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage(e);
          }}
        >
          <input type="text" style={{ width: "100%" }} name="msg" />
          <br></br>
          <input
            type="submit"
            // name="msg"
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center"
            }}
          />
        </form>
      </div>
      <div style={{ marginTop: "100px", border: "3px solid black" }}>
        <span>Connected users</span>
        <div>
          {connectedUsers.map(val => {
            return (
              <div key={Math.random()}>
                <button
                  onClick={e => {
                    setStateFunc({
                      key: "selectedUser",
                      value: e.target.innerText
                    });
                  }}
                >
                  {val}
                </button>
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: "100px", border: "3px solid black" }}>
        <span>Existing users</span>
        <div>
          {existingUsers.map(val => {
            return (
              <div key={Math.random()}>
                <button
                  onClick={e => {
                    setStateFunc({
                      key: "selectedUser",
                      value: e.target.innerText
                    });
                  }}
                >
                  {val}
                </button>{" "}
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
