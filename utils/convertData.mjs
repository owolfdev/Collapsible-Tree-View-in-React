import fs from "fs";
import { notionData } from "../data/notion-data2.mjs";

function convertData(notionData) {
  const dataMap = notionData.reduce((map, item) => {
    map[item.id] = {
      ...item,
      children: [],
      parent: item.parent || null,
    };
    return map;
  }, {});

  const result = [];
  Object.values(dataMap).forEach((item) => {
    if (item.parent) {
      dataMap[item.parent].children.push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}

function toJS(object) {
  const type = typeof object;
  if (
    type === "string" ||
    type === "number" ||
    type === "boolean" ||
    object === null
  ) {
    return JSON.stringify(object);
  } else if (Array.isArray(object)) {
    return `[${object.map(toJS).join(", ")}]`;
  } else {
    const props = Object.entries(object)
      .map(([key, value]) => `${key}: ${toJS(value)}`)
      .join(", ");
    return `{${props}}`;
  }
}

// Usage
const convertedData = convertData(notionData);

// Write to file
fs.writeFile(
  "data/notion-data2-converted.js",
  `export const notionData = ${toJS(convertedData)}`,
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);
