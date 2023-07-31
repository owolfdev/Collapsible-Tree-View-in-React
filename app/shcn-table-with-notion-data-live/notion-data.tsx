import React from "react";

import {
  getProcessedNotionData,
  getNotionData,
} from "@/utils/notion-data-utils";

async function NotionData() {
  const notionData = await getProcessedNotionData();
  const notionData2 = await getNotionData();
  // const transformedNotionData = transformNotionData(notionData);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {notionData?.map((item: any) => (
          <div key={item.id}>
            <div>Key tester: {item.name}</div>
            <div>Key tester: {JSON.stringify(item.notes)}</div>

            <div className="flex flex-col">
              {Object.keys(item).map((key) => (
                <div>{key}</div>
              ))}
            </div>
            <div>{JSON.stringify(item)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotionData;
