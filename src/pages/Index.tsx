import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Download, MapPin, Mail, Phone, Github, Linkedin } from "lucide-react";
import ResumePdf from "@/components/ResumePdf";
import { resume } from "@/data/resumeData";
import BlogSection from "@/components/BlogSection";
import { blogPosts } from "@/data/blogPosts";
import { pdf, usePDF } from "@react-pdf/renderer";
import DownloadDialog, {
  type DownloadOptions,
} from "@/components/DownloadDialog";
import ThemeToggle from "@/components/ThemeToggle";

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

  const handleDownload = async (
    options: DownloadOptions,
    resolvedUrl: string | null
  ) => {
    try {
      // Ensure we have a URL with the chosen options; generate if preview not ready
      let urlToUse = resolvedUrl;
      if (!urlToUse) {
        const blob = await pdf(
          <ResumePdf
            pageOrientation={options.pageOrientation}
            includeContact={options.includeContact}
            includeSocialLinks={options.includeSocialLinks}
            includeProjects={options.includeProjects}
            includeSummary={options.includeSummary}
            includeSkills={options.includeSkills}
            includeExperience={options.includeExperience}
            includeEducation={options.includeEducation}
            includeLanguagesInterests={options.includeLanguagesInterests}
            quality={options.quality}
          />
        ).toBlob();
        urlToUse = URL.createObjectURL(blob);
      }

      // Open print preview in the same tab using a hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.src = urlToUse;

      iframe.onload = () => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (err) {
          console.error("Print failed, fallback to open", err);
          window.location.href = urlToUse || "";
        }

        // Clean up after print call
        setTimeout(() => {
          iframe.remove();
          if (urlToUse && !resolvedUrl) {
            URL.revokeObjectURL(urlToUse);
          }
        }, 2000);
      };

      document.body.appendChild(iframe);
    } catch (err) {
      console.error("Failed to generate PDF for printing", err);
      alert("Could not prepare the PDF. Please try again.");
    }

    setDownloadDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Download Button & Theme Toggle */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
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
        <ThemeToggle />
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
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/20 cursor-pointer"
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
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/20 cursor-pointer"
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
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/20 cursor-pointer"
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

            {/* Blog / Publications (DEBUG BANNER ADDED) */}
            {console.log("Index: rendering blog area")}
            <div id="blog-debug-banner" style={{background:'#fffbeb',color:'#92400e',padding:16,borderRadius:8,marginBottom:16,border:'2px solid #f59e0b',fontWeight:700}}>
              BLOG SECTION DEBUG — should appear above Education (bright banner)
            </div>
            <BlogSection posts={blogPosts} viewAllUrl="https://blog.ronaksubedi.com.np/" />

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
