"use client";
import ResponseX from "@/components/molecules/response.x";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sun, TrashIcon } from "lucide-react";
import { useState } from "react";

const Deleter = ({ action, id = "ddd" }: { action: Function; id: string }) => {
  const [pending, setPending] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const deleteFetch = async () => {
    setPending(true);
    const result = await action(id);
    ResponseX({ title: "Deletion", result });
    setPending(false);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="btn___icon group md:cursor-pointer">
          {pending ? (
            <Sun className="w-4 h-4 animate-spin" />
          ) : (
            <TrashIcon className="h-4 w-4 group-hover:stroke-pink-500" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="space-y-4" align="end">
        <div className="text-sm flex items-center gap-[4px]">
          Please type
          <span className="bg-pink-100 text-pink-600 font-semibold px-2 rounded-lg py-[2px] text-[12px]">
            DELETE
          </span>{" "}
          to delete
        </div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex items-center justify-end gap-2">
          <PopoverClose disabled={inputValue !== "DELETE"}>
            <div
              className="bg-gray-100 border h-8 px-4 min-w-[50px] text-[12px] flex items-center justify-center rounded-md"
              onClick={() => inputValue === "DELETE" && deleteFetch()}
            >
              Delete
            </div>
          </PopoverClose>
          <PopoverClose>
            <div className="bg-primary text-white border h-8 px-4 min-w-[50px] text-[12px] flex items-center justify-center rounded-md">
              Back
            </div>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Deleter;
