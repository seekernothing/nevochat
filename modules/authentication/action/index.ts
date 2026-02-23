"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        user: null,
        session: null,
      };
    }

    return {
      user: session.user,
      session: session.session,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return {
      user: null,
      session: null,
    };
  }
};
