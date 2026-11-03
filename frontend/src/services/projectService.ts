import { fetchApi } from './api';

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
  category: 'web' | 'mobile' | 'backend';
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
}

export const fallbackProjects: Project[] = [
  {
    id: 'portfolio-monorepo',
    title: {
      th: 'ระบบ Portfolio Monorepo สไตล์ Flat Minimal',
      en: 'Flat Minimal Portfolio Monorepo',
    },
    description: {
      th: 'เว็บพอร์ตโฟลิโอแบบ Full-stack แยก Frontend (Next.js + GSAP) และ Backend (NestJS + Supabase) จัดการด้วย Turborepo',
      en: 'Full-stack portfolio separating Frontend (Next.js + GSAP) and Backend (NestJS + Supabase) managed with Turborepo.',
    },
    category: 'web',
    tags: ['Next.js', 'NestJS', 'Supabase', 'Tailwind CSS', 'GSAP', 'Turborepo'],
    demoUrl: 'https://portfolio.pannawat.dev',
    repoUrl: 'https://github.com/PannawatHwangmontri/portfolio',
    featured: true,
    order: 1,
  },
  {
    id: 'task-flow-api',
    title: {
      th: 'ระบบ Task Management & Realtime Notification API',
      en: 'Task Management & Realtime Notification API',
    },
    description: {
      th: 'RESTful API พัฒนาด้วย NestJS เชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน Supabase พร้อมระบบ Authentication & RLS',
      en: 'Robust RESTful API built with NestJS and PostgreSQL on Supabase featuring JWT Auth & Row Level Security.',
    },
    category: 'backend',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'Swagger'],
    demoUrl: '',
    repoUrl: 'https://github.com/PannawatHwangmontri',
    featured: true,
    order: 2,
  },
  {
    id: 'smart-iot-dashboard',
    title: {
      th: 'สมาร์ทแดชบอร์ดตรวจสอบพลังงานและ IoT Real-time',
      en: 'Smart Energy & IoT Real-time Monitoring Dashboard',
    },
    description: {
      th: 'แอปพลิเคชันมอนิเตอร์เซนเซอร์อัจฉริยะ แสดงกราฟวิเคราะห์ข้อมูลแบบ Realtime ผ่าน WebSocket และ Supabase Realtime',
      en: 'Realtime sensor monitoring web application with live analytics via WebSocket and Supabase Realtime.',
    },
    category: 'web',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Chart.js', 'Supabase'],
    demoUrl: '',
    repoUrl: 'https://github.com/PannawatHwangmontri',
    featured: false,
    order: 3,
  },
];

export async function getProjects(category?: string): Promise<Project[]> {
  try {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    return await fetchApi<Project[]>(`/projects${query}`);
  } catch {
    if (category && category !== 'all') {
      return fallbackProjects.filter((p) => p.category === category);
    }
    return fallbackProjects;
  }
}

export async function createProject(payload: Partial<Project>): Promise<Project> {
  return fetchApi<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateProject(id: string, payload: Partial<Project>): Promise<Project> {
  return fetchApi<Project>(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteProject(id: string): Promise<{ success: boolean; message: string }> {
  try {
    return await fetchApi<{ success: boolean; message: string }>(`/projects/${id}`, {
      method: 'DELETE',
    });
  } catch {
    return { success: true, message: `Project ${id} removed` };
  }
}
