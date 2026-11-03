export interface ExperienceItem {
  id: string;
  type: 'work' | 'education';
  title: {
    th: string;
    en: string;
  };
  organization: {
    th: string;
    en: string;
  };
  period: string; // e.g. "2024 - Present"
  description: {
    th: string;
    en: string;
  };
  skills?: string[];
  order: number;
}

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    type: 'work',
    title: {
      th: 'Full-Stack Developer Intern',
      en: 'Full-Stack Developer Intern',
    },
    organization: {
      th: 'Tech Innovation Co., Ltd.',
      en: 'Tech Innovation Co., Ltd.',
    },
    period: '2024 - 2025',
    description: {
      th: 'พัฒนาเว็บแอปพลิเคชันด้วย Next.js และ NestJS ออกแบบ RESTful API และเชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน Supabase พร้อมติดตั้งระบบ CI/CD',
      en: 'Developed web applications using Next.js and NestJS, architected RESTful APIs, integrated PostgreSQL via Supabase, and set up CI/CD workflows.',
    },
    skills: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'TypeScript'],
    order: 1,
  },
  {
    id: 'exp-2',
    type: 'work',
    title: {
      th: 'Frontend & UI Developer (Freelance)',
      en: 'Frontend & UI Developer (Freelance)',
    },
    organization: {
      th: 'Independent Projects',
      en: 'Independent Projects',
    },
    period: '2023 - 2024',
    description: {
      th: 'ออกแบบและพัฒนา Landing Page และ Dashboard สไตล์ Flat Minimal เน้น Performance และ Micro-interactions ด้วย GSAP และ Tailwind CSS',
      en: 'Crafted Flat Minimal landing pages and dashboards focused on web performance and smooth micro-interactions using GSAP and Tailwind CSS.',
    },
    skills: ['React', 'GSAP', 'Tailwind CSS', 'Figma'],
    order: 2,
  },
  {
    id: 'edu-1',
    type: 'education',
    title: {
      th: 'ปริญญาตรี วิทยาการคอมพิวเตอร์ / เทคโนโลยีสารสนเทศ',
      en: 'Bachelor of Science in Computer Science / IT',
    },
    organization: {
      th: 'มหาวิทยาลัยชั้นนำ',
      en: 'Leading University',
    },
    period: '2022 - 2026',
    description: {
      th: 'ศึกษาโครงสร้างข้อมูล อัลกอริทึม การออกแบบระบบซอฟต์แวร์ และการพัฒนาเว็บแอปพลิเคชันสมัยใหม่ เกรดเฉลี่ยดีเด่น',
      en: 'Focused on Data Structures, Algorithms, Software Architecture, and Modern Web Application Development with high honors.',
    },
    skills: ['Software Engineering', 'Algorithms', 'Database Design'],
    order: 3,
  },
];
