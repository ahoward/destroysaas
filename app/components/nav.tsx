import { createClient } from "@/lib/supabase/server";
import { is_member, is_sudo, is_inner } from "@/lib/groups";
import NavClient from "./nav_client";

type NavProps = {
  currentPath: string;
};

const PUBLIC_LINKS = [
  { href: "/ideas", label: "ideas" },
  { href: "/cells", label: "cells" },
  { href: "/commons", label: "commons" },
  { href: "/about", label: "about" },
];

export default async function Nav({ currentPath }: NavProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let showCabal = false;
  let userIsInner = false;
  if (user) {
    showCabal =
      (await is_sudo(supabase, user)) ||
      (await is_member(supabase, user.id, "cabal"));
    userIsInner = await is_inner(supabase, user);
  }

  const displayName = user?.email?.split("@")[0] ?? "";

  const lobbyLink =
    user && !userIsInner ? { href: "/lobby", label: "lobby" } : null;

  const authLink = user
    ? { href: "/me", label: displayName }
    : { href: "/auth", label: "sign in" };

  const cabalLink = showCabal ? { href: "/cabal", label: "founders" } : null;

  return (
    <NavClient
      currentPath={currentPath}
      publicLinks={PUBLIC_LINKS}
      lobbyLink={lobbyLink}
      authLink={authLink}
      cabalLink={cabalLink}
    />
  );
}
