import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DocumentView = ({ data }: { data: any }) => {
  const { documentType, status, images } = data;
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <Link href="/dashboard/documents" className="flex items-center gap-2">
        <ChevronLeft className="w-4 h-4" /> Back
      </Link>
      <div className="bg-white rounded-xl p-4">
        <p>Document Type: {documentType}</p>
        <p>Status: {status}</p>
        <ul className="flex flex-wrap gap-4">
          {images?.map((image: string) => {
            return (
              <li key={image} className="p-2 rounded-lg bg-white">
                <Image
                  src={image}
                  alt="document"
                  width={1000}
                  height={1000}
                  className="w-[200px] sm:w-full h-auto rounded-lg"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DocumentView;
