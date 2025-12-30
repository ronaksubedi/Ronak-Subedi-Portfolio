import type React from "react";
import { useEffect, useMemo, useState } from "react";
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
import { usePDF } from "@react-pdf/renderer";
import DownloadDialog, {
  type DownloadOptions,
} from "@/components/DownloadDialog";

const Index = () => {
  const pdfDocument = useMemo(() => <ResumePdf />, []);
  const [instance, updateInstance] = usePDF({ document: pdfDocument });
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  // Ensure the PDF blob is generated on mount and retried if it fails
  useEffect(() => {
    if (!instance.url && !instance.loading) {
      updateInstance(pdfDocument);
    }
  }, [instance.url, instance.loading, updateInstance, pdfDocument]);

  const handleDownloadClick = () => {
    console.log("Download button clicked");
    if (instance.error) {
      alert("Unable to generate PDF. Please try again.");
      updateInstance(pdfDocument);
      return;
    }
    console.log("Opening download dialog");
    setDownloadDialogOpen(true);
  };

  const handleDownload = (options: DownloadOptions) => {
    if (options.format === "pdf" && instance.url) {
      // Download PDF
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = `Ronak-Subedi-Resume-${options.quality}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
      const link = document.createElement("a");
      link.href = "/screen-reader-qa.html";
      link.download = "Ronak-Subedi-CV.html";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setDownloadDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Download Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={handleDownloadClick}
          disabled={instance.loading}
          className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {instance.error
            ? "Retry Download"
            : instance.loading
            ? "Generating..."
            : "Download CV"}
        </button>
      </div>

      {/* Download Dialog */}
      <DownloadDialog
        open={downloadDialogOpen}
        onOpenChange={setDownloadDialogOpen}
        onDownload={handleDownload}
        pdfUrl={instance.url}
        isGenerating={instance.loading}
      />

      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-8">
              {/* Profile Photo */}
              <div className="w-32 h-32 rounded-full overflow-hidden border border-border bg-secondary/60">
                <img
                  src="/images/heroimage.png"
                  alt={`${resume.name} portrait`}
                  className="w-full h-full object-contain object-[center_50%]"
                />
              </div>

              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                  {resume.name}
                </h1>
                <p className="mt-2 text-lg font-mono text-primary">
                  {resume.title}
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
            <Section title="Summary">
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
            <Section title="Skills">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Backend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.backend.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.frontend.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.tools.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Experience */}
            <Section title="Experience">
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
            <Section title="Projects">
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
          </main>
        </div>
      </div>
    </div>
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

export default Index;
