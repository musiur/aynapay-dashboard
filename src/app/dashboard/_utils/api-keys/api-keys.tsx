import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GenerateApiKey from "./generate-api-key";
import ApiCopy from "./api-copy";
import { A__GET__ProfileInfo } from "../customers/action";
import Link from "next/link";
import RemoveApiKey from "./remove-api-key";

const ApiKeys = async () => {
  const result = await A__GET__ProfileInfo();
  const apiKey = result?.data?.developmentInfo?.apiKey || "";
  return (
    <main className="col-span-2 flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white rounded-lg hover:shadow-md">
      <div className="flex items-center">
        <h3 className="font-semibold flex items-center justify-start gap-2">
          API Key
          <Link
            href="https://docs.catopay.com/docs/getting-started/payment"
            className="border border-primary/40 text-xs px-2 py-1 shadow-lg rounded-lg bg-primary text-white"
            target="_blank"
            passHref={true}
          >
            Read Docs
          </Link>
        </h3>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>API Key</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-sm">
                    {apiKey || "No key"}
                  </code>
                  <ApiCopy apiKey={apiKey} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {apiKey ? (
                    <>
                      <GenerateApiKey label="Regenerate" />
                      <RemoveApiKey />
                    </>
                  ) : (
                    <GenerateApiKey label="Generate" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default ApiKeys;
