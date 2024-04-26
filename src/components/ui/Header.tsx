"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { ModeToggle } from "./ThemeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/context";

export default function Header() {
  const { state } = useUser();
  const firstNameInitial = state?.name[0] ? state?.name[0][0] : "";
  const lastNameInitial = state?.name[1] ? state?.name[1][0] : "";

  return (
    <header className="fixed inset-x-0 top-0 h-16 z-50 flex items-center px-4 bg-opacity-90 backdrop-blur-sm border-b border-gray-200 backdrop-filter dark:border-gray-800 dark:bg-gray-950/90">
      <nav className="flex-1 flex items-center justify-between">
        <Link href="#">
          <img
            alt="Acme Inc"
            className="object-contain"
            height="40"
            src="/placeholder.svg"
            style={{
              aspectRatio: "120/40",
              objectFit: "cover",
            }}
            width="120"
          />
        </Link>
        <div className="flex-1 flex justify-end items-center space-x-8">
          <ModeToggle />
          {state ? <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src={state.picture} />
                          <AvatarFallback>{firstNameInitial}{lastNameInitial}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className='cursor-pointer text-white' onClick={() => {
                        fetch('http://localhost:3000/auth/logout', { method: 'GET' })
                        .then(response => {
                            if (response.redirected) {
                                window.location.href = response.url;
                            }
                        })
                        .catch(function(err) {
                            console.info(err);
                        });
                      }}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> : 
          <>
            <Link href={"/auth/signin"} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 hidden sm:font-semibold sm:relative sm:block">Sign In</Link>

            <Link href={"/auth/signup"} className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 hidden sm:font-semibold sm:relative sm:block border">Sign Up</Link>
          </>
          }

          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button className="sm:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:hidden">
              <Link href="#">
                <img
                  alt="Acme Inc"
                  className="object-contain"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "120/40",
                    objectFit: "cover",
                  }}
                  width="120"
                />
              </Link>
              <div className="grid gap-2 py-6">
                <Button className="font-semibold relative" variant="outline">
                    Sign in
                </Button>
                <Button variant="outline" className="font-semibold relative">Sign Up</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

function MenuIcon(props: MenuIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

interface MenuIconProps {
  className?: string;
}