"use client";
// import { log } from "console";
import React, { useState } from "react";

// Define the structure of an item in your data
type Item = {
  name: string;
  id: string;
  parent: string | null;
  subItems?: Item[];
};

// NestedItem is an extension of Item that includes an array of its children
type NestedItem = Item & { children: NestedItem[] };

// This function converts an array of Items into a hierarchical structure of NestedItems
const buildNestedStructure = (items: Item[]): NestedItem[] => {
  const itemMap: { [id: string]: NestedItem } = {};

  // First pass: add all items to the map
  items.forEach((item) => {
    itemMap[item.id] = {
      ...item,
      children: [],
    };
  });

  // Second pass: attach children to their parents
  items.forEach((item) => {
    if (item.parent) {
      itemMap[item.parent]?.children.push(itemMap[item.id]);
    }
  });

  // Return the array of top-level items
  return items.filter((item) => !item.parent).map((item) => itemMap[item.id]);
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
          <div key={child.id}>
            {child.subItems && child.subItems.length > 0 ? (
              <RenderItem key={child.id} item={child} depth={depth + 1} />
            ) : (
              <div className="border rounded w-[200px] py-2 bg-blue-50 ml-2">
                <RenderItem key={child.id} item={child} depth={depth + 1} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

interface NotionDataTreeProps {
  data: Item[] | undefined;
}

export default function NotionDataTree({ data }: any) {
  // console.log("data from notion data tree", data);

  // Build the nested structure from your flat data
  const nestedData = buildNestedStructure(data || []);

  // console.log("nestedData", nestedData);

  // Render the top-level items, passing a depth of 0
  return (
    <div className="bg-white">
      {nestedData.map((item) => (
        <RenderItem key={item.id} item={item} depth={0} />
      ))}
    </div>
  );
}
