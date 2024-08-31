type HeroProps = {
  headline: string;
  description?: string;
  withButton: boolean;
  buttonLabel?: string;
  image?: string;
};

const Hero = ({
  headline,
  description,
  withButton,
  buttonLabel,
  image,
}: HeroProps) => {
  return (
    <>
      <section
        className={`px-4 2xl:h-[90vh] h-screen bg-cover bg-no-repeat bg-center  relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/20 before:z-0`}
        style={{
          backgroundImage: image ? `url(${image})` : "url(/images/hero.webp)",
        }}
      >
        <div className="max-w-7xl mx-auto h-full relative z-10 gap-5 flex items-center justify-center">
          <div className="flex flex-col justify-center min-h-30vh bg-black/30 w-fit p-10 gap-5 rounded-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-cabinet">
              {headline}
            </h1>
            <p className="lg:text-xl text-white font-satoshi">
              {description ?? null}
            </p>
            {withButton ? (
              <button className="bg-white w-fit text-black font-cabinet font-medium px-8 py-2 rounded-lg">
                {buttonLabel ?? null}
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
