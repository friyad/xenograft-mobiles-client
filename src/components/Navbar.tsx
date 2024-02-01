import {
  Bell,
  CreditCard,
  LogOut,
  MenuIcon,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  return (
    <div className="fixed top-0 w-full z-50 md:relative">
      <Sheet>
        <div className="h-16 mxl:h-20 bg-[#FDFDFF] rounded-b-xl xl:rounded-b-3xl w-full">
          <div className="flex justify-between items-center px-7 md:px-4 lg:pl-6 3xl:pl-8 lg:pr-10 h-full">
            <div className="flex justify-start items-center gap-4">
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <h1 className="font-black text-cusBlack uppercase">{title}</h1>
            </div>

            <div className="flex justify-end items-center gap-5">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="size-9 lg:size-10 2xl:size-11 3xl:size-12 !p-0 border-transparent"
                  >
                    <Bell className="size-5 lg:size-6" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-full xsm:w-80 right-0 shadow-2xl"
                  align="end"
                >
                  <div>
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="mb-2 2xl:mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <div className="space-y-1">
                          <p className="text-xs 2xl:text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="text-xs 2xl:text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer size-9 lg:size-10 2xl:size-11 3xl:size-12">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-48 shadow-2xl" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <SheetContent side="left" className="px-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
