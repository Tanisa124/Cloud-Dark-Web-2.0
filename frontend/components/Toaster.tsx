import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {};

const ToasterMUI = (props: Props) => {
  return (
    <Toaster {...props}>
      {(t) => (
        <div
          style={{
            opacity: t.visible ? 1 : 0,
            background: "black",
            padding: 8,
          }}
        ></div>
      )}
    </Toaster>
  );
};

export default ToasterMUI;
