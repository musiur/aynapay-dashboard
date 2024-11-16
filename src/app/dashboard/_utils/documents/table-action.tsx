"use client";
import ActionColumn from "@/app/_utils/data-table/action-column";
import { A__DELETE__Document } from "./actions";
import { getCookie } from "@/lib/utils";
import { useState, useEffect } from "react";

const TableAction = ({ row }: { row: any }) => {
  const [access, setAccess] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = getCookie("role") || null;
      if (role && ["ADMIN", "MODERATOR"].includes(role)) {
        setAccess(true);
      }
    }
  }, []);
  return (
    <ActionColumn
      basePath="/dashboard/documents"
      id={row.original.id || "dummy__id"}
      action={A__DELETE__Document}
      // view={false}
      update={access}
      remove={access}
    />
  );
};

export default TableAction;
