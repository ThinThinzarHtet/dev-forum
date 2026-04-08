import { ABOUT, POSTS } from "@/path";
import Link from "next/link";

function Header() {
  return (
    <div>
      <h2>Dev Forum</h2>
      <div>
        <Link href={POSTS}>Posts</Link>
        <Link href={ABOUT}>About</Link>
      </div>
    </div>
  );
}

export default Header;
