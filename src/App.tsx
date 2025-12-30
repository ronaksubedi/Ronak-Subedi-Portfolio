import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { pdf } from "@react-pdf/renderer";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Download,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import ResumePdf from "@/components/ResumePdf";
import { resume } from "@/data/resumeData";
import DownloadDialog, {
  type DownloadOptions,
} from "@/components/DownloadDialog";

const App = () => {
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const cvContainerRef = useRef<HTMLDivElement>(null);

  // Generate initial PDF
  useEffect(() => {
    const generatePdf = async () => {
      setIsGenerating(true);
      try {
        const blob = await pdf(<ResumePdf />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error("PDF generation error:", error);
      } finally {
        setIsGenerating(false);
      }
    };
    generatePdf();
  }, []);

  const handleDownload = async (options: DownloadOptions) => {
    if (options.format === "pdf") {
      setIsGenerating(true);
      try {
        // Generate PDF with custom options
        const blob = await pdf(
          <ResumePdf
            pageOrientation={options.pageOrientation}
            includeContact={options.includeContact}
            includeProjects={options.includeProjects}
            quality={options.quality}
          />
        ).toBlob();

        // Download as PDF
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Ronak-Subedi-Resume-${options.quality}-${options.pageOrientation}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("PDF download error:", error);
        alert("Failed to generate PDF. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    } else if (
      options.format === "jpg" ||
      options.format === "png" ||
      options.format === "jpeg"
    ) {
      // For image formats, capture the CV as canvas and convert to image
      setIsGenerating(true);
      try {
        if (cvContainerRef.current) {
          const canvas = await html2canvas(cvContainerRef.current, {
            scale: options.quality === "high" ? 2 : 1,
            backgroundColor: "#ffffff",
            logging: false,
            useCORS: true,
          });

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `Ronak-Subedi-Resume.${options.format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }
              setIsGenerating(false);
            },
            `image/${options.format === "jpg" ? "jpeg" : options.format}`,
            options.quality === "high" ? 1.0 : 0.8
          );
        }
      } catch (error) {
        console.error("Image export error:", error);
        alert("Failed to generate image. Please try again.");
        setIsGenerating(false);
      }
    } else if (options.format === "json") {
      // Download JSON
      const dataStr = JSON.stringify(resume, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Ronak-Subedi-Resume.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (options.format === "html") {
      // Download HTML
      try {
        const response = await fetch("/screen-reader-qa.html");
        const htmlContent = await response.text();
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Ronak-Subedi-CV.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("HTML download error:", error);
        alert("Failed to download HTML. Please try again.");
      }
    }

    setDownloadDialogOpen(false);
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background">
        {/* Fixed Download Button */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setDownloadDialogOpen(true)}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Download CV"}
          </button>
        </div>

        {/* Download Dialog */}
        <DownloadDialog
          open={downloadDialogOpen}
          onOpenChange={setDownloadDialogOpen}
          onDownload={handleDownload}
          pdfUrl={pdfUrl}
          isGenerating={isGenerating}
        />

        {/* Two-Column Layout */}
        <div
          ref={cvContainerRef}
          className="max-w-5xl mx-auto px-6 py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column - Contact Info */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-border bg-secondary/60">
                  <img
                    src="/images/heroimage.png"
                    alt={`${resume.name} portrait`}
                    className="w-full h-full object-contain object-[center_50%]"
                  />
                </div>

                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    Top MERN Stack Developer in Nepal Building Accessible Web
                    Applications
                  </h1>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                    I'm {resume.name}, a MERN stack developer in Nepal
                    specializing in building fast, accessible web applications.
                    With over 3 years of hands-on experience, I create scalable
                    solutions using MongoDB, Express, React, and Node.js that
                    prioritize performance, clean code, and user accessibility.
                  </p>
                </div>

                <div className="space-y-4">
                  <ContactItem icon={MapPin} text={resume.location} />
                  <ContactItem
                    icon={Mail}
                    text={resume.contacts.email}
                    href={`mailto:${resume.contacts.email}`}
                  />
                  <ContactItem
                    icon={Phone}
                    text={resume.contacts.phone}
                    href={`tel:${resume.contacts.phone}`}
                  />
                  <ContactItem
                    icon={Github}
                    text="GitHub"
                    href={resume.contacts.github}
                  />
                  <ContactItem
                    icon={Linkedin}
                    text="LinkedIn"
                    href={resume.contacts.linkedin}
                  />
                  <ContactItem
                    icon={Globe}
                    text="Portfolio"
                    href={resume.contacts.portfolio}
                  />
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Languages
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resume.languages.join(" • ")}
                  </p>
                </div>

                {/* Interests */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column - Resume Content */}
            <main className="lg:col-span-8 space-y-12">
              {/* Summary */}
              <Section title="Expert Full-Stack JavaScript Development">
                <div className="space-y-2">
                  {resume.summary.map((line, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Section>

              {/* Skills */}
              <Section title="Modern Tech Stack & Core Skills">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  As a full-stack JavaScript developer, I work across the entire
                  web development lifecycle—from designing MongoDB database
                  schemas to building responsive React interfaces. My expertise
                  includes Node.js server architecture, RESTful API development,
                  and modern frontend frameworks, all while maintaining high
                  standards for code quality, performance optimization, and web
                  accessibility compliance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <SkillGroup title="Backend" skills={resume.skills.backend} />
                  <SkillGroup
                    title="Frontend"
                    skills={resume.skills.frontend}
                  />
                  <SkillGroup title="Tools" skills={resume.skills.tools} />
                </div>
              </Section>

              {/* Experience */}
              <Section title="Proven Experience with Leading Companies">
                <div className="space-y-8">
                  {resume.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-6 border-l border-border"
                    >
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary" />
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                        <h3 className="text-base font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                          {exp.from} – {exp.to}
                        </span>
                      </div>
                      <p className="text-sm text-primary mb-3">
                        {exp.company} • {exp.location}
                      </p>
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            <span className="text-primary mr-2">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Projects */}
              <Section title="Featured Web Development Projects">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I've delivered production-ready applications for diverse
                  clients, from content management platforms to enterprise
                  dashboards. Each project showcases my ability to translate
                  business requirements into scalable code, implement best
                  practices for security and performance, and ensure
                  pixel-perfect responsive design across devices.
                </p>
                <div className="space-y-6">
                  {resume.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 bg-card rounded-lg border border-border"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-semibold text-foreground">
                          {project.name}
                        </h3>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline font-mono"
                        >
                          View →
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Education */}
              <Section title="Education">
                {resume.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {edu.degree}
                      </h3>
                      <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.institution}, {edu.location}
                    </p>
                  </div>
                ))}
              </Section>

              {/* Contact CTA */}
              <Section title="Let's Build Something Great Together">
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Looking for a reliable MERN stack developer in Nepal to
                    bring your project to life? I'm available for freelance
                    work, remote positions, and consulting engagements. Whether
                    you need a full-stack web application, API development, or
                    frontend expertise, I deliver clean, maintainable code that
                    scales with your business.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Let's discuss how I can help you build accessible,
                    high-performance web applications that your users will love.
                    Reach out via email at{" "}
                    <a
                      href={`mailto:${resume.contacts.email}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {resume.contacts.email}
                    </a>{" "}
                    or connect with me on{" "}
                    <a
                      href={resume.contacts.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      LinkedIn
                    </a>
                    .
                  </p>
                </div>
              </Section>
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

interface ContactItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href?: string;
}

const ContactItem = ({ icon: Icon, text, href }: ContactItemProps) => {
  const content = (
    <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
      <span className="text-sm">{text}</span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <section>
    <h2 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
      {title}
    </h2>
    {children}
  </section>
);

interface SkillGroupProps {
  title: string;
  skills: string[];
}

const SkillGroup = ({ title, skills }: SkillGroupProps) => (
  <div>
    <h3 className="text-sm font-medium text-foreground mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default App;
