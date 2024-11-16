import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { BellIcon, CalendarIcon, UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">All Users</CardTitle>
            <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              View user details
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Notifications Sent
            </CardTitle>
            <BellIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              View notification history
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Notifications
            </CardTitle>
            <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              View scheduled notifications
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">All Users</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Select All
              </Button>
              <Button size="sm" variant="outline">
                Deselect All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>2 hours ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>1 day ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">Bob Johnson</TableCell>
                  <TableCell>bob@example.com</TableCell>
                  <TableCell>3 days ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">Alice Williams</TableCell>
                  <TableCell>alice@example.com</TableCell>
                  <TableCell>1 week ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">Tom Davis</TableCell>
                  <TableCell>tom@example.com</TableCell>
                  <TableCell>2 weeks ago</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Compose Notification
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Schedule
              </Button>
              <Button size="sm" variant="outline">
                Send Now
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="recipients">Recipients</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="group1">Group 1</SelectItem>
                      <SelectItem value="group2">Group 2</SelectItem>
                      <SelectItem value="group3">Group 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Notification History
            </CardTitle>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Message</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    New product launch announcement
                  </TableCell>
                  <TableCell>All Users</TableCell>
                  <TableCell>2023-05-01 10:30 AM</TableCell>
                  <TableCell>
                    <Badge>Sent</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Important update for all users
                  </TableCell>
                  <TableCell>Group 1, Group 2</TableCell>
                  <TableCell>2023-04-15 3:00 PM</TableCell>
                  <TableCell>
                    <Badge>Sent</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Reminder: Account renewal due soon
                  </TableCell>
                  <TableCell>All Users</TableCell>
                  <TableCell>2023-03-30 9:00 AM</TableCell>
                  <TableCell>
                    <Badge>Sent</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Invitation to beta testing program
                  </TableCell>
                  <TableCell>Group 3</TableCell>
                  <TableCell>2023-02-20 2:45 PM</TableCell>
                  <TableCell>
                    <Badge>Sent</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Notifications;
