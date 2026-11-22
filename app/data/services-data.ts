/**
 * SERVICES - single source of truth.
 *
 * Used by BOTH the home page "What I do" section and the /services page
 * (through components/ServicesContent.tsx). Edit, add, remove or reorder a
 * service here once and it changes in both places. The numbers (01, 02 ...)
 * are generated automatically from the order.
 */

export type Service = {
  title: string;
  description: string;
};

export const servicesIntro = {
  label: "MY SERVICES",
  heading: "What I do",
};

export const services: Service[] = [
  {
    title: "Strategic Brand Identity",
    description:
      "Building distinctive brand identities, visual systems and strategic design foundations that create a consistent brand presence.",
  },
  {
    title: "Website Design & Development",
    description:
      "Crafting modern, high-performance websites that elevate your brand and turn visitors into customers.",
  },
  {
    title: "Graphic Design",
    description:
      "Creating professional visual communication for marketing, advertising, presentations and promotional materials.",
  },
  {
    title: "Stationery Design",
    description:
      "Crafting branded business essentials that ensure consistency, recognition, and professionalism.",
  },
  {
    title: "Presentation Design",
    description:
      "Transforming information into impactful presentations that engage audiences and communicate with confidence.",
  },
  {
    title: "Social Media Post / Banner",
    description:
      "Designing engaging and consistent social media visuals that communicate clearly and strengthen your brand online.",
  },
];
