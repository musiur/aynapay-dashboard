import { toast } from "../ui/use-toast";

const ResponseX = ({
  title = "You submitted the following values:",
  result,
}: {
  title: string;
  result: any;
}) => {
  const { success, message } = result;
  toast({
    variant: success ? "default" : "destructive",
    title,
    description: <div>{message}</div>,
  });
  return null;
};
export default ResponseX;
