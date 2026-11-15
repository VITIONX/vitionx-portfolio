
export type PortfolioCategory = {
  number: string;
  title: string;
  slug: string;
  cover: string;
  description: string;
  images: {
    src: string;
    alt: string;
  }[];
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    number: "01",
    title: "Brand Identity Design",
    slug: "brand-identity-design",
    cover: "/portfolio/project-01.jpg",
    description: "Strategic brand identities and complete visual branding systems.",
    images: [],
  },
  {
    number: "02",
    title: "Stationery Design",
    slug: "stationery-design",
    cover: "/portfolio/project-02.jpg",
    description: "Professional stationery and corporate branding applications.",
    images: [],
  },
  {
    number: "03",
    title: "Website Design & Development",
    slug: "website-design-&-development",
    cover: "/portfolio/project-03.jpg",
    description: "Modern website designs and development projects.",
    images: [],
  },
  {
    number: "04",
    title: "Presentation Design",
    slug: "presentation-design",
    cover: "/portfolio/project-04.jpg",
    description: "Professional presentations, pitch decks and slides.",
    images: [],
  },
  {
    number: "05",
    title: "Social Media Post Design",
    slug: "social-media-post-design",
    cover: "/portfolio/project-05.jpg",
    description: "Creative social media posts and campaign visuals.",
    images: [],
  },
  {
    number: "06",
    title: "Logo Design",
    slug: "logo-design",
    cover: "/portfolio/project-06.jpg",
    description: "Distinctive logos and memorable visual marks.",
    images: [],
  },
  {
    number: "07",
    title: "Video Editing",
    slug: "video-editing",
    cover: "/portfolio/project-07.jpg",
    description: "Professional video editing and motion-based content.",
    images: [],
  },
  {
    number: "08",
    title: "Social Media Cover & Banner Design",
    slug: "social-media-cover-&-banner-design",
    cover: "/portfolio/project-08.jpg",
    description: "Social media covers, banners and promotional graphics.",
    images: [],
  },
  {
    number: "09",
    title: "Product Image Editing",
    slug: "product-image-editing",
    cover: "/portfolio/project-09.jpg",
    description: "Product image editing and e-commerce visuals.",
    images: [],
  },
  {
    number: "10",
    title: "Thumbnail Design",
    slug: "thumbnail-design",
    cover: "/portfolio/project-10.jpg",
    description: "Attention-grabbing thumbnails for digital content.",
    images: [],
  },
  {
    number: "11",
    title: "Flyer & Brochure Design",
    slug: "flyer-&-brochure-design",
    cover: "/portfolio/project-11.jpg",
    description: "Professional flyers, brochures and print materials.",
    images: [],
  },
  {
    number: "12",
    title: "Vector Tracing",
    slug: "vector-tracing",
    cover: "/portfolio/project-12.jpg",
    description: "Precise vector recreation and artwork conversion.",
    images: [],
  },
];

export function getPortfolioCategory(
  slug: string
): PortfolioCategory | undefined {
  return portfolioCategories.find(
    (category) => category.slug === slug
  );
}

export function getPortfolioCategories(): PortfolioCategory[] {
  return portfolioCategories;
}
