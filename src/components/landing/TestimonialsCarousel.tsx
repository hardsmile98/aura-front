import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StarRating } from '@/components/landing-paywall';

type Testimonial = {
  name: string;
  date: string;
  headline: string;
  text: string;
};

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
            <img
              src={`/img/review-${index + 1}.png`}
              alt={testimonial.name}
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
