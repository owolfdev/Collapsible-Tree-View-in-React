"use client";
// import { log } from "console";
import React, { useState } from "react";

// Define the structure of an item in your data
type Item = {
  name: string;
  id: string;
  parent: string | null;
};

// NestedItem is an extension of Item that includes an array of its children
type NestedItem = Item & { children: NestedItem[] };

// This function converts an array of Items into a hierarchical structure of NestedItems
const buildNestedStructure = (items: Item[]): NestedItem[] => {
  // console.log("build nested structure");

  const itemMap: { [id: string]: NestedItem } = {};

  console.log("itemMap", itemMap);

  // Function to create a NestedItem from an Item;
  const createNestedItem = (item: Item): NestedItem => ({
    ...item,
    children: [],
  });

  // Build the itemMap and construct the tree structure
  items.forEach((item) => {
    itemMap[item.id] = createNestedItem(item);

    if (item.parent) {
      itemMap[item.parent].children.push(itemMap[item.id]);
    }
  });

  // Return the array of top-level items, each of which has its children nested within it
  return items.filter((item) => !item.parent).map((item) => itemMap[item.id]);
  //
};

// This component takes a NestedItem and a depth, and renders the item and its children
const RenderItem: React.FC<{ item: NestedItem; depth: number }> = ({
  item,
  depth,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const paddingStyle = { paddingLeft: `${depth * 20}px` };

  // Check if the item has children or not
  const hasChildren = item.children.length > 0;

  return (
    <div style={paddingStyle}>
      {hasChildren ? (
        <button onClick={handleToggle}>
          {isExpanded ? "▼" : "►"} {item.name}
        </button>
      ) : (
        <div>
          <a href="http://google.com">{item.name}</a>
        </div>
      )}
      {isExpanded &&
        item.children.map((child) => (
          <RenderItem key={child.id} item={child} depth={depth + 1} />
        ))}
    </div>
  );
};

export default function MainComponent() {
  // This is your initial flat data structure
  const data: Item[] = [
    { name: "Electronics", id: "1", parent: null },
    { name: "Furniture", id: "2", parent: null },
    { name: "Smartphones", id: "3", parent: "1" },
    { name: "Laptops", id: "4", parent: "1" },
    { name: "Chairs", id: "5", parent: "2" },
    { name: "Gaming Laptops", id: "6", parent: "4" },
    { name: "iPhone", id: "7", parent: "3" },
    { name: "MacBook Pro", id: "8", parent: "4" },
    { name: "Office Chairs", id: "9", parent: "5" },
    { name: "Dining Chairs", id: "10", parent: "5" },
    { name: "Recliners", id: "11", parent: "5" },
    { name: "Gaming Chairs", id: "12", parent: "5" }, // Corrected placement
  ];

  // Build the nested structure from your flat data
  const nestedData = buildNestedStructure(data);

  console.log("nestedData", nestedData);

  // Render the top-level items, passing a depth of 0
  return (
    <div className="bg-white">
      {nestedData.map((item) => (
        <RenderItem key={item.id} item={item} depth={0} />
      ))}
    </div>
  );
}
