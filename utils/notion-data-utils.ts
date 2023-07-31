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
      // console.log("response.ok");
      const data = await response.json();
      // const processedNotionData = processNotionData(data.results);
      // console.log("processedNotionData: ", processedNotionData);
      // const transformedData = transformNotionData(processedNotionData);
      return data.results;
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
      name: item.properties.Name?.title[0]?.plain_text,
      parent: item.properties["Parent item"]?.relation[0]?.id,
      priority: item.properties.Priority?.status?.name,
      links: item.properties.Links?.rich_text.map((linkItem) => {
        return linkItem.href || linkItem.plain_text;
      }),
      type: item.properties.Type?.select?.name,
      assignedTo: item.properties["Assigned to"]?.people.map((person) => {
        return person.id;
      }),
      description: item.properties.Description?.rich_text[0]?.plain_text,
      notes: item.properties.Notes?.rich_text.map((note) => {
        return note.text?.content; // Access the content via note.text.content
      }),
      subItems: item.properties["Sub-item"]?.relation.map((subItem) => {
        return subItem.id;
      }),
      tags: item.properties.Tags?.multi_select.map((tag) => {
        return tag.name;
      }),
      dueDate: item.properties["Due Date"]?.date?.start,
      filesAndMedia: item.properties["Files & media"]?.files.map((file) => {
        return file.name;
      }),
      status: item.properties.Status?.status?.name,
      publicUrl: item.public_url,
    };
    return processedItem;
  });
  return processedData;
};

// export const processNotionData = (data: NotionData[]) => {
//   const processedData = data.map((item) => {
//     const processedItem = {
//       id: item.id,
//       name: item.properties.Name.title[0].plain_text,
//       parent: item.properties["Parent item"].relation[0]?.id,
//       subItems: item.properties["Sub-item"].relation.map((subItem) => {
//         return subItem.id;
//       }),
//     };
//     return processedItem;
//   });
//   return processedData;
// };

//transform data to tree
interface DataItem {
  id: string;
  name: string;
  parent: string;
  subItems: string[];
  priority: string;
  links: string[];
  type: string;
  assignedTo: string[];
  description: string;
  notes: string[];
  tags: string[];
  dueDate?: string;
  filesAndMedia: string[];
  status: string;
  publicUrl: string | null; // It can be either string or null
}

export interface TransformedData extends DataItem {
  children: TransformedData[];
}

export function transformNotionData(
  data: DataItem[] | undefined
): TransformedData[] {
  if (!data) {
    return [];
  }

  const dataMap = data.reduce<Record<string, TransformedData>>((map, item) => {
    map[item.id] = {
      ...item,
      children: [],
    };
    return map;
  }, {});

  const result: TransformedData[] = [];
  Object.values(dataMap).forEach((item: TransformedData) => {
    if (item.parent && dataMap[item.parent]) {
      dataMap[item.parent].children.push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}

function toJS(object: any): string {
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

export const getProcessedNotionData = async () => {
  const data = await getNotionData();
  const processedData = processNotionData(data);
  const transformedData = transformNotionData(processedData);
  return transformedData;
};
