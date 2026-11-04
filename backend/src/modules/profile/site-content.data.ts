export interface I18nString {
  th: string;
  en: string;
}

export interface AboutContent {
  title: I18nString;
  subtitle: I18nString;
  bio: I18nString;
  statYears: string;
  statYearsLabel: I18nString;
  statProjects: string;
  statProjectsLabel: I18nString;
}

export interface SkillGroup {
  id: string;
  name: I18nString;
  skills: string[];
}

export interface SkillsContent {
  title: I18nString;
  subtitle: I18nString;
  groups: SkillGroup[];
}

export interface ContactInfoContent {
  email: string;
  responseNote: I18nString;
}

export interface SiteContent {
  about: AboutContent;
  skills: SkillsContent;
  contactInfo: ContactInfoContent;
}

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  title: {
    th: 'เกี่ยวกับฉัน',
    en: 'About Me',
  },
  subtitle: {
    th: 'เรื่องราวและความมุ่งมั่นในเส้นทางวิศวกรรมซอฟต์แวร์',
    en: 'Background, journey, and craft in software engineering',
  },
  bio: {
    th: 'ผมเป็นนักพัฒนาซอฟต์แวร์ที่หลงใหลในการสร้างสรรค์โซลูชันที่มีประสิทธิภาพ ชอบการเขียนโค้ดที่สะอาด เป็นระเบียบ (Clean Code) และเรียนรู้เทคโนโลยีใหม่ๆ อยู่เสมอ โดยให้ความสำคัญกับทั้งระบบหลังบ้านที่มั่นคงและหน้าบ้านที่ตอบสนองผู้ใช้ได้เป็นอย่างดี',
    en: 'I am a dedicated software engineer passionate about crafting robust, high-performance web applications. I care deeply about clean code, modern engineering practices, and resilient architecture spanning scalable backend APIs to responsive interfaces.',
  },
  statYears: '03+',
  statYearsLabel: {
    th: 'ปีแห่งการพัฒนาซอฟต์แวร์',
    en: 'Years of Engineering',
  },
  statProjects: '15+',
  statProjectsLabel: {
    th: 'โปรเจกต์ที่สำเร็จ',
    en: 'Completed Projects',
  },
};

export const DEFAULT_SKILLS_CONTENT: SkillsContent = {
  title: {
    th: 'ทักษะและความเชี่ยวชาญ',
    en: 'Skills & Expertise',
  },
  subtitle: {
    th: 'เทคโนโลยีและเครื่องมือที่ใช้งานเป็นประจำ',
    en: 'Technologies and engineering tools used daily',
  },
  groups: [
    {
      id: 'languages',
      name: { th: 'ภาษาเขียนโปรแกรม', en: 'Languages' },
      skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
    },
    {
      id: 'frontend',
      name: { th: 'ฟรอนต์เอนด์ & แอนิเมชัน', en: 'Frontend & Motion' },
      skills: ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Turbopack'],
    },
    {
      id: 'backend',
      name: { th: 'แบ็กเอนด์ & ฐานข้อมูล', en: 'Backend & Database' },
      skills: ['NestJS', 'Node.js', 'Supabase', 'PostgreSQL', 'RESTful API', 'RLS Security'],
    },
    {
      id: 'devops',
      name: { th: 'DevOps & เครื่องมือ', en: 'DevOps & Tools' },
      skills: ['Docker', 'Git & GitHub', 'Railway', 'Linux', 'CI/CD', 'Postman'],
    },
  ],
};

export const DEFAULT_CONTACT_INFO: ContactInfoContent = {
  email: 'contact@pannawat.dev',
  responseNote: {
    th: 'ตอบกลับภายใน 24 ถึง 48 ชั่วโมงสำหรับโอกาสงานวิศวกรรม ระบบฟรีแลนซ์ หรือการร่วมมือทางเทคโนโลยี',
    en: 'Typically responds within 24 to 48 hours for engineering inquiries, freelance systems, or collaboration opportunities.',
  },
};
