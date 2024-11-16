import { DataTable } from "@/app/_utils/data-table/data-table";
import { A__GET__Customers } from "./action";
import { __Columns__Customers } from "./customers.column";

const GetCustomers = async () => {
  const result = await A__GET__Customers();
  const formattedData = result?.data?.users?.map((user: any) => {
    const { id, auth, wallet } = user;
    const { name, email, status } = auth;
    const { balance } = wallet;
    return {
      id,
      name,
      email,
      status,
      balance,
    };
  });
  return (
    <DataTable
      columns={__Columns__Customers}
      data={formattedData || []}
      searchKey="Email"
      className="min-w-[700px]"
    />
  );
};
export default GetCustomers;
