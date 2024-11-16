import { cookies } from "next/headers";
import { A__GET__Document } from "../../_utils/documents/actions";
import DocumentView from "../../_utils/documents/document-view";
import RefundView from "../../_utils/refund/refund-view";
import { A__GET__SupportTicketSingle } from "../../_utils/support/actions";
import Conversation from "../../_utils/support/conversation";
import TransactionView from "../../_utils/trasactions/transaction-view";
import { A__GET__TransactionView } from "../../_utils/trasactions/actions";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string, type?: string };
}) => {
  const slug = params?.slug?.replaceAll("-", "");
  const uid = cookies().get("uid")?.value;

  const actions: { [key: string]: any } = {
    documents: A__GET__Document,
    support: A__GET__SupportTicketSingle,
    transactions: (id: string) => A__GET__TransactionView(id, searchParams?.type || "")
  };
  let result = null;
  if (actions[slug] && searchParams?.id) {
    result = await actions[slug](searchParams.id);
  }

  const components = {
    support: <Conversation data={result?.data} uid={uid || ""} />,
    refunds: <RefundView searchParams={searchParams} />,
    documents: <DocumentView data={result?.data} />,
    transactions: <TransactionView searchParams={searchParams} data={result?.data} />
  };
  const path = params.slug.replaceAll("-", "");
  return (
    //   @ts-ignore
    components[path || "support"]
  );
};
export default Page;
