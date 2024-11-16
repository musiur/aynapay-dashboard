import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChartIcon,
  FileTextIcon,
  MessageSquareIcon,
  MoveHorizontalIcon,
} from "lucide-react";

const Blogs = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Posts</h1>
        <Button className="ml-auto" size="sm">
          Add post
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
            <CardDescription>
              The total number of blog posts published.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold">125</h3>
              <FileTextIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Comments</CardTitle>
            <CardDescription>
              The total number of comments on blog posts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold">2,345</h3>
              <MessageSquareIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Traffic</CardTitle>
            <CardDescription>
              The total number of visitors to the blog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold">15,234</h3>
              <BarChartIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                The Future of Web Development
              </TableCell>
              <TableCell className="hidden md:table-cell">John Doe</TableCell>
              <TableCell className="hidden md:table-cell">
                May 22, 2024
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge>Published</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>Publish</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Mastering React Hooks
              </TableCell>
              <TableCell className="hidden md:table-cell">Jane Smith</TableCell>
              <TableCell className="hidden md:table-cell">
                April 15, 2024
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">Draft</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>Publish</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Serverless Functions with AWS
              </TableCell>
              <TableCell className="hidden md:table-cell">
                Michael Johnson
              </TableCell>
              <TableCell className="hidden md:table-cell">
                March 1, 2024
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>Publish</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Designing for Accessibility
              </TableCell>
              <TableCell className="hidden md:table-cell">Sarah Lee</TableCell>
              <TableCell className="hidden md:table-cell">
                February 10, 2024
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge>Published</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>Publish</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Optimizing Web Performance
              </TableCell>
              <TableCell className="hidden md:table-cell">
                David Brown
              </TableCell>
              <TableCell className="hidden md:table-cell">
                January 5, 2024
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge>Published</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem>Publish</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default Blogs;
