import { fetchApi } from './api';

export interface Article {
  id: string;
  title: {
    th: string;
    en: string;
  };
  summary: {
    th: string;
    en: string;
  };
  category: string;
  readTime: string;
  publishedAt: string;
  url?: string;
  order: number;
}

export const fallbackArticles: Article[] = [
  {
    id: 'art-1',
    title: {
      th: 'การจัดการ Monorepo ด้วย Turborepo และสถาปัตยกรรม Clean Code',
      en: 'Managing Monorepos with Turborepo & Clean Code Architecture',
    },
    summary: {
      th: 'เจาะลึกการวางโครงสร้างโปรเจกต์ขนาดใหญ่ แยก Frontend และ Backend ชัดเจน พร้อมแชร์ Types และ Config อย่างมีประสิทธิภาพ',
      en: 'Deep dive into architecting enterprise-ready monorepos with Turborepo, decoupling frontend and backend services while sharing configs.',
    },
    category: 'Architecture',
    readTime: '5 min read',
    publishedAt: '2025-01-15',
    url: '#',
    order: 1,
  },
  {
    id: 'art-2',
    title: {
      th: 'สไตล์ Flat Minimal: การออกแบบ UI ที่อ่านง่ายและโหลดไว',
      en: 'Flat Minimal: Crafting Readable and High-Performance UI',
    },
    summary: {
      th: 'หลักการออกแบบเว็บพอร์ตโฟลิโอด้วยสีขาว คมชัดด้วย Accent ฟ้า Sky Blue และเพิ่มชีวิตชีวาด้วย Micro-interactions จาก GSAP',
      en: 'Principles of minimalist portfolio design using crisp typography, Sky Blue accents, and buttery smooth GSAP micro-interactions.',
    },
    category: 'Design & UX',
    readTime: '4 min read',
    publishedAt: '2025-02-01',
    url: '#',
    order: 2,
  },
];

export async function getArticles(): Promise<Article[]> {
  try {
    return await fetchApi<Article[]>('/articles');
  } catch {
    return fallbackArticles;
  }
}

export async function createArticle(payload: Partial<Article>): Promise<Article> {
  return fetchApi<Article>('/articles', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateArticle(id: string, payload: Partial<Article>): Promise<Article> {
  return fetchApi<Article>(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteArticle(id: string): Promise<{ success: boolean; message: string }> {
  try {
    return await fetchApi<{ success: boolean; message: string }>(`/articles/${id}`, {
      method: 'DELETE',
    });
  } catch {
    return { success: true, message: `Article ${id} removed` };
  }
}
