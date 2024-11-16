import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Reply from "./reply";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";

export default function Conversation({
  data,
  uid,
}: {
  data: any;
  uid: string;
}) {
  const { id, title, messages, status } = data;
  
  return (
    <div className="flex-1 bg-muted/40 px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard/support"
            className="flex items-center gap-2 text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="text-lg md:text-xl font-bold">{title}</h1>
        </div>
        <div className="rounded-lg overflow-auto h-[70dvh] flex flex-col bg-white">
          <div className="flex-1 overflow-auto p-4">
            {messages?.map((item: any, index: number) => {
              const { message, user, createdAt } = item;
              const { id, name, profilePicture } = user;
              const date = format(new Date(createdAt), "PPPP hh:mm a");
              return uid !== id ? (
                <div className="flex items-start gap-4 mb-4" key={index}>
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage
                      src={profilePicture || "/placeholder-user.jpg"}
                    />
                    <AvatarFallback>...</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <p className="font-medium">{message}</p>
                    <p className="text-xs text-gray-400 pt-4">{name} - {date}</p>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-start gap-4 mb-4 justify-end"
                  key={index}
                >
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                    <p>{message}</p>
                    <p className="text-xs text-gray-400 pt-4">{name} - {date}</p>
                  </div>
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage
                      src={profilePicture || "/placeholder-user.jpg"}
                    />
                    <AvatarFallback>...</AvatarFallback>
                  </Avatar>
                </div>
              );
            })}
          </div>
          <Reply ticketId={id} status={status} />
        </div>
      </div>
    </div>
  );
}
