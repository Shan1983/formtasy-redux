"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppWindowMacIcon,
  CrownIcon,
  DatabaseIcon,
  FolderOpenIcon,
  FormIcon,
  HandshakeIcon,
  HistoryIcon,
  KeyIcon,
  LayoutListIcon,
  LogOutIcon,
  User2Icon,
  WaypointsIcon,
  ZapIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { authClient } from "@/lib/auth/auth-client";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Forms",
        icon: FormIcon,
        url: "/forms",
      },
      {
        title: "Portals",
        icon: AppWindowMacIcon,
        url: "/portals",
      },
      {
        title: "Submissions",
        icon: LayoutListIcon,
        url: "/submissions",
      },
      {
        title: "Integrations",
        icon: ZapIcon,
        url: "/integrations",
      },
      {
        title: "Data",
        icon: DatabaseIcon,
        url: "/data",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
      {
        title: "Approvals",
        icon: HandshakeIcon,
        url: "/approvals",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
    ],
  },
];

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-background">
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-2 h-10 px-4">
            <Link
              href="/"
              className="flex items-center self-center font-medium"
            >
              <WaypointsIcon className="size-6" />
              <span>
                Formtasy<span className="text-muted-foreground/50">:</span>
                <span className="text-red-600">Redux</span>
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === item.url
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-2 h-10 px-4"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span className="text-sm font-md">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Upgrade to Pro"}
              className="gap-x-2 h-10 px-4"
              onClick={() => {}}
            >
              <CrownIcon className="size-4 text-indigo-500" />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Billing portal"}
              className="gap-x-2 h-10 px-4"
              onClick={() => {}}
            >
              <User2Icon className="size-4" />
              <span className="">Account</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Signout"}
              className="gap-x-2 h-10 px-4"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => router.push("/login"),
                  },
                })
              }
            >
              <LogOutIcon className="size-4" />
              <span className="">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
