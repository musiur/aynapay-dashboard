import { A__GET__RefundSessionRetrive } from "../../_utils/refund/_utils/actions";
import RefundSubmit from "../../_utils/refund/refund-submit";

const Page = async ({
  searchParams,
}: {
  searchParams: { sessionId: string };
}) => {
  const result = await A__GET__RefundSessionRetrive(
    searchParams?.sessionId || "dummy"
  );
  return <RefundSubmit sessionId={searchParams?.sessionId || ""} />;
};

export default Page;
