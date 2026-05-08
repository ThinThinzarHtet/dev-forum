import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { postsPath, signInPath, signUpPath } from "@/path";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signOut } from "@/features/auth/mutations/signout";

async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("Session in header:", session);
  return (
    <div className="flex items-center justify-between  mt-4 mb-8">
      <Link
        href="/"
        className="text-4xl font-extrabold dark:bg-white bg-black dark:text-black text-white p-2"
      >
        Dev.io
      </Link>
      <div className="flex items-center gap-2">
        <Button variant={"link"}>
          <Link href={postsPath}>Posts</Link>
        </Button>
        {session ? <SignOutButton /> : <SignInAndSignUpButton />}

        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;

function SignInAndSignUpButton() {
  return (
    <div className="space-x-2">
      <Button variant={"default"}>
        <Link href={signUpPath}>Sign Up</Link>
      </Button>
      <Button variant={"outline"}>
        <Link href={signInPath}>Sign In</Link>
      </Button>
    </div>
  );
}

function SignOutButton() {
  return (
    <form action={signOut}>
      <Button variant={"destructive"} type="submit" className="cursor-pointer">
        Sign out
      </Button>
    </form>
  );
}
