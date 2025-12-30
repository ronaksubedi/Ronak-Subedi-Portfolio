import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { pdf } from "@react-pdf/renderer";
import ResumePdf from "./ResumePdf";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (options: DownloadOptions, resolvedUrl: string | null) => void;
  pdfUrl: string | null;
  isGenerating: boolean;
}

export interface DownloadOptions {
  format: "pdf";
  pageOrientation: "portrait" | "landscape";
  includeContact: boolean;
  includeSocialLinks: boolean;
  includeProjects: boolean;
  includeSummary: boolean;
  includeSkills: boolean;
  includeExperience: boolean;
  includeEducation: boolean;
  includeLanguagesInterests: boolean;
  quality: "standard" | "high";
}

export default function DownloadDialog({
  open,
  onOpenChange,
  onDownload,
  pdfUrl,
  isGenerating,
}: DownloadDialogProps) {
  const [options, setOptions] = useState<DownloadOptions>({
    format: "pdf",
    pageOrientation: "portrait",
    includeContact: true,
    includeSocialLinks: true,
    includeProjects: true,
    includeSummary: true,
    includeSkills: true,
    includeExperience: true,
    includeEducation: true,
    includeLanguagesInterests: true,
    quality: "high",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // Generate preview when options change
  useEffect(() => {
    if (!open) return;

    const generatePreview = async () => {
      setIsLoadingPreview(true);
      try {
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

        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      } catch (error) {
        console.error("Preview generation error:", error);
      } finally {
        setIsLoadingPreview(false);
      }
    };

    generatePreview();

    // Cleanup
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [
    open,
    options.pageOrientation,
    options.includeContact,
    options.includeSocialLinks,
    options.includeProjects,
    options.includeSummary,
    options.includeSkills,
    options.includeExperience,
    options.includeEducation,
    options.includeLanguagesInterests,
    options.quality,
  ]);

  const handleDownload = () => {
    onDownload(options, previewUrl || pdfUrl);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] max-w-[95vw] h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Download CV
          </DialogTitle>
          <DialogDescription>
            Choose your preferred format and options for the download
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-6 flex-1 overflow-hidden">
          {/* Left Side - Preview */}
          <div className="flex-1 border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center relative">
            {isLoadingPreview ? (
              <div className="text-sm text-muted-foreground">
                Generating preview...
              </div>
            ) : previewUrl ? (
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="CV Preview"
              />
            ) : (
              <div className="text-sm text-muted-foreground">
                No preview available
              </div>
            )}
          </div>

          {/* Right Side - Options */}
          <div className="w-[280px] space-y-4 overflow-y-auto pr-2">
            {/* Page Orientation */}
            <div className="space-y-2">
              <Label htmlFor="orientation" className="text-sm font-medium">
                Page Orientation
              </Label>
              <Select
                value={options.pageOrientation}
                onValueChange={(value: "portrait" | "landscape") =>
                  setOptions({ ...options, pageOrientation: value })
                }
              >
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="Select orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quality Selection */}
            <div className="space-y-2">
              <Label htmlFor="quality" className="text-sm font-medium">
                Quality
              </Label>
              <Select
                value={options.quality}
                onValueChange={(value: "standard" | "high") =>
                  setOptions({ ...options, quality: value })
                }
              >
                <SelectTrigger id="quality">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High Quality</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Include Sections</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="contact"
                    checked={options.includeContact}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeContact: !!checked })
                    }
                  />
                  <label
                    htmlFor="contact"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Contact Information
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="socialLinks"
                    checked={options.includeSocialLinks}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeSocialLinks: !!checked })
                    }
                  />
                  <label
                    htmlFor="socialLinks"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Social Links
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="projects"
                    checked={options.includeProjects}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeProjects: !!checked })
                    }
                  />
                  <label
                    htmlFor="projects"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Projects Section
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="summary"
                    checked={options.includeSummary}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeSummary: !!checked })
                    }
                  />
                  <label
                    htmlFor="summary"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Summary
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="skills"
                    checked={options.includeSkills}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeSkills: !!checked })
                    }
                  />
                  <label
                    htmlFor="skills"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Technical Skills
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="experience"
                    checked={options.includeExperience}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeExperience: !!checked })
                    }
                  />
                  <label
                    htmlFor="experience"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Work Experience
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="education"
                    checked={options.includeEducation}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, includeEducation: !!checked })
                    }
                  />
                  <label
                    htmlFor="education"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Education
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="languagesInterests"
                    checked={options.includeLanguagesInterests}
                    onCheckedChange={(checked) =>
                      setOptions({
                        ...options,
                        includeLanguagesInterests: !!checked,
                      })
                    }
                  />
                  <label
                    htmlFor="languagesInterests"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Languages & Interests
                  </label>
                </div>
              </div>
            </div>

            {/* Note about printer targets */}
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded border border-border/40">
              Note: In the browser print dialog you can choose built-in targets like
              "Microsoft XPS Document Writer", "Microsoft Print to PDF", or "Fax".
            </div>

            {/* Status Message */}
            {(isGenerating || isLoadingPreview) && (
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                {isLoadingPreview
                  ? "Updating preview..."
                  : "Generating your CV..."}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
          <Button
            variant="outline"
            onClick={() => {
              const targetUrl = previewUrl || pdfUrl;
              if (targetUrl) {
                window.open(targetUrl, "_blank", "noopener,noreferrer");
              }
            }}
            disabled={!previewUrl && !pdfUrl}
            className="min-w-[120px]"
          >
            Open Preview
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            disabled={
              isGenerating ||
              isLoadingPreview ||
              (!previewUrl && !pdfUrl)
            }
            className="min-w-[100px]"
          >
            {isGenerating
              ? "Generating..."
              : isLoadingPreview || (!previewUrl && !pdfUrl)
              ? "Preparing preview..."
              : "Download"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
