import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { aboutPath, postsPath } from "@/path";

function Header() {
  return (
    <div className="flex items-center justify-between  mt-4 mb-8">
      <Link
        href="/"
        className="text-4xl font-extrabold dark:bg-white bg-black dark:text-black text-white p-2"
      >
        Dev.io
      </Link>
      <div className="space-x-4">
        <Button variant={"link"}>
          <Link href={postsPath}>Posts</Link>
        </Button>
        <Button variant={"link"}>
          <Link href={aboutPath}>About</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;
