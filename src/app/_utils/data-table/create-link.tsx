import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateLink = ({
  link = "/",
  text = "Add",
}: {
  link: string;
  text: string;
}) => {
  return (
    <Link href={link}>
      <Button size="sm">{text}</Button>
    </Link>
  );
};

export default CreateLink;
