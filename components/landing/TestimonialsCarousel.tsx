"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Testimonial = {
  name: string;
  date: string;
  headline: string;
  text: string;
};

function StarRating({ size = "md" }: { size?: "sm" | "md" }) {
  const iconClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${iconClass} text-amber-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-6 shadow-none md:shadow-md border border-zinc-100 h-full w-full md:mx-0">
      <div className="flex items-center flex-wrap justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
            <Image
              src={`/img/review-${index + 1}.png`}
              alt={testimonial.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-zinc-900 text-sm">
              {testimonial.name}
            </div>
            <div className="text-xs text-zinc-500">
              {testimonial.date}
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <StarRating size="sm" />
        </div>
      </div>
      <h3 className="font-semibold text-zinc-900 text-sm mb-2">
        {testimonial.headline}
      </h3>
      <p className="text-xs text-zinc-600 leading-relaxed">
        {testimonial.text}
      </p>
    </div>
  );
}

const slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  swipeToSlide: true,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5_000,
};

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <>
      {/* Mobile: Slick carousel */}
      <div className="md:hidden testimonials-carousel -mx-4 px-4 pb-10">
        <Slider {...slickSettings}>
          {testimonials.map((tst, i) => (
            <div key={i}>
              <TestimonialCard testimonial={tst} index={i} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {testimonials.map((tst, i) => (
          <TestimonialCard key={i} testimonial={tst} index={i} />
        ))}
      </div>
    </>
  );
}
