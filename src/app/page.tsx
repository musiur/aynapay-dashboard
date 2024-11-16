import PublicRoute from "@/components/layout/public.route";
import LoginForm from "./_utils/login.form";

const Page = () => {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
};
export default Page;
