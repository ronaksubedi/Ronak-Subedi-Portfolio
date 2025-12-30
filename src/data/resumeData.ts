export interface Experience {
  role: string;
  company: string;
  location: string;
  from: string;
  to: string;
  bullets: string[];
}

export interface Project {
  name: string;
  link: string;
  stack: string[];
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  contacts: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string[];
  skills: {
    backend: string[];
    frontend: string[];
    tools: string[];
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: string[];
  interests: string[];
}

export const resume: ResumeData = {
  name: "Ronak Subedi",
  title: "MERN Stack Developer",
  location: "Patan, Bagmati, Nepal",
  contacts: {
    email: "ronaksubedi576@gmail.com",
    phone: "+977-9824029510",
    github: "https://github.com/ronaksubedi",
    linkedin: "https://www.linkedin.com/in/ronak-subedi/",
    portfolio: "https://ronaksubedi.com.np",
  },
  summary: [
    "MERN stack developer focused on building clean, scalable web applications.",
    "Comfortable across MongoDB, Express, React, and Node.js with an eye for performance and DX.",
  ],
  skills: {
    backend: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    tools: ["Git", "GitHub", "Postman"],
  },
  experience: [
    {
      role: "MERN Stack Developer",
      company: "Nepal Bank Limited",
      location: "Kathmandu, Nepal",
      from: "Jan 2023",
      to: "Present",
      bullets: [
        "Developed and maintained MERN applications used by hundreds of users.",
        "Designed REST APIs in Node.js/Express and integrated them with React frontends.",
        "Improved API response times by optimising MongoDB queries and adding caching.",
      ],
    },
    {
      role: "Full Stack Developer (Intern / Junior)",
      company: "Nepal Bank Limited",
      location: "Kathmandu, Nepal",
      from: "Dec 2022",
      to: "ongoing",
      bullets: [
        "Implemented new features in existing React applications and fixed UI bugs.",
        "Collaborated with backend team to integrate JSON APIs and WebSocket events.",
        "Wrote reusable components and refactored legacy code for better readability.",
      ],
    },
  ],
  projects: [
    {
      name: "New Paper Article",
      link: "https://news-article-app.vercel.app/",
      stack: ["MongoDB", "Express", "React", "Node.js"],
      description:
        "Task management app with real-time updates and JWT-based authentication.",
    },
    {
      name: "Bhagwat Gita App",
      link: "https://bhagavad-geeta-main.vercel.app/",
      stack: ["Next.js", "Tailwind CSS"],
      description:
        "Developer blog platform with markdown support, SEO-friendly routing, and admin dashboard.",
    },
  ],
  education: [
    {
      degree: "BIT",
      institution: "Patan Multiple Campus / Tribhuvan University",
      location: "Patan-Dhoka, Lalitpur, Nepal",
      year: "202X",
    },
  ],
  languages: ["English", "Nepali", "Hindi"],
  interests: ["Open source", "System design", "UI/UX", "Reading tech blogs"],
};
