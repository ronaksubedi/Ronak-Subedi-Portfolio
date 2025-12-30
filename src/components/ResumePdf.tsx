import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { resume } from "@/data/resumeData";

export interface ResumePdfOptions {
  pageOrientation?: "portrait" | "landscape";
  includeContact?: boolean;
  includeProjects?: boolean;
  includeSocialLinks?: boolean;
  includeSummary?: boolean;
  includeSkills?: boolean;
  includeExperience?: boolean;
  includeEducation?: boolean;
  includeLanguagesInterests?: boolean;
  quality?: "standard" | "high";
}

const COLORS = {
  text: "#1f2933",
  muted: "#4b5563",
  accent: "#0d9488",
  border: "#e5e7eb",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingHorizontal: 28,
    paddingVertical: 26,
    color: COLORS.text,
  },
  header: {
    marginBottom: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.text,
  },
  title: {
    fontSize: 11,
    fontWeight: 600,
    color: COLORS.accent,
    marginTop: 3,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  contactItem: {
    fontSize: 9,
    color: COLORS.muted,
    marginRight: 8,
    marginBottom: 4,
  },
  link: {
    fontSize: 9,
    color: COLORS.accent,
    textDecoration: "none",
  },
  section: {
    marginTop: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.text,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 9,
    color: COLORS.muted,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillBlock: {
    flexGrow: 1,
    minWidth: 140,
    marginRight: 10,
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: COLORS.text,
    marginBottom: 4,
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pill: {
    fontSize: 8,
    color: COLORS.text,
    backgroundColor: "#f3f4f6",
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,
  },
  experienceItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  expRole: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.text,
  },
  expPeriod: {
    fontSize: 9,
    color: COLORS.muted,
  },
  expCompany: {
    fontSize: 9,
    color: COLORS.accent,
    marginTop: 2,
    marginBottom: 4,
  },
  bullet: {
    fontSize: 9,
    color: COLORS.muted,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.text,
  },
  projectDesc: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 2,
  },
  projectStack: {
    fontSize: 8,
    color: COLORS.accent,
    marginTop: 2,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.text,
  },
  eduMeta: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 2,
  },
  smallList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smallItem: {
    fontSize: 9,
    color: COLORS.muted,
    marginRight: 6,
    marginBottom: 4,
  },
});

const ResumePdf = ({
  pageOrientation = "portrait",
  includeContact = true,
  includeProjects = true,
  includeSocialLinks = true,
  includeSummary = true,
  includeSkills = true,
  includeExperience = true,
  includeEducation = true,
  includeLanguagesInterests = true,
  quality = "high",
}: ResumePdfOptions = {}) => {
  // Adjust font sizes based on quality
  const baseFontSize = quality === "high" ? 10 : 9;
  const headerSize = quality === "high" ? 18 : 16;

  return (
    <Document>
      <Page size="A4" orientation={pageOrientation} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.name}</Text>
          <Text style={styles.title}>{resume.title}</Text>
          {includeContact && (
            <View style={styles.contactRow}>
              <Text style={styles.contactItem}>{resume.contacts.phone}</Text>
              <Text style={styles.contactItem}>{resume.contacts.email}</Text>
              <Text style={styles.contactItem}>{resume.location}</Text>
              {includeSocialLinks && (
                <>
                  <Link src={resume.contacts.linkedin} style={styles.link}>
                    LinkedIn
                  </Link>
                  <Link src={resume.contacts.github} style={styles.link}>
                    GitHub
                  </Link>
                  {resume.contacts.facebook && (
                    <Link src={resume.contacts.facebook} style={styles.link}>
                      Facebook
                    </Link>
                  )}
                  {resume.contacts.instagram && (
                    <Link src={resume.contacts.instagram} style={styles.link}>
                      Instagram
                    </Link>
                  )}
                  {resume.contacts.portfolio && (
                    <Link src={resume.contacts.portfolio} style={styles.link}>
                      Portfolio
                    </Link>
                  )}
                </>
              )}
            </View>
          )}
        </View>

        {/* Summary */}
        {includeSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            {resume.summary.map((line, idx) => (
              <Text key={idx} style={styles.paragraph}>
                {line}
              </Text>
            ))}
          </View>
        )}

        {/* Skills */}
        {includeSkills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillsRow}>
              <View style={styles.skillBlock}>
                <Text style={styles.skillLabel}>Backend</Text>
                <View style={styles.pillWrap}>
                  {resume.skills.backend.map((s) => (
                    <Text key={s} style={styles.pill}>
                      {s}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.skillBlock}>
                <Text style={styles.skillLabel}>Frontend</Text>
                <View style={styles.pillWrap}>
                  {resume.skills.frontend.map((s) => (
                    <Text key={s} style={styles.pill}>
                      {s}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.skillBlock}>
                <Text style={styles.skillLabel}>Tools</Text>
                <View style={styles.pillWrap}>
                  {resume.skills.tools.map((s) => (
                    <Text key={s} style={styles.pill}>
                      {s}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Experience */}
        {includeExperience && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {resume.experience.map((exp, idx) => (
              <View key={idx} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRole}>
                    {exp.role} · {exp.company}
                  </Text>
                  <Text style={styles.expPeriod}>
                    {exp.from} – {exp.to}
                  </Text>
                </View>
                <Text style={styles.expCompany}>{exp.location}</Text>
                {exp.bullets.map((b, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {b}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {includeProjects && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((p, idx) => (
              <View key={idx} style={styles.projectItem}>
                <Text style={styles.projectName}>{p.name}</Text>
                <Text style={styles.projectDesc}>{p.description}</Text>
                <Text style={styles.projectStack}>{p.stack.join(" • ")}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {includeEducation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((e, idx) => (
              <View key={idx} style={styles.eduItem}>
                <Text style={styles.eduDegree}>{e.degree}</Text>
                <Text style={styles.eduMeta}>
                  {e.institution} · {e.location}
                </Text>
                <Text style={styles.eduMeta}>{e.year}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages & Interests */}
        {includeLanguagesInterests && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages & Interests</Text>
            <View style={styles.smallList}>
              {resume.languages.map((l) => (
                <Text key={l} style={styles.smallItem}>
                  {l}
                </Text>
              ))}
            </View>
            <View style={[styles.smallList, { marginTop: 4 }]}>
              {resume.interests.map((i) => (
                <Text key={i} style={styles.smallItem}>
                  {i}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePdf;
