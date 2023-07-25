import { NotionData } from "@/types/notion-data.interface";

export const getNotionData = async () => {
  console.log("getNotionData");
  try {
    const response = await fetch(
      "https://notion-api-for-hyperreal.vercel.app/api/notion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          database_id: "bb7e4b1040b446a9ba8298cdd93d28d8",
        }),
      }
    );

    if (response.ok) {
      console.log("response.ok");
      const data = await response.json();
      const processedNotionData = processNotionData(data.results);
      console.log("processedNotionData: ", processedNotionData);
      return processedNotionData;
    } else {
      throw new Error("Failed to fetch Notion data");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
  }
};

export const processNotionData = (data: NotionData[]) => {
  const processedData = data.map((item) => {
    const processedItem = {
      id: item.id,
      name: item.properties.Name.title[0].plain_text,
      parent: item.properties["Parent item"].relation[0]?.id,
      subItems: item.properties["Sub-item"].relation.map((subItem) => {
        return subItem.id;
      }),
    };
    return processedItem;
  });
  return processedData;
};
