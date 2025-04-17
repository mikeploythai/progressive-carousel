import styles from "@/styles/app.module.css";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselSlide,
} from "./components/carousel";
import testimonials from "./data/testimonials";

function App() {
  return (
    <main>
      <div className={styles.container}>
        <header>
          <h1>Progressive Carousel Demo</h1>
          <p>
            A headless React carousel component that utilizes CSS scroll
            snapping and JavaScript for progressive enhancement.
          </p>

          <a
            href="https://github.com/mikeploythai/progressive-carousel/tree/main/src/components/carousel"
            target="_blank"
            rel="noreferrer"
          >
            View source code
          </a>
        </header>

        <h2>Base styles only</h2>

        <Carousel numOfSlides={testimonials.length}>
          <CarouselContent>
            {testimonials.map(({ id, testimonial, name, company }, i) => (
              <CarouselSlide key={id} as="figure" slideNum={i + 1}>
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselContent>

          <CarouselControls />
        </Carousel>

        <h2>Neobrutalist</h2>
        <Carousel
          className={styles.neobrutalistCarousel}
          numOfSlides={testimonials.length}
        >
          <CarouselContent
            className={styles.neobrutalistCarousel__content}
            track={{ className: styles.neobrutalistCarousel__track }}
          >
            {testimonials.map(({ id, testimonial, name, company }, i) => (
              <CarouselSlide
                key={id}
                as="figure"
                slideNum={i + 1}
                className={styles.neobrutalistCarousel__slide}
              >
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselContent>

          <CarouselControls
            className={styles.neobrutalistCarousel__controls}
            control={{ className: styles.neobrutalistCarousel__control }}
          />
        </Carousel>

        <h2>Minimal Style</h2>
        <Carousel
          className={styles.minimalCarousel}
          numOfSlides={testimonials.length}
        >
          <CarouselContent
            className={styles.minimalCarousel__content}
            track={{ className: styles.minimalCarousel__track }}
          >
            {testimonials.map(({ id, testimonial, name, company }, i) => (
              <CarouselSlide
                key={id}
                as="figure"
                slideNum={i + 1}
                className={styles.minimalCarousel__slide}
              >
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselContent>

          <CarouselControls
            className={styles.minimalCarousel__controls}
            control={{ className: styles.minimalCarousel__control }}
          />
        </Carousel>

        <h2>Card Style</h2>
        <Carousel
          className={styles.cardCarousel}
          numOfSlides={testimonials.length}
        >
          <CarouselContent
            className={styles.cardCarousel__content}
            track={{ className: styles.cardCarousel__track }}
          >
            {testimonials.map(({ id, testimonial, name, company }, i) => (
              <CarouselSlide
                key={id}
                as="figure"
                slideNum={i + 1}
                className={styles.cardCarousel__slide}
              >
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselContent>

          <CarouselControls
            className={styles.cardCarousel__controls}
            control={{ className: styles.cardCarousel__control }}
          />
        </Carousel>

        <h2>Mobile-Friendly</h2>
        <Carousel
          className={styles.mobileCarousel}
          numOfSlides={testimonials.length}
        >
          <CarouselContent
            className={styles.mobileCarousel__content}
            track={{ className: styles.mobileCarousel__track }}
          >
            {testimonials.map(({ id, testimonial, name, company }, i) => (
              <CarouselSlide
                key={id}
                as="figure"
                slideNum={i + 1}
                className={styles.mobileCarousel__slide}
              >
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselContent>

          <CarouselControls
            className={styles.mobileCarousel__controls}
            control={{ className: styles.mobileCarousel__control }}
          />
        </Carousel>

        <h2>Dark Theme</h2>
        <Carousel
          className={styles.darkCarousel}
          numOfSlides={testimonials.length}
        >
          <CarouselContent
            className={styles.darkCarousel__content}
            track={{ className: styles.darkCarousel__track }}
          >
            {testimonials.map(({ id, testimonial, name, company }, i) => (
              <CarouselSlide
                key={id}
                as="figure"
                slideNum={i + 1}
                className={styles.darkCarousel__slide}
              >
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselContent>

          <CarouselControls
            className={styles.darkCarousel__controls}
            control={{ className: styles.darkCarousel__control }}
          />
        </Carousel>
      </div>
    </main>
  );
}

export default App;
