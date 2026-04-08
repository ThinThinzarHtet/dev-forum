import { Button } from "@/components/ui/button";
import { dummyPosts } from "@/data";
import { SINGLE_POST } from "@/path";
import Link from "next/link";

function Home() {
  return (
    <div>
      <h2>Home Page</h2>

      <div className="space-y-6">
        {dummyPosts.map((post) => (
          <div key={post.id}>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm font-medium text-gray-400 line-clamp-1">
              {post.body}
            </p>
            <Button asChild variant={"link"}>
              <Link href={SINGLE_POST(post.id)}>view</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
