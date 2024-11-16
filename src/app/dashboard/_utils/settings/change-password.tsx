"use client";

import { ChangePasswordModal } from "@/components/modals/change-password";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ChangePassword(props: any) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Change your password
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ChangePasswordModal />
            </CardContent>
        </Card>
    )
}