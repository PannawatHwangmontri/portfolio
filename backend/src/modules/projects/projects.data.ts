export interface Project {
  id: string;
  title: {
    th: string;
    en: string;
  };
  description: {
    th: string;
    en: string;
  };
  category: 'web' | 'mobile' | 'backend' | 'github';
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt: string;
}

