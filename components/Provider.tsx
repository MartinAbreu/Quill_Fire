"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { ReactNode } from "react";

const Provider = ({ session, children } : {session?: Session | null, children: ReactNode}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
