"use client";
import { SignedIn, SignedOut, SignInButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();

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
        await signOut();
      },
    },
  ];

  return (
    <header className="flex flex-row justify-between py-4">
      <span>Link Shortener</span>
      <nav>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex gap-4">
            {navLink.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href ?? "#"}
                  key={index}
                  onClick={item.onClick}
                  className={`${
                    isActive ? "underline underline-offset-4" : ""
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
