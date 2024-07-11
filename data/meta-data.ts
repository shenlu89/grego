const HeaderNavLinks = [
  {
    title: "Topics",
    href: "/topics",
  },
  {
    title: "About",
    href: "/about",
  },
];

const HomePage = {
  metadata: {
    metadataBase: new URL("https://gre.shenlu.me"),
    title: {
      default:
        "GREEN | A tools can help you practice and prepare effectively for the GRE Analytical Writing.",
      template: `%s | GREEN`,
    },
    description:
      "A tools can help you practice and prepare effectively for the GRE Analytical Writing.",
    openGraph: {
      title: "GREEN",
      description:
        "A tools can help you practice and prepare effectively for the GRE Analytical Writing.",
      url: "https://gre.shenlu.me",
      siteName: "GREEN",
      locale: "en-US",
      type: "website",
    },
    twitter: {
      title: "GREEN",
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  },
  title: "GREEN",
  description:
    "A tools can help you practice and prepare effectively for the GRE Analytical Writing.",
  url: "https://gre.shenlu.me",
  avatar_url: "/images/logo.svg",
};

const SearchPage = {
  metadata: {
    title: "Search",
    description: "Find and search the topics for the GRE Analytical Writing",
  },
};

const AboutPage = {
  metadata: {
    title: "About",
    description: "More detailed information about Remotea.io.",
  },
};

export { HeaderNavLinks, HomePage, SearchPage, AboutPage };
