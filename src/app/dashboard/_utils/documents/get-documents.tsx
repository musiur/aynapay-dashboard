import { DataTable } from "@/app/_utils/data-table/data-table";
import { __Columns__Document } from "./document.column";
import { A__GET__Documents } from "./actions";

const GetDocument = async () => {
  const result = await A__GET__Documents();

  return (
    <DataTable
      columns={__Columns__Document}
      data={result?.data?.documents || []}
      searchKey="Document Type"
      className="min-w-[700px]"
    />
  );
};
export default GetDocument;
