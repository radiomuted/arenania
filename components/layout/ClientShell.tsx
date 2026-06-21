"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer />
    </>
  );
}
