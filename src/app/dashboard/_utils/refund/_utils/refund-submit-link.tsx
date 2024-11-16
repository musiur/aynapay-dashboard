"use client"

import { Button } from "@/components/ui/button"
import { getCookie } from "@/lib/utils";
import Link from "next/link"

const RefundSubmitLink = ({ sessionId }: { sessionId: string }) => {
    const role = getCookie("role");
    if (role !== "RECEIVER") return null;
    return (
        <Link href={`/dashboard/refund/submit-transaction-information?sessionId=${sessionId}`}>
            <Button>Submit Info</Button>
        </Link>
    )
}

export default RefundSubmitLink