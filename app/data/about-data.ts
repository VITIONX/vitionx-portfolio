/**
 * ABOUT - single source of truth.
 *
 * Used by BOTH the home page About section and the /about page
 * (through components/AboutContent.tsx), and the intro video popup
 * (components/IntroVideoModal.tsx). Change the text, the image or the
 * intro video here once and it changes everywhere.
 */

export const aboutContent = {
  label: "ABOUT ME",

  // each entry is one line of the big heading
  headingLines: ["Designing brands", "with purpose."],

  intro:
    "I'm Sakib, a Strategic Brand Designer focused on creating memorable, professional and meaningful visual identities that help brands stand out.",

  text:
    "With years of experience in graphic and brand design, I work across visual identity, marketing communication and digital design to build clear and consistent brand experiences.",

  image: "/about-video.jpg",
  imageAlt: "Sakib — Strategic Brand Designer",

  // small label on the image
  mediaNumber: "01",
  mediaLabel: "ABOUT ME",

  playButtonLabel: "Watch Sakib introduction video",
};

export const introVideo = {
  embedUrl: "https://www.youtube.com/embed/1P2d6WZwbMo?autoplay=1&rel=0",
  title: "Sakib — Strategic Brand Designer Introduction",
  dialogLabel: "Sakib introduction video",
};
