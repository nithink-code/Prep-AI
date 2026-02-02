import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/dist/client/components/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
   const isUserAuthenticated = await isAuthenticated();
   if(!isUserAuthenticated) redirect('/sign-in');
  return (
    <div>
      <nav className="root-layout">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">Prep AI</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
