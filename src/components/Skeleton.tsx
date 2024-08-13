import { Skeleton } from "./ui/skeleton";

const Loading = () => {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto mt-28 p-5">
        <div className="flex flex-col gap-5">
          <Skeleton className="w-full h-20 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-5 rounded-md" />
          <Skeleton className="w-full h-5 rounded-md" />
        </div>
      </section>
    </>
  );
};

export default Loading;
