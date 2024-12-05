"use client";

import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { signOut } from "@/app/auth/login/actions";
import { useState } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export const UserButton = ({ user }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none">
            <Avatar className="rounded-full">
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="flex w-80 flex-col gap-2 px-2 py-4"
        >
          <DropdownMenuLabel>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.user_metadata.avatar_url} />
              </Avatar>
              <div className="flex flex-col">
                <span className="font-bold">
                  {user.user_metadata.full_name}
                </span>
                <span className="text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <div className="flex items-center gap-1">
            <DropdownMenuItem className="w-full">
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <Settings />
                Settings
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full">
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => {
                  signOut();
                }}
              >
                <LogOut />
                Sign out
              </Button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <div>
            <h1 className="pb-4 text-2xl font-bold">Profile details</h1>
            <hr />
            <section className="flex items-center justify-between py-4 text-sm">
              <div className="w-1/2">profile</div>
              <div className="flex w-1/2 items-center gap-2">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user.user_metadata.avatar_url} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold">
                    {user.user_metadata.full_name}
                  </span>
                </div>
              </div>
            </section>
            <hr />
            <section className="flex items-center justify-between py-4 text-sm">
              <div className="w-1/2">email</div>
              <div className="w-1/2">{user.email}</div>
            </section>
            <hr />
            <section className="flex items-center justify-between py-4 text-sm">
              <div className="w-1/2">Delete account</div>
              <div className="w-1/2">
                <Button variant="destructive" className="px-8 text-sm">
                  Delete
                </Button>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
