import clsx from "clsx";
import Link from "next/link";

enum E__CheckoutSteps {
  Amount = "amount",
  Methods = "methods",
  Receiver = "receiver",
  Transaction = "transaction",
  Confirmation = "confirmation",
  Complete = "complete",
}

export type T__StepStatus = "completed" | "in-progress" | "todo";

export type T__StepProps = {
  step: E__CheckoutSteps;
  status: T__StepStatus;
  link: string;
};

const StepBar = ({
  step = E__CheckoutSteps.Amount,
  status = "todo",
  link = "/dashboard/amount",
}: T__StepProps) => {
  const All__Status = {
    inProgress: status === "in-progress",
    completed: status === "completed",
    todo: status === "todo",
  };

  return (
    <Link
      href={status === "todo" ? "" : link}
      className="inline-block -ml-[20px]"
    >
      <div className="inline-flex items-center">
        <div
          className={clsx(
            "h-[20px] w-0 border-t-[15px] border-b-[14px] border-l-[12px] border-l-transparent",
            {
              "border-y-primary": All__Status.inProgress,
              "border-y-gray-500": All__Status.completed,
              "border-y-primary-gray-200": All__Status.todo,
            }
          )}
        ></div>
        <div
          className={clsx(
            "font-medium h-[29px] px-4  items-center justify-center text-sm inline-flex capitalize",
            {
              "bg-primary text-white": All__Status.inProgress,
              "bg-gray-500 text-white": All__Status.completed,
              "bg-gray-200 text-gray-500": All__Status.todo,
            }
          )}
        >
          {step}
        </div>
        <div
          className={clsx(
            "h-[20px] w-6 border-t-[15px] border-b-[14px] border-y-transparent border-l-[12px]  ",
            {
              "border-l-primary": All__Status.inProgress,
              "border-l-gray-500": All__Status.completed,
              "border-l-primary-gray-200": All__Status.todo,
            }
          )}
        ></div>
      </div>
    </Link>
  );
};

export default StepBar;

export const Data__CheckoutSteps = [
  {
    id: 1,
    step: E__CheckoutSteps.Amount,
    link: "/checkout/amount",
  },
  {
    id: 2,
    step: E__CheckoutSteps.Methods,
    link: "/checkout/methods",
  },
  {
    id: 3,
    step: E__CheckoutSteps.Receiver,
    link: "/checkout/receiver",
  },
  {
    id: 4,
    step: E__CheckoutSteps.Transaction,
    link: "/checkout/transaction",
  },
  {
    id: 5,
    step: E__CheckoutSteps.Confirmation,
    link: "/checkout/confirmation",
  },
  {
    id: 6,
    step: E__CheckoutSteps.Complete,
    link: "/checkout/complete",
  },
];
