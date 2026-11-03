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

