import { getNotionData } from "@/utils/notion-data-utils";
import NotionDataTree from "@/components/notion-data-tree";
import NotionDataTable from "@/components/shcn-notion-data-table";

export default async function MainComponent() {
  const data = await getNotionData();

  return (
    <div className="bg-white p-5">
      {/* <h2 className="font-bold text-xl">Data Table</h2> */}
      {/* <NotionDataTable /> */}

      <h2 className="font-bold text-xl">Data Tree</h2>
      <div className="flex flex-col gap-y-4">
        <NotionDataTree data={data} />
      </div>
    </div>
  );
}
