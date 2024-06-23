"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";

import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./embla-dot-buttons";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./embla-arrow-buttons";
import { ITestimonial } from "@/types/testimonial";
import TestimonialCard from "./testimonial-card";

type PropType = {
  slides: ITestimonial[];
  options?: EmblaOptionsType;
};

const TestimonialSlider: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    slidesToScroll: 1,
    align: "start",
    containScroll: "trimSnaps",
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <TestimonialCard slide={slide} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
