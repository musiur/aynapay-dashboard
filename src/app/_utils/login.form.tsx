"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import InputX from "@/components/molecules/input.x";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SubmitX from "@/components/molecules/submit.x";
import ResponseX from "@/components/molecules/response.x";
import { A__Login, A__POST__TwoFactorAfterLogin } from "../actions";
import BrandLogo from "@/components/assets/brand";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileDigit } from "lucide-react";
import ForgotPassword from "./forgot.password";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const LoginForm = () => {
  const [twoFactor, setTwoFactor] = useState("");
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await A__Login(data);
    if (result.success) {
      if (result?.data?.twoFactorSessionId) {
        setTwoFactor(result?.data?.twoFactorSessionId);
      } else {
        ResponseX({ title: "Login", result });
      }
    } else {
      ResponseX({ title: "Login", result });
    }
  }

  return (
    <div className="container section flex items-center justify-center">
      {
        isForgotOpen ?
          <ForgotPassword
            setIsForgotOpen={setIsForgotOpen}
            isForgotOpen={isForgotOpen}
          />
          : (
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

                    <InputX form={form} name="email" label="Email" />
                    <InputX
                      form={form}
                      name="password"
                      label="Password"
                      type="password"
                    />


                  </CardContent>
                  <CardFooter className="flex-col">
                    {
                      isForgotOpen ? (
                        <SubmitX
                          pending={form.formState.isSubmitting}
                          text="Send Verification Code"
                          className="w-full"
                        />
                      ) : (
                        <SubmitX
                          pending={form.formState.isSubmitting}
                          text="Login"
                          className="w-full"
                        />
                      )
                    }

                    <div className="text-center pt-[15px]">
                      <button onClick={() => setIsForgotOpen(!isForgotOpen)} className="text-[14px] transition-all duration-300 hover:text-primary" type="button">
                        Forgot Password?
                      </button>
                    </div>


                  </CardFooter>
                </Card>
              </form>
            </Form>
          )
      }





      {twoFactor ? (
        <TwoFactorInput sessionId={twoFactor} setTwoFactor={setTwoFactor} />
      ) : null}
    </div>
  );
};

export default LoginForm;

const TwoFactorInput = ({
  sessionId,
  setTwoFactor,
}: {
  sessionId: string;
  setTwoFactor: Dispatch<SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  
  const handleSubmit = async () => {
    setPending(true);
    const result = await A__POST__TwoFactorAfterLogin({
      sessionId,
      code: value,
    });
    ResponseX({ title: "Login", result });
    setPending(false);
  };

  return (
    <div className="backdrop-blur bg-black/70 flex gap-2 fixed top-0 left-0 w-full h-[100dvh] items-center justify-center">
      <div className="p-4 rounded-lg bg-white grid grid-cols-1 gap-4 max-w-sm">
        <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto">
          <FileDigit className="w-10 h-10 stroke-primary" />
        </div>
        <Label>Enter the security code from your authenticator app</Label>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={handleSubmit}>
          {pending ? "Submitting..." : "Submit"}
        </Button>
        <Button onClick={() => setTwoFactor("")} variant={"outline"}>Cancel</Button>
      </div>
    </div>
  );
};
