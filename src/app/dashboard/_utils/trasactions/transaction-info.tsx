const TransactionInfo = async ({ data }: { data: any }) => {
    const { id, status, amount, paymentMethodTitle, paymentMethodNumberOrAddress, transactionSource, gatewayFees, createdAt, description } = data;
    return <div>
        <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>

        <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <InfoItem label="Transaction ID" value={id} />
                <InfoItem label="Status" value={status} />
                <InfoItem label="Amount" value={`BDT ${amount}`} />
                <InfoItem label="Payment Method" value={paymentMethodTitle} />
                <InfoItem label="Account Number" value={paymentMethodNumberOrAddress} />
                <InfoItem label="Transaction Source" value={transactionSource} />
                <InfoItem label="Gateway Fees" value={`BDT ${gatewayFees}`} />
                <InfoItem
                    label="Created At"
                    value={new Date(createdAt).toLocaleString()}
                />
            </div>

            <div className="mt-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    </div>;
};

const InfoItem = ({ label, value }: { label: string; value: string | number }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);


export default TransactionInfo;