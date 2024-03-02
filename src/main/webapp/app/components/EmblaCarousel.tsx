import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
// import { ChevronRight } from 'lucide-react';
import React, { useCallback } from 'react';
import './component.css';

// import { Button } from '@/components/ui/button';

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img
            src="https://images.pexels.com/photos/20116345/pexels-photo-20116345/free-photo-of-postal-altiplano-chileno.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="slide 1"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://images.pexels.com/photos/20391001/pexels-photo-20391001/free-photo-of-storm-sky-surf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="slide 2"
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://images.pexels.com/photos/19160028/pexels-photo-19160028/free-photo-of-valley-between-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="slide 3"
          />
        </div>
      </div>
      <div className="mt-3">
        <FontAwesomeIcon className="arrow-left" icon={faArrowLeft} onClick={scrollPrev} />
        <FontAwesomeIcon className="arrow-right" icon={faArrowRight} onClick={scrollNext} />
      </div>
    </div>
  );
}
