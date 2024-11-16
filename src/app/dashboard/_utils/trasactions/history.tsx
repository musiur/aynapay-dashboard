import { ArrowUp } from "lucide-react";
import { A__GET__TransactionsHistory } from "./actions";

interface Transaction {
    amount: number;
    currency: string;
    transactionType: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    eventType: string;
    subEventType: string | null;
    consumerRole: 'ADMIN' | 'PLATFORM' | 'RECEIVER';
}

const TransactionsHistory = async ({ id }: { id: string }) => {
    const result = await A__GET__TransactionsHistory(id);
    return (
        <div className="w-full pt-10">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">LATEST ACTIVITY</h2>
            <div className="space-y-3">
                {result?.data?.length ? result.data.map((transaction: Transaction, index: number) => {

                    return (
                        <div
                            key={index}
                            className="p-4 bg-white rounded-lg border border-gray-200"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold flex items-center gap-2">
                                        <span className="pl-3 pr-2 py-1 bg-gray-100 rounded-lg flex items-center justify-center gap-1">{result?.data?.length - index}<ArrowUp className="w-4 h-4" /></span>
                                        {transaction.eventType} - {transaction.subEventType}</h4>
                                    <p className="text-sm text-gray-800">
                                        {transaction.description}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(transaction.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium">
                                        {transaction.amount} {transaction.currency}
                                    </span>
                                    {transaction.eventType === 'PAYMENT_CONFIRMED' && (
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                            200 OK
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }) : <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-800">No logs found</p>
                </div>}
            </div>
        </div>
    );
}

export default TransactionsHistory;