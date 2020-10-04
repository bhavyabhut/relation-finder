import React from "react";
import tagColor from "./consts";

export default function StatusLabel({ status }) {
  let color = "#9b8e8e";
  let num = 0;
  if (status) {
    num = status?.charCodeAt(0) + status?.charCodeAt(status?.length - 1);
    color = tagColor[num % 16] ? tagColor[num % 16] : "#912525";
  }
  return (
    <>
      <span
        className="badge-pill text-capitalize text-white m-1"
        style={{ backgroundColor: color }}
      >
        {status || "Unknown"}
      </span>
    </>
  );
}
