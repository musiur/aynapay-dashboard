"use client";

import { useRef, useState } from "react";
import { io } from "socket.io-client";
// import { Switch } from "../ui/switch";

function SocketToggler({ token, domain }: { token: string; domain: any }) {
  const newSocket = useRef(
    io(domain, {
      auth: {
        token: token,
        AppName: "pgw",
      },
    })
  );

  const [active, setActive] = useState(newSocket.current.active || false);

  const connect = () => {
    !newSocket.current.active && newSocket.current.on("connect", () => {});
  };

  const disconnect = () => {
    newSocket.current.disconnect();
  };

  return (
    <>
      {/* <Switch
      checked={active}
      onCheckedChange={() => {
        if (newSocket.current.active) {
          disconnect();
          setActive(false);
        } else {
          connect();
          setActive(true);
        }
      }}
    /> */}
      <button
        onClick={() => {
          if (newSocket.current.active) {
            disconnect();
            setActive(false);
          } else {
            connect();
            setActive(true);
          }
        }}
      >
        {active ? "on" : "off"}
      </button>
    </>
  );
}

export default SocketToggler;
