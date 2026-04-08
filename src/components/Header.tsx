import { ABOUT, POSTS } from "@/path";
import Link from "next/link";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="flex items-center justify-between  mt-4 mb-8">
      <Link href="/" className="text-4xl font-extrabold">
        Dev.io
      </Link>
      <div className="space-x-4">
        <Button variant={"link"}>
          <Link href={POSTS}>Posts</Link>
        </Button>
        <Button variant={"link"}>
          <Link href={ABOUT}>About</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
