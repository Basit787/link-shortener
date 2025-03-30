"use client";
import useDialogBox from "@/context/dialog-provider/use-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useClerk } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignedInComponent from "./signedIn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Header = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { showDialog, closeDialog } = useDialogBox();
  const isMobile = useIsMobile();

  const navLink = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "My Links",
      href: "/myLinks",
    },
    {
      title: "Signout",
      onClick: async () => {
        showDialog({
          title: "Confirm Logout",
          description: "Are you sure you want to logout",
          positiveAction: async () => {
            await signOut();
            closeDialog();
          },
          negativeAction: () => closeDialog(),
          positiveLabel: "Confirm",
          negativeLabel: "Cancel",
        });
      },
    },
  ];

  const NavlinkTabs = () => {
    return (
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-4`}>
        {navLink.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href ?? "#"}
              key={index}
              onClick={item.onClick}
              className={`${isActive ? "underline underline-offset-4" : ""} ${
                isMobile ? "p-4 text-xl" : ""
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <header className="flex flex-row justify-between py-4">
      <h1 className="text-xl font-bold">Link Shortener</h1>
      <nav>
        <SignedInComponent>
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-xl font-semibold">
                    Select Action
                  </SheetTitle>
                </SheetHeader>
                <NavlinkTabs />
              </SheetContent>
            </Sheet>
          ) : (
            <NavlinkTabs />
          )}
        </SignedInComponent>
      </nav>
    </header>
  );
};

export default Header;
