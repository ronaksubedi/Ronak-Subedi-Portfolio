import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface QAItem {
  question: string;
  answer: string;
}

interface QASection {
  title: string;
  items: QAItem[];
}

const QandA = () => {
  const sections: QASection[] = [
    {
      title: "About Ronak",
      items: [
        {
          question: "Who is Ronak Subedi?",
          answer:
            "Ronak Subedi is a full-stack software engineer from Nepal who specializes in the MERN stack (MongoDB, Express, React, Node.js) and builds fast, accessible web applications for clients around the world.",
        },
        {
          question: "Where is Ronak based and who does he work with?",
          answer:
            "Ronak is based in Nepal and works remotely with startups, agencies, and small businesses that need production-ready web apps and dashboards.",
        },
        {
          question: "What kind of projects does Ronak enjoy building most?",
          answer:
            "Ronak enjoys building content platforms, internal tools, and dashboards where performance, usability, and clean code architecture matter.",
        },
      ],
    },
    {
      title: "Skills and Tech Stack",
      items: [
        {
          question:
            "What technologies does Ronak specialize in as a full-stack developer?",
          answer:
            "Ronak specializes in the MERN stack with JavaScript and TypeScript, combining React on the frontend with Node.js, Express, and MongoDB on the backend.",
        },
        {
          question:
            "Is Ronak a top software engineer and full-stack developer in Nepal?",
          answer:
            "There is no official ranking, but Ronak is frequently highlighted among Nepali developers for strong full-stack MERN skills, attention to accessibility, and a portfolio of real, deployed applications.",
        },
        {
          question: "Can Ronak design and build REST APIs and databases?",
          answer:
            "Yes, Ronak designs REST APIs, structures MongoDB schemas, and implements authentication, validation, and basic security best practices.",
        },
        {
          question: "How does Ronak approach performance and scalability?",
          answer:
            "Ronak focuses on bundle size, caching, query optimization, and clean component architecture so apps stay responsive as they grow.",
        },
      ],
    },
    {
      title: "Accessibility and User Experience",
      items: [
        {
          question: "Why is accessibility important in Ronak's work?",
          answer:
            "Accessibility is treated as a core requirement so that people using screen readers, keyboards, or mobile assistive tech can use the product without barriers.",
        },
        {
          question:
            "How does Ronak make websites usable with screen readers and keyboards?",
          answer:
            "Ronak uses semantic HTML, clear headings, landmarks, skip links, visible focus states, and meaningful labels so screen reader and keyboard users can navigate comfortably.",
        },
        {
          question:
            "What steps does Ronak take to ensure good color contrast and readable layouts?",
          answer:
            "Ronak checks color contrast ratios, avoids relying on color alone, and designs responsive layouts with clear hierarchy and readable typography.",
        },
      ],
    },
    {
      title: "Projects and Experience",
      items: [
        {
          question: "What types of products has Ronak worked on so far?",
          answer:
            "Ronak has built news and content sites, productivity tools, and small business applications using the MERN stack and modern frontend tooling.",
        },
        {
          question:
            "Can Ronak improve or refactor an existing MERN application?",
          answer:
            "Yes, Ronak often refactors existing apps to improve structure, performance, and accessibility without breaking current functionality.",
        },
        {
          question:
            "Does Ronak build dashboards, admin panels, and internal tools?",
          answer:
            "Ronak designs and implements dashboards with charts, filters, role-based access, and responsive layouts tailored to teams' workflows.",
        },
      ],
    },
    {
      title: "Working Together",
      items: [
        {
          question: "How can someone contact Ronak about a project?",
          answer:
            "The easiest way is through the contact form or email on this site, where you can briefly describe your idea and timeline.",
        },
        {
          question:
            "What information should a client share in the first message?",
          answer:
            "A short project overview, rough scope, desired timeline, and budget range help Ronak respond with realistic options and next steps.",
        },
        {
          question:
            "Is Ronak available for freelance or remote roles right now?",
          answer:
            "Ronak is open to suitable freelance and remote opportunities where his MERN and full-stack experience can create clear business value.",
        },
        {
          question: "How does Ronak communicate progress and handle feedback?",
          answer:
            "Ronak prefers regular check-ins, small milestones, and clear written updates, and he iterates quickly based on design and product feedback.",
        },
      ],
    },
  ];

  useEffect(() => {
    // Update document title and meta tags for SEO
    document.title = "Q&A - Ronak Subedi | Full-Stack MERN Developer";

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Questions and answers about Ronak Subedi, full-stack MERN developer. Learn about his skills, experience, accessibility practices, and how to work with him."
    );

    // Update or create og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute(
      "content",
      "Q&A - Ronak Subedi | Full-Stack MERN Developer"
    );

    // Update or create og:description
    let ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute(
      "content",
      "Frequently asked questions about Ronak's development expertise, skills, and approach to building web applications."
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Questions & Answers
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn more about Ronak's work, expertise, and approach to building
            web applications.
          </p>
        </div>

        {/* Q&A Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIdx) => (
            <section key={sectionIdx}>
              <h2 className="text-2xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <QACard
                    key={itemIdx}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="bg-card rounded-lg border border-border p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Ready to work together?
            </h3>
            <p className="text-muted-foreground mb-6">
              Have a project in mind or want to discuss your idea? Reach out via
              email or the contact form.
            </p>
            <a
              href="mailto:contact@ronaksubedi.com"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Send an Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QACardProps {
  question: string;
  answer: string;
}

const QACard = ({ question, answer }: QACardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-foreground">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QandA;
