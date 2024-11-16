"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const MethodSelector = ({
  defaultValue = "",
  handler,
  options,
  amount = 1,
}: {
  defaultValue: any;
  handler: Function;
  options: any;
  amount?: number;
}) => {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <div className="max-h-[50dvh] overflow-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((option: any) => {
          const { id, icon, providerName, providerType } = option;
          const rate = option?.exchangeRate || 1;
          return (
            <div
              key={id}
              role="button"
              onClick={() => {
                setSelected(id);
                handler(id);
              }}
              className={clsx(
                "border-2 rounded-md p-2 flex flex-col items-center justify-center gap-2 text-[12px]",
                {
                  "border-primary": selected === id,
                }
              )}
            >
              <Image
                src={icon || "/vercel.svg"}
                alt=""
                width={500}
                height={500}
                className="w-full h-auto min-h-12 rounded-md"
              />
              {providerType === "CRYPTO" ? (
                <div className="w-full grid grid-cols-1 text-[10px] text-center">
                  <span>
                    1 {providerName} = {rate} BDT
                  </span>
                  <span className="px-[8px] py-[2px] bg-primary text-white rounded font-semibold">
                    {providerName} {(amount / rate).toFixed(2)}
                  </span>
                </div>
              ) : (
                providerName
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MethodSelector;
