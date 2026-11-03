'use client';

import React, { useEffect, useState, useMemo, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredAdmin, logoutAdmin, AdminUser } from '@/services/authService';
import { getProjects, createProject, deleteProject, Project } from '@/services/projectService';
import { getExperiences, deleteExperience, ExperienceItem } from '@/services/experienceService';
import { getCertificates, deleteCertificate, Certificate } from '@/services/certificateService';
import { getArticles, deleteArticle, Article } from '@/services/articleService';
import { getContactMessages, deleteContactMessage, ContactMessage } from '@/services/contactService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Briefcase,
  FileText,
  FolderGit2,
  LogOut,
  Mail,
  Plus,
  Trash2,
  ExternalLink,
  Award,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'projects' | 'experience' | 'certificates' | 'articles' | 'messages';

const subscribeStorage = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

function useAdminUser(): AdminUser | null {
  const raw = useSyncExternalStore(
    subscribeStorage,
    () => {
      try {
        return localStorage.getItem('admin_user');
      } catch {
        return null;
      }
    },
    () => null
  );

  return useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, [raw]);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const user = useAdminUser();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [statusMsg, setStatusMsg] = useState('');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Simple Add Modals
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    thTitle: '',
    enTitle: '',
    thDesc: '',
    enDesc: '',
    category: 'web' as 'web' | 'mobile' | 'backend',
    tags: 'Next.js, TypeScript',
    demoUrl: '',
    repoUrl: '',
  });

  useEffect(() => {
    const admin = getStoredAdmin();
    if (!admin) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [p, exp, cert, art, msg] = await Promise.all([
          getProjects(),
          getExperiences(),
          getCertificates(),
          getArticles(),
          getContactMessages().catch(() => []),
        ]);
        setProjects(p);
        setExperiences(exp);
        setCertificates(cert);
        setArticles(art);
        setMessages(msg);
      } catch (err) {
        console.error('Failed to load admin data', err);
      }
    };
    fetchData();
  }, [router]);

  const notify = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  // Project Actions
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectPayload: Partial<Project> = {
        id: `project-${Date.now()}`,
        title: { th: newProject.thTitle, en: newProject.enTitle },
        description: { th: newProject.thDesc, en: newProject.enDesc },
        category: newProject.category,
        tags: newProject.tags.split(',').map((t) => t.trim()),
        demoUrl: newProject.demoUrl,
        repoUrl: newProject.repoUrl,
      };
      const created = await createProject(projectPayload).catch(() => projectPayload as Project);
      setProjects([created, ...projects]);
      setShowProjectModal(false);
      setNewProject({
        thTitle: '',
        enTitle: '',
        thDesc: '',
        enDesc: '',
        category: 'web',
        tags: 'Next.js, TypeScript',
        demoUrl: '',
        repoUrl: '',
      });
      notify('สร้างผลงานใหม่สำเร็จแล้ว!');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error creating project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('ยืนยันลบโปรเจกต์นี้?')) return;
    try {
      await deleteProject(id).catch((e) => console.warn('Backend API unavailable, updated locally', e));
      setProjects((prev) => prev.filter((p) => p.id !== id));
      notify('ลบโปรเจกต์เรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error deleting project');
    }
  };

  // Experience Delete
  const handleDeleteExperience = async (id: string) => {
    if (!confirm('ยืนยันลบรายการนี้?')) return;
    try {
      await deleteExperience(id).catch((e) => console.warn('Backend API unavailable, updated locally', e));
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      notify('ลบข้อมูลเรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    }
  };

  // Certificate Delete
  const handleDeleteCertificate = async (id: string) => {
    if (!confirm('ยืนยันลบใบรับรองนี้?')) return;
    try {
      await deleteCertificate(id).catch((e) => console.warn('Backend API unavailable, updated locally', e));
      setCertificates((prev) => prev.filter((c) => c.id !== id));
      notify('ลบใบรับรองเรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    }
  };

  // Article Delete
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('ยืนยันลบบทความนี้?')) return;
    try {
      await deleteArticle(id).catch((e) => console.warn('Backend API unavailable, updated locally', e));
      setArticles((prev) => prev.filter((a) => a.id !== id));
      notify('ลบบทความเรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    }
  };

  // Message Delete
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('ยืนยันลบข้อความนี้?')) return;
    try {
      await deleteContactMessage(id).catch((e) => console.warn('Backend API unavailable, updated locally', e));
      setMessages((prev) => prev.filter((m) => m.id !== id));
      notify('ลบข้อความเรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xs font-mono text-muted">Loading admin center...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Admin Header */}
      <header className="bg-surface border-b border-border-subtle sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-accent text-accent-contrast font-bold text-xs">
              CMS
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">
                Portfolio Admin Center
              </h1>
              <p className="text-xs text-muted font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-accent">
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-xs text-rose-600 hover:text-rose-700 focus-visible:ring-2 focus-visible:ring-accent">
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Notification Toast */}
        {statusMsg && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-border-subtle bg-surface">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-accent-subtle text-accent">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">ผลงานทั้งหมด</p>
                <p className="text-xl font-bold text-foreground">{projects.length}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border-subtle bg-surface">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">ประวัติ/การศึกษา</p>
                <p className="text-xl font-bold text-foreground">{experiences.length}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border-subtle bg-surface">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">ใบรับรอง</p>
                <p className="text-xl font-bold text-foreground">{certificates.length}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border-subtle bg-surface">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">บทความ</p>
                <p className="text-xl font-bold text-foreground">{articles.length}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border-subtle bg-surface">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">ข้อความติดต่อ</p>
                <p className="text-xl font-bold text-foreground">{messages.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-border-subtle mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'projects'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>จัดการผลงาน (Projects)</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'experience'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>ประวัติทำงาน/ศึกษา</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'certificates'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>เกียรติบัตร/ใบรับรอง</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'articles'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>บทความ</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'messages'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>ข้อความติดต่อ ({messages.length})</span>
          </button>
        </div>

        {/* Tab 1: Projects */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">รายการผลงาน (Projects)</h2>
              <Button size="sm" variant="primary" onClick={() => setShowProjectModal(true)} className="gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-accent">
                <Plus className="w-4 h-4" />
                <span>เพิ่มผลงานใหม่</span>
              </Button>
            </div>

            <div className="bg-surface rounded-xl border border-border-subtle overflow-hidden">
              <table className="w-full text-left text-xs text-muted">
                <thead className="bg-surface-subtle text-muted font-semibold border-b border-border-subtle">
                  <tr>
                    <th className="p-3.5">ชื่อโปรเจกต์ (TH / EN)</th>
                    <th className="p-3.5">หมวดหมู่</th>
                    <th className="p-3.5">Tags</th>
                    <th className="p-3.5">ลิงก์</th>
                    <th className="p-3.5 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-subtle/50 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-foreground">{p.title.th}</div>
                        <div className="text-muted text-xs">{p.title.en}</div>
                      </td>
                      <td className="p-3.5">
                        <Badge variant="neutral">{p.category}</Badge>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {p.tags.map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-surface-subtle text-muted border border-border-subtle text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          {p.demoUrl && <a href={p.demoUrl} target="_blank" className="text-accent hover:underline">Demo</a>}
                          {p.repoUrl && <a href={p.repoUrl} target="_blank" className="text-muted hover:underline">Repo</a>}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded text-rose-500 hover:bg-rose-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                          title="ลบ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Experience */}
        {activeTab === 'experience' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">ประวัติทำงานและการศึกษา</h2>
            </div>
            <div className="space-y-3">
              {experiences.map((e) => (
                <div key={e.id} className="p-4 rounded-xl border border-border-subtle bg-surface flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="neutral">{e.type === 'work' ? 'การทำงาน' : 'การศึกษา'}</Badge>
                      <span className="font-bold text-foreground">{e.title.th}</span>
                      <span className="text-muted text-xs">({e.organization.th})</span>
                    </div>
                    <p className="text-xs text-muted mt-1">{e.period} • {e.description.th}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteExperience(e.id)}
                    className="p-1.5 rounded text-rose-500 hover:bg-rose-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Certificates */}
        {activeTab === 'certificates' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">เกียรติบัตรและใบรับรอง</h2>
            </div>
            <div className="space-y-3">
              {certificates.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border border-border-subtle bg-surface flex items-center justify-between">
                  <div>
                    <span className="font-bold text-foreground">{c.title.th}</span>
                    <p className="text-xs text-muted mt-1">{c.issuer} • {c.issueDate}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCertificate(c.id)}
                    className="p-1.5 rounded text-rose-500 hover:bg-rose-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Articles */}
        {activeTab === 'articles' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">บทความและบันทึกความรู้</h2>
            </div>
            <div className="space-y-3">
              {articles.map((a) => (
                <div key={a.id} className="p-4 rounded-xl border border-border-subtle bg-surface flex items-center justify-between">
                  <div>
                    <span className="font-bold text-foreground">{a.title.th}</span>
                    <p className="text-xs text-muted mt-1">{a.category} • {a.readTime} • {a.publishedAt}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteArticle(a.id)}
                    className="p-1.5 rounded text-rose-500 hover:bg-rose-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Messages */}
        {activeTab === 'messages' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">กล่องข้อความติดต่อ ({messages.length})</h2>
            </div>

            {messages.length === 0 ? (
              <div className="p-8 rounded-xl border border-border-subtle bg-surface text-center text-muted text-xs">
                ยังไม่มีข้อความติดต่อเข้ามา
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl border border-border-subtle bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{m.name}</span>
                        <a href={`mailto:${m.email}`} className="text-accent hover:underline text-xs">
                          {m.email}
                        </a>
                        <span className="text-muted text-xs font-mono">{new Date(m.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-foreground mt-2 bg-surface-subtle p-2.5 rounded-lg border border-border-subtle">
                        &ldquo;{m.message}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-2 rounded text-rose-500 hover:bg-rose-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                        title="ลบข้อความ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Project Create Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg p-6 bg-surface border border-border-subtle rounded-xl shadow-xl">
              <h3 className="text-base font-bold text-foreground mb-4">
                เพิ่มผลงานใหม่ (Add Project)
              </h3>
              <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1 text-foreground">ชื่อโปรเจกต์ (ไทย)</label>
                  <input
                    type="text"
                    required
                    value={newProject.thTitle}
                    onChange={(e) => setNewProject({ ...newProject, thTitle: e.target.value })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    placeholder="เช่น ระบบ Task Management"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-foreground">ชื่อโปรเจกต์ (อังกฤษ)</label>
                  <input
                    type="text"
                    required
                    value={newProject.enTitle}
                    onChange={(e) => setNewProject({ ...newProject, enTitle: e.target.value })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    placeholder="e.g. Task Management API"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-foreground">คำอธิบาย (ไทย)</label>
                  <textarea
                    rows={2}
                    required
                    value={newProject.thDesc}
                    onChange={(e) => setNewProject({ ...newProject, thDesc: e.target.value })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-foreground">คำอธิบาย (อังกฤษ)</label>
                  <textarea
                    rows={2}
                    required
                    value={newProject.enDesc}
                    onChange={(e) => setNewProject({ ...newProject, enDesc: e.target.value })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">หมวดหมู่</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as 'web' | 'mobile' | 'backend' })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      <option value="web">Web Apps</option>
                      <option value="mobile">Mobile</option>
                      <option value="backend">Backend / API</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">Tags (คั่นด้วยจุลภาค)</label>
                    <input
                      type="text"
                      value={newProject.tags}
                      onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="React, NestJS, Supabase"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">Demo URL</label>
                    <input
                      type="url"
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">Source Code URL</label>
                    <input
                      type="url"
                      value={newProject.repoUrl}
                      onChange={(e) => setNewProject({ ...newProject, repoUrl: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <Button variant="ghost" size="sm" type="button" onClick={() => setShowProjectModal(false)} className="focus-visible:ring-2 focus-visible:ring-accent">
                    ยกเลิก
                  </Button>
                  <Button variant="primary" size="sm" type="submit" className="focus-visible:ring-2 focus-visible:ring-accent">
                    บันทึกผลงาน
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
