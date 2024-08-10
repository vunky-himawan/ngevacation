const FeaturedArticles = () => {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-5">
        <a href="/" className="flex gap-5 items-center justify-between">
          <h1 className="font-semibold text-3xl font-cabinet">Articles</h1>
          <div className="icon-[iconamoon--arrow-right-1-thin] w-7 h-7" />
        </a>
        <div className="w-full relative h-fit 2xl:h-[50vh] flex flex-col gap-5">
          <CardOFArticles
            title="Title"
            author="Author"
            uploadedAt="Aug, 20 2024"
          />
          <CardOFArticles
            title="Title"
            author="Author"
            uploadedAt="Aug, 20 2024"
          />
          <CardOFArticles
            title="Title"
            author="Author"
            uploadedAt="Aug, 20 2024"
          />
          <CardOFArticles
            title="Title"
            author="Author"
            uploadedAt="Aug, 20 2024"
          />
          <CardOFArticles
            title="Title"
            author="Author"
            uploadedAt="Aug, 20 2024"
          />
        </div>
      </section>
    </>
  );
};

const CardOFArticles = ({
  uploadedAt,
  title,
  author,
}: {
  uploadedAt: string;
  title: string;
  author: string;
}) => {
  return (
    <>
      <div className="w-full h-fit flex flex-col gap-2 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-semibold text-2xl">{title}</h1>
          <p>Created by {author}</p>
        </div>
        <div>{uploadedAt}</div>
      </div>
    </>
  );
};

export default FeaturedArticles;
