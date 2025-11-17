"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Navbar = dynamic(
  () => import("@/components/marketing/navbar").then((mod) => mod.Navbar),
  { ssr: false }
);

const HIDDEN_PREFIXES = ["/chat"];

export function GlobalHeader() {
  const pathname = usePathname();
  const shouldHide = pathname
    ? HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))
    : false;

  if (shouldHide) {
    return null;
  }

  return <Navbar />;
}

