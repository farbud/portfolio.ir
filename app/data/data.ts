export type Project = {
  id: string;
  title: string;

  image: string;
  video?: string;
  tech: string[];
  category: "frontend" | "dashboard" | "ai";
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    id: "coffee",
    title: "Coffee Shop Store",
    image: "/coffee.png",
    video: "/coffeeV.mp4",
    tech: ["Next.js", "Tailwind"],
    category: "frontend",
    github: "https://github.com/farbud/coffeeshop",
    demo: "https://coffeeshop-chi-six.vercel.app/",
  },
  {
    id: "weather",
    title: "weather",
    image: "/weather.png",
    video: "/weatherV.mp4",
    tech: ["Next.js", "Tailwind"],
    category: "frontend",
    github: "https://github.com/farbud/weather",
    demo: "https://weather-delta-ebon.vercel.app/",
  },
  {
    id: "dashbord",
    title: "dashbord",
    image: "/dashbord.png",
    video: "/dashbordV.mp4",
    tech: ["Next.js", "Tailwind"],
    category: "frontend",
    github: "https://github.com/farbud/finance-tracker-dashbord",
    demo: "https://finance-tracker-dashbord.vercel.app/",
  },
  {
    id: "minishop",
    title: "minishop",
    image: "/shop (1).png",
    video: "/minishopV.mp4",
    tech: ["Next.js", "Tailwind"],
    category: "frontend",
    github: "https://github.com/farbud/Fshop",
    demo: "https://fshop-ctt2.vercel.app/",
  },
];
