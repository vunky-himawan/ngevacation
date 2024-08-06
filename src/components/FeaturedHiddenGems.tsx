const FeaturedHiddenGems = () => {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-5">
        <a href="/" className="flex gap-5 items-center">
          <h1 className="font-semibold text-3xl font-cabinet">
            Featured Hidden Gems
          </h1>
          <div className="i-iconamoon:arrow-right-1-thin w-10 h-10" />
        </a>
        <div className="w-full relative h-fit 2xl:h-[50vh] flex flex-col lg:flex-row gap-5"> 
          <CardOfHiddenGems
            image="/images/hero.webp"
            title="Hidden Gem 1"
            rating={4.5}
            uploader="Joni"
          />
          <CardOfHiddenGems
            image="/images/hero.webp"
            title="Hidden Gem 2"
            rating={4.5}
            uploader="Joni"
          />
          <CardOfHiddenGems
            image="/images/hero.webp"
            title="Hidden Gem 3"
            rating={4.5}
            uploader="Joni"
          />
        </div>
      </section>
    </>
  );
};

const CardOfHiddenGems = ({
  image,
  title,
  rating,
  uploader,
}: {
  image: string;
  title: string;
  rating: number;
  uploader: string;
}) => {
  const ratingStars = Array(Math.floor(rating)).fill(1);

  return (
    <>
      <div className="flex-1 grid grid-rows-2 grid-cols-1 ">
        <div className="w-full h-full flex justify-center items-center rounded-3xl overflow-hidden">
          <img src={image} alt="hidden gem" className="min-h-full" />
        </div>
        <div className="flex flex-col justify-between p-5 border rounded-3xl overflow-hidden">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl">{title}</h2>
              <div className="flex">
                {ratingStars.map((star, index) => (
                  <div
                    key={index}
                    className="i-iconamoon:star-fill w-5 h-5 bg-yellow-500"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm">Uploaded by {uploader}</p>
          </div>
          <div>
            <a href="/" className="text-yellow-5">
              View Details
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedHiddenGems;
