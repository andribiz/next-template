"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { useWindowScroll } from "react-use";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { usePathname } from "next/navigation";

// eslint-disable-next-line react/display-name
const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const windowScroll = useWindowScroll();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, [mounted, windowScroll.y]);

  return (
    <header
      className={cn(
        "sticky top-0 z-30  body-font",
        mounted && windowScroll.y > 2
          ? "shadow-card backdrop-blur bg-opacity-10"
          : ""
      )}
    >
      <div className="flex flex-col md:grid md:grid-cols-5 p-4">
        <div className="hidden sm:inline-flex justify-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center mb-4 md:mb-0 ml-5"
          >
            <Image
              src={"/images/logo.webp"}
              alt="logo"
              height={100}
              width={100}
              className={cn(
                pathname == "/" && mounted && windowScroll.y <= 2 && "hidden"
              )}
            />
          </Link>
        </div>
        <div className="col-span-3 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Service</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <ListItem key="Erp" title="Odoo ERP" href="/service/erp">
                      Enterprise Resource Planning
                    </ListItem>
                    <ListItem
                      key="mobileweb"
                      title="Integration Development"
                      href="/service/development"
                    >
                      Mobile and Web Development
                    </ListItem>
                    {/* <ListItem */}
                    {/*   key="Cutting Edge Intelligence" */}
                    {/*   title="AI Development" */}
                    {/*   href="/service/erp" */}
                    {/* > */}
                    {/*   AI for Business */}
                    {/* </ListItem> */}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Projects
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
