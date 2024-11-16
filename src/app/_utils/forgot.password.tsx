'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import SubmitX from "@/components/molecules/submit.x";
import ResponseX from "@/components/molecules/response.x";
import BrandLogo from "@/components/assets/brand";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { A__POST__ForgetPassword, A__POST__ResetPassword } from "../actions";



const FormSchema = z.object({
    newPassword: z.string().min(1),
    otp: z.string().min(6),
});

export default function ForgotPassword({ setIsForgotOpen, isForgotOpen }: { setIsForgotOpen: any, isForgotOpen: boolean }) {
    const [step, setStep] = useState(0);
    const [sessionId, setSessionId] = useState('');


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { otp: '', newPassword: "" },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const result = await A__POST__ResetPassword(data, sessionId);
        if (result.success) {
            ResponseX({ title: "Forget Password", result });
            setIsForgotOpen(false);
        } else {
            ResponseX({ title: "Forget Password", result });
        }
    }



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-[280px] w-[360px]"
            >
                <Card>
                    <CardHeader>
                        <BrandLogo className="max-w-[120px] mx-auto max-h-[60px]" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {
                            step === 0 ? <EmailSection setSessionId={setSessionId} setStep={setStep} /> :
                                <>
                                    <InputX form={form} name="otp" label="OTP" />
                                    <InputX form={form} type="password" name="newPassword" label="New Password" />
                                </>
                        }
                    </CardContent>
                    <CardFooter className="flex-col">
                        {
                            step === 1 && <SubmitX
                                pending={form.formState.isSubmitting}
                                text="Save Password"
                                className="w-full"
                            />
                        }


                        <div className="text-center hover:outline-none pt-[10px]">
                            <button className="text-[14px] " type="button">
                                Remember your password? <span className="border-none transition-all duration-300 hover:text-primary" onClick={() => setIsForgotOpen(!isForgotOpen)}>Login here</span>
                            </button>
                        </div>


                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}





const EmailSection = ({ setStep, setSessionId }: { setStep: any, setSessionId: any }) => {

    const [value, setValue] = useState("");
    const [isPending, setIsPending] = useState(false);

    const data = {
        email: value
    }

    const handleSubmit = async () => {
        setIsPending(true)
        const result = await A__POST__ForgetPassword(data);
        ResponseX({ title: "Forget Password", result });
        setSessionId(result?.data?.sessionId);

        if (value && result.success) {
            setStep(1);
            setIsPending(false);
        }
    }


    return (
        <>
            <Label>Email</Label>
            <Input name="email" type="email" value={value} onChange={(e) => setValue(e.target.value)} />
            <SubmitX
                pending={isPending}
                text="Send Verification Code"
                className="w-full"
                action={handleSubmit}
            />
        </>
    )
} 