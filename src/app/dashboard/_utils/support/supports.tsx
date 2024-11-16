import CreateLink from "@/app/_utils/data-table/create-link";
import { A__GET__SupportTickets } from "./actions";
import SupportQuestion from "./question";

const Supports = async () => {
  const result = await A__GET__SupportTickets();
  
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between gap-10">
        <h2 className="font-bold text-lg md:text-xl">Support Tickets</h2>
        <CreateLink link="/dashboard/support/create" text="Create Support" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        {result?.data?.data?.length ? (
          result?.data?.data?.map((item: any) => {
            return (
              <div key={item.id}>
                <SupportQuestion data={item} />
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">
            No support tickets found
          </div>
        )}
      </div>
    </div>
  );
};

export default Supports;
