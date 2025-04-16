import styles from "@/styles/app.module.css";
import clsx from "clsx";
import {
  Carousel,
  CarouselControls,
  CarouselSlide,
  CarouselTrack,
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

        <h2>Base styles</h2>

        <Carousel>
          <CarouselTrack>
            {testimonials.map(({ id, testimonial, name, company }) => (
              <CarouselSlide key={id} as="figure">
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselTrack>

          <CarouselControls />
        </Carousel>

        <h2>Styled</h2>

        <h3>Single slide in view with peek</h3>

        <Carousel className={styles.carousel}>
          <CarouselTrack
            className={styles.carousel__trackContainer}
            track={{ className: styles.carousel__track }}
          >
            {testimonials.map(({ id, testimonial, name, company }) => (
              <CarouselSlide
                key={id}
                as="figure"
                className={clsx(
                  styles.carousel__slide,
                  styles["carousel__slide--singlePeek"]
                )}
              >
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselTrack>

          <CarouselControls
            className={styles.carousel__controls}
            control={{
              className: styles.carousel__control,
            }}
          />
        </Carousel>

        <h3>Multiple slides in view with peek</h3>

        <Carousel className={styles.carousel}>
          <CarouselTrack
            className={styles.carousel__trackContainer}
            track={{ className: styles.carousel__track }}
          >
            {testimonials.map(({ id, testimonial, name, company }) => (
              <CarouselSlide
                key={id}
                as="figure"
                className={clsx(
                  styles.carousel__slide,
                  styles["carousel__slide--multiPeek"]
                )}
              >
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselTrack>

          <CarouselControls
            className={styles.carousel__controls}
            control={{
              className: styles.carousel__control,
            }}
          />
        </Carousel>

        <h3>Multiple slides w/ responsive styles</h3>

        <Carousel className={styles.carousel}>
          <CarouselTrack
            className={styles["carousel__trackContainer--responsive"]}
            track={{ className: styles.carousel__track }}
          >
            {testimonials.map(({ id, testimonial, name, company }) => (
              <CarouselSlide
                key={id}
                as="figure"
                className={clsx(
                  styles.carousel__slide,
                  styles["carousel__slide--responsive"]
                )}
              >
                <blockquote>
                  <p>{testimonial}</p>
                </blockquote>

                <figcaption>
                  {name} &mdash; {company}
                </figcaption>
              </CarouselSlide>
            ))}
          </CarouselTrack>

          <CarouselControls
            className={styles.carousel__controls}
            control={{
              className: styles.carousel__control,
            }}
          />
        </Carousel>
      </div>
    </main>
  );
}

export default App;
