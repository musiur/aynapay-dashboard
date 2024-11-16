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
import { PlusIcon } from "lucide-react";
import InputX from "../molecules/input.x";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { A__POST__AddCustomer } from "@/app/actions";
import { useState } from "react";
import ResponseX from "../molecules/response.x";
import SubmitX from "../molecules/submit.x";

const FormSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    role: z.string().min(1),
});

export function AddUser() {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            role: "",
        },
    });



    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const response = await A__POST__AddCustomer(data);
        ResponseX({ title: "Add Customer", result: response });
        if(response.success) {
            setIsOpen(false);
            form.reset();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusIcon className="h-4 w-4" />
                    <span className="hidden md:inline-flex pl-1">Add Customer</span>
                </Button>
            </DialogTrigger>
            <DialogContent  className="sm:max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle>Add Customer</DialogTitle>
                    <DialogDescription>
                        Add a new customer to your platform.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <InputX form={form} name="name" type="text" label="Name" placeholder="John Doe" />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                
                                <div className="flex flex-col gap-2">
                                    <InputX form={form} name="phone" type="text" label="Phone Number" placeholder="081234567890" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputX form={form} name="role" type="select" label="Role" placeholder="Select a role" options={[{value: 'RECEIVER', label: 'RECEIVER'}, {value: 'MODERATOR', label: 'MODERATOR'}, {value: 'PLATFORM', label: 'PLATFORM'}]} />

                                </div>

                            </div>
                            <div className="flex flex-col gap-2">
                                <InputX form={form} name="email"  label="Email" placeholder="johndoe@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputX form={form} name="password" type="password" label="Password" placeholder="********" />
                            </div>
                        </div>
                        <DialogFooter>
                            <SubmitX
                                pending={form.formState.isSubmitting}
                                text="Add User"
                                className="w-full"
                            />
                        </DialogFooter>     
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
