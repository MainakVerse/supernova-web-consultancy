import { Blogs } from "@/components/main/blogs";

export default function Gallery() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
         <Blogs />
      </div>
    </main>
  );
}
