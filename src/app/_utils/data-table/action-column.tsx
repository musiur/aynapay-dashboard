

/**
 * This is a reusable SSR component for table actions column
 * Here we have VIEW, EDIT, DELETE triggers
 */
"use client";


import { Eye, PenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Deleter from "./deleter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/utils";

const ActionColumn = ({
  action,
  basePath,
  id,
  view = true,
  update = true,
  remove = true,
}: {
  action?: Function;
  basePath: string;
  id: string;
  view?: boolean;
  update?: boolean;
  remove?: boolean;
}) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = getCookie("role");
      if (role) setRole(role);
    }
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/**
       * ___View___ trigger
       * By which we can view details of a particular row item details of table
       */}
      {view ? (
        <Link href={`${basePath?.split("?")[0]}/view?id=${id}`}>
          <Button size="icon" variant="outline">
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
      ) : null}

      {/**
       * ___Update___ trigger
       * By which we can update details of a particular row item details of table
       */}
      {update || (role && ["ADMIN", "MODERATOR"].includes(role)) ? (
        <Link href={`${basePath?.split("?")[0]}/update?id=${id}`}>
          <Button size="icon" variant="outline">
            <PenIcon className="h-4 w-4" />
          </Button>
        </Link>
      ) : null}
      {/**
       * ___Delete___ trigger
       * By which we can delete any particular row item of table
       */}
      {action && remove ? <Deleter action={action} id={id} /> : null}
    </div>
  );
};
export default ActionColumn;
