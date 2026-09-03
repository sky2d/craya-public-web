import { useWindowWidth } from "components/src/hooks/useWindowWidth";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  handle: string;
  avatar: string;
  cardColor?: string;
  textColor?: string;
  position?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "“I launched a store faster than I made my logo 🤯.”",
    name: "Ayush Sharma",
    handle: "@thevellebrand",
    avatar: "/images/ayush.png",
    cardColor: "bg-brand-color1",
    textColor: "text-white-light4",
    position: "top-[20%] left-[5%] rotate-[-6deg]",
  },
  {
    quote: "“Craya is my entire design + tech team in one.”",
    name: "Ayush Sharma",
    handle: "@thevellebrand",
    avatar: "/images/ayush.png",
    cardColor: "bg-white-light4",
    textColor: "text-gray-800",
    position: "top-[55%] left-[2%] rotate-[-2deg]",
  },
  {
    quote: "“Craya gave my small brand big-brand energy.”",
    name: "Ayush Sharma",
    handle: "@thevellebrand",
    avatar: "/images/ayush.png",
    cardColor: "bg-[#FAEBF5]",
    textColor: "text-gray-800",
    position: "top-[50%] right-[10%] rotate-[-3deg]",
  },
  {
    quote: '"Craya made my brand look pro in a day."',
    name: "Ayush Sharma",
    handle: "@thevellebrand",
    avatar: "/images/ayush.png",
    cardColor: "bg-[#E940A5]",
    textColor: "text-white-light4",
    position: "top-[20%] left-[35%] rotate-[5deg]",
  },
  {
    quote: "“Craya gave me speed without losing style.”",
    name: "Ayush Sharma",
    handle: "@thevellebrand",
    avatar: "/images/ayush.png",
    cardColor: "bg-[#E3D3FB]",
    textColor: "text-gray-800",
    position: "top-[40%] left-[15%] rotate-[-2deg] z-10",
  },
  {
    quote: '"Selling feels as easy as posting now."',
    name: "Ayush Sharma",
    handle: "@thevellebrand",
    avatar: "/images/ayush.png",
    cardColor: "bg-[#FFF3CC]",
    textColor: "text-gray-800",
    position: "top-[60%] left-[30%] rotate-[3deg]",
  },
  {
    quote: '"Zero tech, zero stress – just vibes."',
    name: "Ayush Sharma",
    handle: "@thevellebrand",
    avatar: "/images/ayush.png",
    cardColor: "bg-[#FFF3CC]",
    textColor: "text-gray-800",
    position: "top-[28%] right-[8%] rotate-[4deg]",
  },
];

const statsData = [
  {
    value: "35X",
    label: "Sales",
    valueColor: "text-purple-600",
    labelColor: "text-purple-500",
    positionClasses: "relative z-10", // Sits on the base layer
  },
  {
    value: "25X",
    label: "Repeat\nCustomer",
    valueColor: "text-pink-500",
    labelColor: "text-pink-500",
    positionClasses: "relative z-20 -my-10 ml-12 sm:ml-24",
  },
  {
    value: "3X",
    label: "Engagement",
    valueColor: "text-zinc-800",
    labelColor: "text-zinc-800",
    positionClasses: "relative z-10",
  },
];

const StatsShowcase = () => {
  return (
    <div className="flex flex-col items-start">
      {statsData.map(stat => (
        <div
          key={stat.label}
          className={`flex aspect-square w-24 flex-col items-start justify-between rounded-2xl bg-white-light4 p-2 shadow-lg md:w-32 ${stat.positionClasses}`}
        >
          <p className={`text-sm font-bold sm:text-3xl ${stat.valueColor}`}>{stat.value}</p>
          <p className={`mt-2 whitespace-pre-line text-xs font-semibold md:text-lg ${stat.labelColor}`}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

const TestimonialCard = ({
  quote,
  name,
  handle,
  avatar,
  textColor,
}: {
  quote: string;
  name: string;
  handle: string;
  avatar: string;
  textColor?: string;
}) => (
  <>
    <p className={`text-lg font-medium leading-tight ${textColor}`}>“{quote}”</p>
    <div className="flex items-center">
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
        <Image src={avatar} alt={`${name}'s avatar`} fill className="object-cover" sizes="40px" />
      </div>
      <div className="ml-3">
        <p className={`text-sm font-semibold ${textColor}`}>{name}</p>
        <p className={`text-xs opacity-70 ${textColor}`}>{handle}</p>
      </div>
    </div>
  </>
);

const LargeTestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div
    className={`absolute w-64 rounded-2xl p-6 shadow-lg transition-transform duration-300 hover:z-20 hover:scale-105 hover:shadow-2xl md:w-72 ${testimonial.cardColor} ${testimonial.position}`}
  >
    <p className={`mb-4 text-lg font-medium md:text-xl ${testimonial.textColor}`}>{testimonial.quote}</p>
    <div className="flex items-center">
      <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
        <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" sizes="40px" />
      </div>
      <div>
        <p className={`text-sm font-bold ${testimonial.textColor}`}>{testimonial.name}</p>
        <p className={`text-xs opacity-80 ${testimonial.textColor}`}>{testimonial.handle}</p>
      </div>
    </div>
  </div>
);

const StickyImageSteps = () => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const containerHeight = `${testimonials.length * 40}vh`;

  return (
    <div className="relative w-full" style={{ height: containerHeight }}>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`sticky top-[10px] flex h-[150px] w-full flex-col items-center rounded-2xl p-5 [&:not(:first-child)]:mt-[10vh] ${testimonial.cardColor}`}
        >
          <TestimonialCard {...testimonial} />
        </div>
      ))}
    </div>
  );
};

export default function CrayaShowCase() {
  const windowWidth = useWindowWidth();
  return (
    <main className="flex h-full min-h-screen flex-col items-center bg-brand-color2 p-8">
      <div className="mx-auto flex w-full justify-between py-8 sm:w-3/4">
        <h1 className="text-4xl font-black md:text-6xl">
          How
          <span className="text-brand-color1"> Craya</span> <br />
          Changed the Game
        </h1>

        <StatsShowcase />
      </div>

      {windowWidth < 768 ? (
        <>
          <StickyImageSteps />
        </>
      ) : (
        <div className="aspect-[16/9] max-h-screen w-full">
          <div className="relative mx-auto h-full w-full max-w-[1200px]">
            {testimonials.map((testimonial, index) => (
              <LargeTestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      )}
    </main>
    // </section>
  );
}
