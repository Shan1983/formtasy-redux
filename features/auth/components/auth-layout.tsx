import { WaypointsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex h-screen items-center justify-center rounded-none">
      <div className="w-1/2 flex flex-col h-full bg-white items-center justify-center border-r">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium flex-col text-2xl"
        >
          <WaypointsIcon className="size-8" />
          <span>
            Formtasy<span className="text-muted-foreground/50">:</span>
            <span className="text-red-600">Redux</span>
          </span>
        </Link>
        {children}
      </div>
      <div className="w-1/2 flex flex-col gap-6 h-full"></div>
    </div>
  );
};

export default AuthLayout;
