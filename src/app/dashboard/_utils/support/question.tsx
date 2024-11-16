import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import DeleteSupport from "./delete";
import { ArrowUpRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Resolved from "./resolved";

type VARIANT =
  | "outline"
  | "default"
  | "destructive"
  | "secondary"
  | null
  | undefined;

const SupportQuestion = ({ data }: { data: any }) => {
  const { id, title, status, priority, message, createdAt } = data;
  const PRIORITY: {
    [key: string]: VARIANT;
  } = {
    LOW: "secondary",
    MEDIUM: "outline",
    HIGH: "destructive",
  };

  const STATUS: {
    [key: string]: VARIANT;
  } = {
    OPEN: "destructive",
    PENDING: "outline",
    CLOSED: "secondary",
  };

  return (
    <div className="w-full p-4 rounded-lg space-y-4 relative bg-white">
      <div className="absolute top-1 right-1 z-1 flex items-center gap-1">
        {priority ? (
          <Badge
            variant={
              PRIORITY[priority as keyof typeof PRIORITY] || PRIORITY.LOW
            }
          >
            {priority}
          </Badge>
        ) : null}
        {status ? (
          <Badge variant={STATUS[status as keyof typeof STATUS] || STATUS.OPEN}>
            {status}
          </Badge>
        ) : null}
      </div>
      <div className="space-y-2 py-4">
        <h4 className="font-bold">{title}</h4>
        <span className="text-xs text-gray-500">
          {format(new Date(createdAt), "PPP")}
        </span>
        {/* <p>{message || "No description"}</p> */}
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2 border-t pt-4">
        <DeleteSupport id={id} />
        {status !== "CLOSED" ? <Resolved id={id} /> : null}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/dashboard/support/view?id=${id}`}
                className="w-9 h-9 flex items-center justify-center border rounded-md"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Let&apos;s resolve</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SupportQuestion;
