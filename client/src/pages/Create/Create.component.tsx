import React from "react";
import { useParams } from "react-router-dom";

function Create() {
  const { id } = useParams();

  return <div>{id}</div>;
}

export default Create;
