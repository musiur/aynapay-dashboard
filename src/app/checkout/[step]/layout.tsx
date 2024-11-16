"use client";

import { ReactElement } from "react";
import StepBar, {
  Data__CheckoutSteps,
  T__StepStatus,
} from "../utils/components/step-bar";
import { useParams } from "next/navigation";

const Layout = ({ children }: { children: ReactElement }) => {
  const params: any = useParams();
  return (
    <div className="container section">
      <div className="grid grid-cols-1 max-w-[1000px] mx-auto p-4 lg:p-8 rounded-md lg:rounded-2xl bg-white shadow-sm gap-4">
        <div className="flex flex-wrap items-center gap-0 pl-[20px]">
          {Data__CheckoutSteps.map((item) => {
            const { id, step, link } = item;
            let status: T__StepStatus = StatusMiner(params, id);

            return <StepBar key={id} step={step} link={link} status={status} />;
          })}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

const StatusMiner = (params: any, id: number) => {
  let status: T__StepStatus = "todo";
  if (params?.step) {
    const currentStepId =
      Data__CheckoutSteps.filter((c__step) => c__step.step == params?.step)[0]
        ?.id || 1;

    if (currentStepId === id) {
      status = "in-progress";
    } else if (currentStepId > id) {
      status = "completed";
    } else {
      status = "todo";
    }
  }

  return status;
};
