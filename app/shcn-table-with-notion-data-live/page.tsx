import React from "react";
import { DataTableDemo } from "./Table";
import NotionData from "./notion-data";

const ParentComponent = () => {
  return (
    <div className="p-5">
      <div>
        <h2 className="font-bold text-2xl">Tasks and Issues</h2>
      </div>
      <div>
        <DataTableDemo />
      </div>
      <div>{/* <NotionData /> */}</div>
    </div>
  );
};

export default ParentComponent;
