import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { A__GET__RefundDetails } from "./_utils/actions";
import RefundBack from "./_utils/refund-back";
import RefundAccept from "./_utils/refund-accept";
import RefundApprove from "./_utils/refund-approve";
import RefundSubmitLink from "./_utils/refund-submit-link";
import TransactionsHistory from "../trasactions/history";

const RefundView = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const result = await A__GET__RefundDetails(searchParams?.id || "");

  const data = result?.data || {
    id: "66df51ebe1dd2ee408d4977b",
    amount: 100,
    processFess: 3,
    referenceTransactionId: "66dc0daabfa80999568a5a03",
    platformPaymentMethodId: "668ec9848872303a38e59907",
    status: "Pending",
    accountType: "PERSONAL_ACCOUNT",
    bankNumberOrAddress: "1234567890",
    paidBy: null,
    paymentProofScreenShot: "",
    paymentTxnId: "",
    paymentUserSource: "",
    refundReason: "Product defect",
    activeSession: "",
    note: "",
    createdAt: "2024-09-09T19:52:11.485Z",
    updatedAt: "2024-09-09T19:52:11.485Z",
  };

  const actions: { [key: string]: React.ReactNode } = {
    WaitingForConfirmation: <RefundApprove id={data?.id} />,
    Pending: <RefundAccept id={data?.id} />,
    Hold: <RefundSubmitLink sessionId={data?.activeSession} />
  }

  return (
    <div className="flex flex-col gap-4 p-6 max-w-4xl w-full mx-auto">
      <Card className="w-full p-4 bg-none border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="col-span-2">
              <p className="font-semibold">Transaction ID</p>
              <p>{data?.id}</p>
            </div>
            <div>
              <p className="font-semibold">Amount(BDT)</p>
              <p>{data?.amount}</p>
            </div>
            <div>
              <p className="font-semibold">Process Fees(BDT)</p>
              <p>{data?.processFess}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p>{data?.status}</p>
            </div>
            <div>
              <p className="font-semibold">Account Type</p>
              <p>{data?.accountType}</p>
            </div>
            <div>
              <p className="font-semibold">Reference Transaction ID</p>
              <p>{data?.referenceTransactionId}</p>
            </div>
            <div>
              <p className="font-semibold">Platform Payment Method ID</p>
              <p>{data?.platformPaymentMethodId}</p>
            </div>
            <div>
              <p className="font-semibold">Bank Number/Address</p>
              <p>{data?.bankNumberOrAddress}</p>
            </div>
            <div>
              <p className="font-semibold">Paid By</p>
              <p>{data?.paidBy ?? "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Payment Proof Screenshot</p>
              <p>{data?.paymentProofScreenShot || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Payment Transaction ID</p>
              <p>{data?.paymentTxnId || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Payment User Source</p>
              <p>{data?.paymentUserSource || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Refund Reason</p>
              <p>{data?.refundReason}</p>
            </div>
            <div>
              <p className="font-semibold">Active Session</p>
              <p>{data?.activeSession || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Note</p>
              <p>{data?.note || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Created At</p>
              <p>{new Date(data?.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Updated At</p>
              <p>{new Date(data?.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-start gap-2">
          <RefundBack />
          {
            actions[data?.status || "Pending"]
          }
        </CardFooter>
      </Card>
      <TransactionsHistory id={data?.id} />
    </div>
  );
};

export default RefundView;
