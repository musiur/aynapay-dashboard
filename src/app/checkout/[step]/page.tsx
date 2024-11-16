import { ReactElement } from "react";
import AmountForm from "../utils/forms/amount.form";
import MethodsForm from "../utils/forms/methods.form";
import TransactionForm from "../utils/forms/transaction";
import ReceiverForm from "../utils/forms/receiver.form";
import ConfirmationForm from "../utils/forms/confirmation";

const Page = ({ params }: { params: { step: string } }) => {
  //   @ts-ignore
  return params?.step ? Forms[params.step] : null;
};

export default Page;

const Forms: {
  amount: ReactElement;
  methods: ReactElement;
  receiver: ReactElement;
  transaction: ReactElement;
  confirmation: ReactElement;
} = {
  amount: <AmountForm />,
  methods: <MethodsForm />,
  receiver: <ReceiverForm />,
  transaction: <TransactionForm />,
  confirmation: <ConfirmationForm />,
};
