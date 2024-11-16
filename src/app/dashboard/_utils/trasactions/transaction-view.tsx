
import TransactionsHistory from "./history";
import TransactionInfo from "./transaction-info";



const TransactionView = async ({
    searchParams,
    data,
}: {
    searchParams: { id: string };
    data: any;
}) => {
    
    return (
        <div className="grid grid-cols-1 gap-4 max-w-4xl w-full p-6 mx-auto">
            {
                data ? <TransactionInfo data={data} />: null
            }
            <TransactionsHistory id={searchParams?.id || ""} />
        </div>
    );
};



export default TransactionView;