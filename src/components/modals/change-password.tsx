"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form";
import { z } from "zod";
import InputX from "../molecules/input.x";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { A__POST__ChangePassword } from "@/app/actions";
import { useState } from "react";
import ResponseX from "../molecules/response.x";
import SubmitX from "../molecules/submit.x";

const FormSchema = z.object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(1),
});

export function ChangePasswordModal() {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });



    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const response = await A__POST__ChangePassword(data);
        ResponseX({ title: "Change Password", result: response });
        if (response.success) {
            setIsOpen(false);
            form.reset();
        }
    }



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    Change your password
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle>Change your password</DialogTitle>
                    <DialogDescription>
                        Change your password
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className=" py-4">
                            <InputX form={form} name="oldPassword" type="password" label="Old Password" placeholder="********" />
                            <InputX form={form} name="newPassword" type="password" label="New Password" placeholder="********" />
                        </div>
                        <DialogFooter>
                            <SubmitX
                                pending={form.formState.isSubmitting}
                                text="Change Password"
                                className="w-full"
                            />
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
