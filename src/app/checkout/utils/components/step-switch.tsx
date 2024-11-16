import { Button } from "@/components/ui/button";
import Link from "next/link";

const StepSwitch = ({ backLink }: { backLink?: string }) => {
  return (
    <div className="flex items-center justify-end gap-4">
      {backLink ? <Link href={backLink || "#"}>Back</Link> : null}
      <Button type="submit">Proceed</Button>
    </div>
  );
};

export default StepSwitch;
