'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredAdmin, logoutAdmin, AdminUser } from '@/services/authService';
import { getProjects, createProject, deleteProject, Project } from '@/services/projectService';
import { getExperiences, deleteExperience, ExperienceItem } from '@/services/experienceService';
import { getCertificates, deleteCertificate, Certificate } from '@/services/certificateService';
import { getArticles, deleteArticle, Article } from '@/services/articleService';
import { getContactMessages, deleteContactMessage, ContactMessage } from '@/services/contactService';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user] = useState<AdminUser | null>(() => getStoredAdmin());
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
      const created = await createProject({
        title: { th: newProject.thTitle, en: newProject.enTitle },
        description: { th: newProject.thDesc, en: newProject.enDesc },
        category: newProject.category,
        tags: newProject.tags.split(',').map((t) => t.trim()),
        demoUrl: newProject.demoUrl,
        repoUrl: newProject.repoUrl,
      });
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
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      notify('ลบโปรเจกต์เรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error deleting project');
    }
  };

  // Experience Delete
  const handleDeleteExperience = async (id: string) => {
    if (!confirm('ยืนยันลบรายการนี้?')) return;
    try {
      await deleteExperience(id);
      setExperiences(experiences.filter((e) => e.id !== id));
      notify('ลบข้อมูลเรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    }
  };

  // Certificate Delete
  const handleDeleteCertificate = async (id: string) => {
    if (!confirm('ยืนยันลบใบรับรองนี้?')) return;
    try {
      await deleteCertificate(id);
      setCertificates(certificates.filter((c) => c.id !== id));
      notify('ลบใบรับรองเรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    }
  };

  // Article Delete
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('ยืนยันลบบทความนี้?')) return;
    try {
      await deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
      notify('ลบบทความเรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    }
  };

  // Message Delete
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('ยืนยันลบข้อความนี้?')) return;
    try {
      await deleteContactMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
      notify('ลบข้อความเรียบร้อย');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top Admin Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-sky-600 text-white font-bold text-xs">
              CMS
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Portfolio Admin Center
              </h1>
              <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-xs text-rose-600 hover:text-rose-700">
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
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">ผลงานทั้งหมด</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{projects.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">ประวัติ/การศึกษา</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{experiences.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">ใบรับรอง</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{certificates.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">บทความ</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{articles.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">ข้อความติดต่อ</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{messages.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-white dark:bg-slate-900 border-t-2 border-t-sky-600 text-sky-600 font-bold border-x border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>จัดการผลงาน (Projects)</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'experience'
                ? 'bg-white dark:bg-slate-900 border-t-2 border-t-sky-600 text-sky-600 font-bold border-x border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>ประวัติทำงาน/ศึกษา</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'certificates'
                ? 'bg-white dark:bg-slate-900 border-t-2 border-t-sky-600 text-sky-600 font-bold border-x border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>เกียรติบัตร/ใบรับรอง</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-white dark:bg-slate-900 border-t-2 border-t-sky-600 text-sky-600 font-bold border-x border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>บทความ</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'bg-white dark:bg-slate-900 border-t-2 border-t-sky-600 text-sky-600 font-bold border-x border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
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
              <h2 className="text-base font-bold text-slate-900 dark:text-white">รายการผลงาน (Projects)</h2>
              <Button size="sm" variant="primary" onClick={() => setShowProjectModal(true)} className="gap-1.5 text-xs">
                <Plus className="w-4 h-4" />
                <span>เพิ่มผลงานใหม่</span>
              </Button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">ชื่อโปรเจกต์ (TH / EN)</th>
                    <th className="p-3.5">หมวดหมู่</th>
                    <th className="p-3.5">Tags</th>
                    <th className="p-3.5">ลิงก์</th>
                    <th className="p-3.5 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">{p.title.th}</div>
                        <div className="text-slate-400 text-xs">{p.title.en}</div>
                      </td>
                      <td className="p-3.5">
                        <Badge variant="neutral">{p.category}</Badge>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {p.tags.map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          {p.demoUrl && <a href={p.demoUrl} target="_blank" className="text-sky-600 hover:underline">Demo</a>}
                          {p.repoUrl && <a href={p.repoUrl} target="_blank" className="text-slate-500 hover:underline">Repo</a>}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
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
              <h2 className="text-base font-bold text-slate-900 dark:text-white">ประวัติทำงานและการศึกษา</h2>
            </div>
            <div className="space-y-3">
              {experiences.map((e) => (
                <Card key={e.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="neutral">{e.type === 'work' ? 'การทำงาน' : 'การศึกษา'}</Badge>
                      <span className="font-bold text-slate-900 dark:text-white">{e.title.th}</span>
                      <span className="text-slate-400 text-xs">({e.organization.th})</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{e.period} • {e.description.th}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteExperience(e.id)}
                    className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Certificates */}
        {activeTab === 'certificates' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">เกียรติบัตรและใบรับรอง</h2>
            </div>
            <div className="space-y-3">
              {certificates.map((c) => (
                <Card key={c.id} className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{c.title.th}</span>
                    <p className="text-xs text-slate-500 mt-1">{c.issuer} • {c.issueDate}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCertificate(c.id)}
                    className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Articles */}
        {activeTab === 'articles' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">บทความและบันทึกความรู้</h2>
            </div>
            <div className="space-y-3">
              {articles.map((a) => (
                <Card key={a.id} className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{a.title.th}</span>
                    <p className="text-xs text-slate-500 mt-1">{a.category} • {a.readTime} • {a.publishedAt}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteArticle(a.id)}
                    className="p-1.5 rounded text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Messages */}
        {activeTab === 'messages' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">กล่องข้อความติดต่อ ({messages.length})</h2>
            </div>

            {messages.length === 0 ? (
              <Card className="p-8 text-center text-slate-400 text-xs">
                ยังไม่มีข้อความติดต่อเข้ามา
              </Card>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <Card key={m.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{m.name}</span>
                        <a href={`mailto:${m.email}`} className="text-sky-600 hover:underline text-xs">
                          {m.email}
                        </a>
                        <span className="text-slate-400 text-xs font-mono">{new Date(m.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        &ldquo;{m.message}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-2 rounded text-rose-500 hover:bg-rose-50 transition-colors"
                        title="ลบข้อความ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Project Create Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <Card className="w-full max-w-lg p-6 bg-white dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                เพิ่มผลงานใหม่ (Add Project)
              </h3>
              <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">ชื่อโปรเจกต์ (ไทย)</label>
                  <input
                    type="text"
                    required
                    value={newProject.thTitle}
                    onChange={(e) => setNewProject({ ...newProject, thTitle: e.target.value })}
                    className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                    placeholder="เช่น ระบบ Task Management"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">ชื่อโปรเจกต์ (อังกฤษ)</label>
                  <input
                    type="text"
                    required
                    value={newProject.enTitle}
                    onChange={(e) => setNewProject({ ...newProject, enTitle: e.target.value })}
                    className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                    placeholder="e.g. Task Management API"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">คำอธิบาย (ไทย)</label>
                  <textarea
                    rows={2}
                    required
                    value={newProject.thDesc}
                    onChange={(e) => setNewProject({ ...newProject, thDesc: e.target.value })}
                    className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">คำอธิบาย (อังกฤษ)</label>
                  <textarea
                    rows={2}
                    required
                    value={newProject.enDesc}
                    onChange={(e) => setNewProject({ ...newProject, enDesc: e.target.value })}
                    className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">หมวดหมู่</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as 'web' | 'mobile' | 'backend' })}
                      className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                    >
                      <option value="web">Web Apps</option>
                      <option value="mobile">Mobile</option>
                      <option value="backend">Backend / API</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Tags (คั่นด้วยจุลภาค)</label>
                    <input
                      type="text"
                      value={newProject.tags}
                      onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                      className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      placeholder="React, NestJS, Supabase"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Demo URL</label>
                    <input
                      type="url"
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Source Code URL</label>
                    <input
                      type="url"
                      value={newProject.repoUrl}
                      onChange={(e) => setNewProject({ ...newProject, repoUrl: e.target.value })}
                      className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <Button variant="ghost" size="sm" type="button" onClick={() => setShowProjectModal(false)}>
                    ยกเลิก
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    บันทึกผลงาน
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
