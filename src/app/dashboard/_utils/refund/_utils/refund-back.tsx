"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const RefundBack = () => {
  const [link, setLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const from = localStorage.getItem("__from");
      from && setLink(from);
    }
  }, []);

  return (
    <Link href={link}>
      <Button variant="outline" className="gap-2">
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>
    </Link>
  );
};

export default RefundBack;
