'use client';

import React, { useEffect, useState, useMemo, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredAdmin, logoutAdmin, AdminUser } from '@/services/authService';
import {
  getProjects,
  createProject,
  deleteProject,
  Project,
  getAdminGithubRepos,
  toggleGithubRepoVisibility,
  GitHubRepoAdminItem,
} from '@/services/projectService';
import { getExperiences, createExperience, deleteExperience, ExperienceItem } from '@/services/experienceService';
import {
  getCertificates,
  createCertificate,
  deleteCertificate,
  uploadCertificateImage,
  Certificate,
} from '@/services/certificateService';
import { getContactMessages, deleteContactMessage, ContactMessage } from '@/services/contactService';
import {
  getSiteContent,
  updateAboutContent,
  updateSkillsContent,
  updateContactInfoContent,
  AboutContent,
  SkillsContent,
  ContactInfoContent,
  fallbackSiteContent,
} from '@/services/profileService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Briefcase,
  FolderGit2,
  LogOut,
  Mail,
  Plus,
  Trash2,
  ExternalLink,
  Award,
  CheckCircle,
  Eye,
  EyeOff,
  GitFork,
  Star,
  Upload,
  X,
  User,
  Layers,
  PhoneCall,
  Save,
} from 'lucide-react';
import Link from 'next/link';

type Tab =
  | 'projects'
  | 'github'
  | 'experience'
  | 'certificates'
  | 'messages'
  | 'about'
  | 'skills'
  | 'contact_info';

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
  const [githubRepos, setGithubRepos] = useState<GitHubRepoAdminItem[]>([]);
  const [togglingRepoId, setTogglingRepoId] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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

  const [showExpModal, setShowExpModal] = useState(false);
  const [newExp, setNewExp] = useState({
    type: 'work' as 'work' | 'education',
    thTitle: '',
    enTitle: '',
    thOrg: '',
    enOrg: '',
    period: '',
    thDesc: '',
    enDesc: '',
    skills: '',
  });

  const [showCertModal, setShowCertModal] = useState(false);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certPreview, setCertPreview] = useState<string>('');
  const [isUploadingCert, setIsUploadingCert] = useState(false);
  const [newCert, setNewCert] = useState({
    thTitle: '',
    enTitle: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    category: 'Full-Stack',
  });

  // Profile / Site Content states
  const [aboutForm, setAboutForm] = useState<AboutContent>(fallbackSiteContent.about);
  const [skillsForm, setSkillsForm] = useState<SkillsContent>(fallbackSiteContent.skills);
  const [contactInfoForm, setContactInfoForm] = useState<ContactInfoContent>(fallbackSiteContent.contactInfo);
  const [savingAbout, setSavingAbout] = useState(false);
  const [savingSkills, setSavingSkills] = useState(false);
  const [savingContactInfo, setSavingContactInfo] = useState(false);
  const [newSkillTag, setNewSkillTag] = useState<Record<string, string>>({});

  useEffect(() => {
    const admin = getStoredAdmin();
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (!admin || !token) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [p, exp, cert, msg, gh, sc] = await Promise.all([
          getProjects(),
          getExperiences(),
          getCertificates(),
          getContactMessages().catch(() => []),
          getAdminGithubRepos().catch(() => []),
          getSiteContent().catch(() => null),
        ]);
        setProjects(p);
        setExperiences(exp);
        setCertificates(cert);
        setMessages(msg);
        setGithubRepos(gh);
        if (sc) {
          if (sc.about) setAboutForm(sc.about);
          if (sc.skills) setSkillsForm(sc.skills);
          if (sc.contactInfo) setContactInfoForm(sc.contactInfo);
        }
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

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAbout(true);
    try {
      await updateAboutContent(aboutForm);
      notify('บันทึกข้อมูล "เกี่ยวกับฉัน" เรียบร้อยแล้ว');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      notify(`บันทึกไม่สำเร็จ: ${msg}`);
    } finally {
      setSavingAbout(false);
    }
  };

  const handleSaveSkills = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSkills(true);
    try {
      await updateSkillsContent(skillsForm);
      notify('บันทึกข้อมูล "ทักษะและความเชี่ยวชาญ" เรียบร้อยแล้ว');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      notify(`บันทึกไม่สำเร็จ: ${msg}`);
    } finally {
      setSavingSkills(false);
    }
  };

  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingContactInfo(true);
    try {
      await updateContactInfoContent(contactInfoForm);
      notify('บันทึกข้อมูล "ติดต่อฉัน" เรียบร้อยแล้ว');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
      notify(`บันทึกไม่สำเร็จ: ${msg}`);
    } finally {
      setSavingContactInfo(false);
    }
  };

  const handleAddSkillGroup = () => {
    const newId = `group-${Date.now()}`;
    setSkillsForm((prev) => ({
      ...prev,
      groups: [
        ...prev.groups,
        {
          id: newId,
          name: { th: 'หมวดหมู่ใหม่', en: 'New Category' },
          skills: [],
        },
      ],
    }));
  };

  const handleRemoveSkillGroup = (groupId: string) => {
    if (typeof window !== 'undefined' && !window.confirm('คุณต้องการลบหมวดหมู่นี้ใช่หรือไม่?')) {
      return;
    }
    setSkillsForm((prev) => ({
      ...prev,
      groups: prev.groups.filter((g) => g.id !== groupId),
    }));
  };

  const handleAddSkillToGroup = (groupId: string) => {
    const tag = (newSkillTag[groupId] || '').trim();
    if (!tag) return;
    setSkillsForm((prev) => ({
      ...prev,
      groups: prev.groups.map((g) => {
        if (g.id === groupId) {
          if (g.skills.includes(tag)) return g;
          return { ...g, skills: [...g.skills, tag] };
        }
        return g;
      }),
    }));
    setNewSkillTag((prev) => ({ ...prev, [groupId]: '' }));
  };

  const handleRemoveSkillFromGroup = (groupId: string, tagToRemove: string) => {
    setSkillsForm((prev) => ({
      ...prev,
      groups: prev.groups.map((g) => {
        if (g.id === groupId) {
          return { ...g, skills: g.skills.filter((s) => s !== tagToRemove) };
        }
        return g;
      }),
    }));
  };

  const handleGroupTitleChange = (groupId: string, lang: 'th' | 'en', val: string) => {
    setSkillsForm((prev) => ({
      ...prev,
      groups: prev.groups.map((g) => {
        if (g.id === groupId) {
          return { ...g, name: { ...g.name, [lang]: val } };
        }
        return g;
      }),
    }));
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

  // Experience Actions
  const handleCreateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<ExperienceItem> = {
        id: `exp-${Date.now()}`,
        type: newExp.type,
        title: { th: newExp.thTitle, en: newExp.enTitle },
        organization: { th: newExp.thOrg, en: newExp.enOrg },
        period: newExp.period,
        description: { th: newExp.thDesc, en: newExp.enDesc },
        skills: newExp.skills ? newExp.skills.split(',').map((s) => s.trim()) : [],
      };
      const created = await createExperience(payload).catch(() => payload as ExperienceItem);
      setExperiences([created, ...experiences]);
      setShowExpModal(false);
      setNewExp({
        type: 'work',
        thTitle: '',
        enTitle: '',
        thOrg: '',
        enOrg: '',
        period: '',
        thDesc: '',
        enDesc: '',
        skills: '',
      });
      notify('เพิ่มประวัติเรียบร้อยแล้ว!');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error creating experience');
    }
  };

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

  // Certificate Actions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('ขนาดไฟล์ภาพต้องไม่เกิน 10MB');
        return;
      }
      setCertFile(file);
      const url = URL.createObjectURL(file);
      setCertPreview(url);
    }
  };

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadingCert(true);
    try {
      let finalCredentialUrl = newCert.credentialUrl;
      if (certFile) {
        finalCredentialUrl = await uploadCertificateImage(certFile);
      }
      const payload: Partial<Certificate> = {
        id: `cert-${Date.now()}`,
        title: { th: newCert.thTitle, en: newCert.enTitle },
        issuer: newCert.issuer,
        issueDate: newCert.issueDate,
        credentialUrl: finalCredentialUrl,
        category: newCert.category,
        order: certificates.length + 1,
      };
      const created = await createCertificate(payload).catch(() => payload as Certificate);
      setCertificates([created, ...certificates]);
      setShowCertModal(false);
      setCertFile(null);
      setCertPreview('');
      setNewCert({
        thTitle: '',
        enTitle: '',
        issuer: '',
        issueDate: '',
        credentialUrl: '',
        category: 'Full-Stack',
      });
      notify('เพิ่มใบรับรองเรียบร้อยแล้ว!');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error creating certificate');
    } finally {
      setIsUploadingCert(false);
    }
  };

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

  // GitHub Repo Actions
  const handleToggleGithubVisibility = async (repo: GitHubRepoAdminItem) => {
    const nextState = !repo.isVisible;
    setTogglingRepoId(String(repo.repoId));
    try {
      await toggleGithubRepoVisibility(repo.repoId, repo.name, nextState);
      setGithubRepos((prev) =>
        prev.map((r) => (r.repoId === repo.repoId ? { ...r, isVisible: nextState } : r))
      );
      notify(`ตั้งค่า "${repo.name}" เป็น ${nextState ? 'แสดงบนหน้าเว็บแล้ว 👁️' : 'ซ่อนจากหน้าเว็บแล้ว 🚫'}`);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error updating repo visibility');
    } finally {
      setTogglingRepoId(null);
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
              <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">GitHub Repos</p>
                <p className="text-xl font-bold text-foreground">
                  {githubRepos.filter((r) => r.isVisible).length}
                  <span className="text-xs font-normal text-muted ml-1">/ {githubRepos.length}</span>
                </p>
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
            onClick={() => setActiveTab('github')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'github'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>GitHub Repos ({githubRepos.filter((r) => r.isVisible).length}/{githubRepos.length})</span>
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

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'about'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <User className="w-4 h-4" />
            <span>เกี่ยวกับฉัน (About)</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'skills'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>ทักษะ (Skills)</span>
          </button>

          <button
            onClick={() => setActiveTab('contact_info')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              activeTab === 'contact_info'
                ? 'bg-surface border-t-2 border-t-accent text-accent font-bold border-x border-border-subtle'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>ข้อมูลติดต่อ (Contact Info)</span>
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

        {/* Tab 2: GitHub Repos */}
        {activeTab === 'github' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <span>GitHub Repositories ทั้งหมด</span>
                  <Badge variant="neutral" className="text-xs font-mono">
                    เปิดโชว์ {githubRepos.filter((r) => r.isVisible).length} จาก {githubRepos.length} รายการ
                  </Badge>
                </h2>
                <p className="text-xs text-muted mt-1">
                  เลือกเปิดหรือปิดการแสดงผลแต่ละ Repository บนหน้า Portfolio สาธารณะ (ค่าเริ่มต้นจะถูกซ่อนไว้)
                </p>
              </div>
            </div>

            {githubRepos.length === 0 ? (
              <div className="p-8 rounded-xl border border-border-subtle bg-surface text-center text-muted text-xs">
                กำลังดึงข้อมูล Repositories จาก GitHub หรือยังไม่พบ Repository สาธารณะ
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {githubRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className={`p-4 rounded-xl border transition-all bg-surface flex flex-col justify-between gap-4 ${
                      repo.isVisible
                        ? 'border-accent/40 shadow-xs'
                        : 'border-border-subtle opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <a
                            href={repo.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-sm text-foreground hover:text-accent transition-colors truncate flex items-center gap-1.5"
                          >
                            <span>{repo.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60" />
                          </a>
                          {repo.fork && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-subtle border border-border-subtle text-muted shrink-0">
                              Fork
                            </span>
                          )}
                        </div>

                        {repo.isVisible ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
                            <Eye className="w-3 h-3" />
                            <span>กำลังโชว์</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted bg-surface-subtle px-2 py-0.5 rounded-full border border-border-subtle shrink-0">
                            <EyeOff className="w-3 h-3" />
                            <span>ซ่อนอยู่</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted mt-2 line-clamp-2">
                        {repo.description || 'ไม่มีคำอธิบายสำหรับโปรเจกต์นี้'}
                      </p>

                      <div className="flex items-center gap-3 mt-3 text-[11px] text-muted">
                        <span className="font-medium text-foreground">{repo.language}</span>
                        {repo.stars > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>{repo.stars}</span>
                          </span>
                        )}
                        {repo.forks > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            <span>{repo.forks}</span>
                          </span>
                        )}
                        <span className="ml-auto text-[10px] font-mono">
                          อัปเดต: {new Date(repo.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-end">
                      <Button
                        size="sm"
                        variant={repo.isVisible ? 'outline' : 'primary'}
                        disabled={togglingRepoId === String(repo.repoId)}
                        onClick={() => handleToggleGithubVisibility(repo)}
                        className={`text-xs gap-1.5 focus-visible:ring-2 focus-visible:ring-accent ${
                          repo.isVisible ? 'text-muted hover:text-foreground' : ''
                        }`}
                      >
                        {togglingRepoId === String(repo.repoId) ? (
                          <span>กำลังบันทึก...</span>
                        ) : repo.isVisible ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>คลิกเพื่อซ่อน</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>คลิกเพื่อเปิดโชว์</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Experience */}
        {activeTab === 'experience' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">ประวัติทำงานและการศึกษา</h2>
              <Button size="sm" variant="primary" onClick={() => setShowExpModal(true)} className="gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-accent">
                <Plus className="w-4 h-4" />
                <span>เพิ่มประวัติใหม่</span>
              </Button>
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

        {/* Tab 4: Certificates */}
        {activeTab === 'certificates' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">เกียรติบัตรและใบรับรอง</h2>
              <Button size="sm" variant="primary" onClick={() => setShowCertModal(true)} className="gap-1.5 text-xs focus-visible:ring-2 focus-visible:ring-accent">
                <Plus className="w-4 h-4" />
                <span>เพิ่มใบรับรองใหม่</span>
              </Button>
            </div>
            <div className="space-y-3">
              {certificates.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border border-border-subtle bg-surface flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {c.credentialUrl ? (
                      <img
                        src={c.credentialUrl}
                        alt={c.title.th}
                        className="w-12 h-12 object-cover rounded-md border border-border-subtle shrink-0 bg-surface-subtle"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-md border border-border-subtle bg-surface-subtle flex items-center justify-center shrink-0 text-muted">
                        <Award className="w-6 h-6" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="font-bold text-foreground truncate block">{c.title.th}</span>
                      <p className="text-xs text-muted mt-0.5">{c.issuer} • {c.issueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {c.credentialUrl && (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded text-muted hover:text-accent hover:bg-surface-subtle transition-colors"
                        title="ดูรูปภาพ/ลิงก์"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteCertificate(c.id)}
                      className="p-1.5 rounded text-rose-500 hover:bg-rose-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                      title="ลบใบรับรอง"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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

        {/* Tab 6: About Content */}
        {activeTab === 'about' && (
          <div className="bg-surface rounded-xl border border-border-subtle p-6 max-w-4xl shadow-none">
            <div className="mb-6 pb-4 border-b border-border-subtle flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground">แก้ไขข้อมูล &ldquo;เกี่ยวกับฉัน&rdquo; (About Me)</h2>
                <p className="text-xs text-muted mt-1">
                  ปรับแต่งหัวข้อ คำโปรย ข้อความแนะนำตัว และสถิติที่แสดงบนหน้าแรกของเว็บไซต์
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveAbout} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1.5 text-foreground">คำนำย่อย / Subtitle (ภาษาไทย)</label>
                  <input
                    type="text"
                    required
                    value={aboutForm.subtitle.th}
                    onChange={(e) =>
                      setAboutForm({ ...aboutForm, subtitle: { ...aboutForm.subtitle, th: e.target.value } })
                    }
                    className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1.5 text-foreground">Subtitle (English)</label>
                  <input
                    type="text"
                    required
                    value={aboutForm.subtitle.en}
                    onChange={(e) =>
                      setAboutForm({ ...aboutForm, subtitle: { ...aboutForm.subtitle, en: e.target.value } })
                    }
                    className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1.5 text-foreground">หัวข้อหลัก / Title (ภาษาไทย)</label>
                  <input
                    type="text"
                    required
                    value={aboutForm.title.th}
                    onChange={(e) =>
                      setAboutForm({ ...aboutForm, title: { ...aboutForm.title, th: e.target.value } })
                    }
                    className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1.5 text-foreground">Title (English)</label>
                  <input
                    type="text"
                    required
                    value={aboutForm.title.en}
                    onChange={(e) =>
                      setAboutForm({ ...aboutForm, title: { ...aboutForm.title, en: e.target.value } })
                    }
                    className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1.5 text-foreground">ข้อความแนะนำตัว / Bio (ภาษาไทย)</label>
                <textarea
                  rows={4}
                  required
                  value={aboutForm.bio.th}
                  onChange={(e) =>
                    setAboutForm({ ...aboutForm, bio: { ...aboutForm.bio, th: e.target.value } })
                  }
                  className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1.5 text-foreground">Bio (English)</label>
                <textarea
                  rows={4}
                  required
                  value={aboutForm.bio.en}
                  onChange={(e) =>
                    setAboutForm({ ...aboutForm, bio: { ...aboutForm.bio, en: e.target.value } })
                  }
                  className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              {/* Architectural Metrics Ledger Inputs */}
              <div className="pt-4 border-t border-border-subtle">
                <h3 className="font-bold text-foreground text-sm mb-3">สถิติผลงาน (Architectural Metrics Ledger)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Metric 1 */}
                  <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle/40 space-y-3">
                    <div>
                      <label className="font-semibold block mb-1 text-foreground">ตัวเลขสถิติ 1 (เช่น 03+)</label>
                      <input
                        type="text"
                        required
                        value={aboutForm.statYears}
                        onChange={(e) => setAboutForm({ ...aboutForm, statYears: e.target.value })}
                        className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1 text-foreground">ป้ายกำกับ (ภาษาไทย)</label>
                      <input
                        type="text"
                        required
                        value={aboutForm.statYearsLabel.th}
                        onChange={(e) =>
                          setAboutForm({
                            ...aboutForm,
                            statYearsLabel: { ...aboutForm.statYearsLabel, th: e.target.value },
                          })
                        }
                        className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1 text-foreground">Label (English)</label>
                      <input
                        type="text"
                        required
                        value={aboutForm.statYearsLabel.en}
                        onChange={(e) =>
                          setAboutForm({
                            ...aboutForm,
                            statYearsLabel: { ...aboutForm.statYearsLabel, en: e.target.value },
                          })
                        }
                        className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground"
                      />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle/40 space-y-3">
                    <div>
                      <label className="font-semibold block mb-1 text-foreground">ตัวเลขสถิติ 2 (เช่น 15+)</label>
                      <input
                        type="text"
                        required
                        value={aboutForm.statProjects}
                        onChange={(e) => setAboutForm({ ...aboutForm, statProjects: e.target.value })}
                        className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1 text-foreground">ป้ายกำกับ (ภาษาไทย)</label>
                      <input
                        type="text"
                        required
                        value={aboutForm.statProjectsLabel.th}
                        onChange={(e) =>
                          setAboutForm({
                            ...aboutForm,
                            statProjectsLabel: { ...aboutForm.statProjectsLabel, th: e.target.value },
                          })
                        }
                        className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1 text-foreground">Label (English)</label>
                      <input
                        type="text"
                        required
                        value={aboutForm.statProjectsLabel.en}
                        onChange={(e) =>
                          setAboutForm({
                            ...aboutForm,
                            statProjectsLabel: { ...aboutForm.statProjectsLabel, en: e.target.value },
                          })
                        }
                        className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex justify-end">
                <Button type="submit" variant="primary" size="md" disabled={savingAbout} className="gap-2">
                  <Save className="w-4 h-4" />
                  <span>{savingAbout ? 'กำลังบันทึก...' : 'บันทึกข้อมูลเกี่ยวกับฉัน'}</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 7: Skills Content */}
        {activeTab === 'skills' && (
          <div className="bg-surface rounded-xl border border-border-subtle p-6 max-w-5xl shadow-none">
            <div className="mb-6 pb-4 border-b border-border-subtle flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground">แก้ไขข้อมูล &ldquo;ทักษะและความเชี่ยวชาญ&rdquo; (Skills & Expertise)</h2>
                <p className="text-xs text-muted mt-1">
                  แก้ไขชื่อหมวดหมู่ และเพิ่ม/ลบแท็กเทคโนโลยีในแต่ละหมวดหมู่
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSkills} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1.5 text-foreground">หัวข้อส่วนทักษะ / Title (ภาษาไทย)</label>
                  <input
                    type="text"
                    required
                    value={skillsForm.title.th}
                    onChange={(e) =>
                      setSkillsForm({ ...skillsForm, title: { ...skillsForm.title, th: e.target.value } })
                    }
                    className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1.5 text-foreground">Section Title (English)</label>
                  <input
                    type="text"
                    required
                    value={skillsForm.title.en}
                    onChange={(e) =>
                      setSkillsForm({ ...skillsForm, title: { ...skillsForm.title, en: e.target.value } })
                    }
                    className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1.5 text-foreground">คำนำย่อย / Subtitle (ภาษาไทย)</label>
                  <input
                    type="text"
                    required
                    value={skillsForm.subtitle.th}
                    onChange={(e) =>
                      setSkillsForm({ ...skillsForm, subtitle: { ...skillsForm.subtitle, th: e.target.value } })
                    }
                    className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1.5 text-foreground">Subtitle (English)</label>
                  <input
                    type="text"
                    required
                    value={skillsForm.subtitle.en}
                    onChange={(e) =>
                      setSkillsForm({ ...skillsForm, subtitle: { ...skillsForm.subtitle, en: e.target.value } })
                    }
                    className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground"
                  />
                </div>
              </div>

              {/* Skill Categories */}
              <div className="space-y-6 pt-4 border-t border-border-subtle">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">หมวดหมู่ทักษะ (Skill Groups)</h3>
                    <p className="text-[11px] text-muted">สามารถเพิ่มหมวดหมู่ใหม่ หรือลบหมวดหมู่ที่ไม่ต้องการได้</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSkillGroup}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle hover:bg-surface-subtle text-foreground text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เพิ่มหมวดหมู่ใหม่</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {skillsForm.groups.map((group) => (
                    <div
                      key={group.id}
                      className="p-5 rounded-xl border border-border-subtle bg-surface-subtle/30 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-muted font-bold">
                            หมวด: {group.id}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-muted">{group.skills.length} ทักษะ</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkillGroup(group.id)}
                              className="text-muted hover:text-rose-500 p-1 rounded transition-colors cursor-pointer"
                              title="ลบหมวดหมู่นี้"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-semibold text-muted block mb-1">ชื่อหมวด (TH)</label>
                            <input
                              type="text"
                              value={group.name.th}
                              onChange={(e) => handleGroupTitleChange(group.id, 'th', e.target.value)}
                              className="w-full p-2 text-xs border border-border-subtle rounded-md bg-surface text-foreground"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-muted block mb-1">Name (EN)</label>
                            <input
                              type="text"
                              value={group.name.en}
                              onChange={(e) => handleGroupTitleChange(group.id, 'en', e.target.value)}
                              className="w-full p-2 text-xs border border-border-subtle rounded-md bg-surface text-foreground"
                            />
                          </div>
                        </div>

                        {/* Existing Skill Tags */}
                        <div>
                          <label className="text-[11px] font-semibold text-muted block mb-1.5">รายการทักษะปัจจุบัน</label>
                          <div className="flex flex-wrap gap-1.5 min-h-[48px] p-2 rounded-lg border border-border-subtle bg-surface">
                            {group.skills.length === 0 ? (
                              <span className="text-muted text-[11px] italic p-1">ยังไม่มีทักษะในหมวดนี้</span>
                            ) : (
                              group.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-subtle text-foreground border border-border-subtle text-xs font-mono"
                                >
                                  <span>{skill}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSkillFromGroup(group.id, skill)}
                                    className="text-muted hover:text-rose-500 transition-colors"
                                    title={`ลบ ${skill}`}
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Add new skill input */}
                      <div className="pt-2 border-t border-border-subtle/60 flex items-center gap-2">
                        <input
                          type="text"
                          value={newSkillTag[group.id] || ''}
                          onChange={(e) => setNewSkillTag({ ...newSkillTag, [group.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkillToGroup(group.id);
                            }
                          }}
                          placeholder="พิมพ์ชื่อทักษะ เช่น Vue.js, Rust..."
                          className="flex-1 p-2 text-xs border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSkillToGroup(group.id)}
                          className="px-3 py-2 rounded-md bg-[#000000] text-white hover:bg-[#222222] transition-colors text-xs font-semibold cursor-pointer shrink-0"
                        >
                          + เพิ่ม
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex justify-end">
                <Button type="submit" variant="primary" size="md" disabled={savingSkills} className="gap-2">
                  <Save className="w-4 h-4" />
                  <span>{savingSkills ? 'กำลังบันทึก...' : 'บันทึกข้อมูลทักษะทั้งหมด'}</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 8: Contact Info Content */}
        {activeTab === 'contact_info' && (
          <div className="bg-surface rounded-xl border border-border-subtle p-6 max-w-3xl shadow-none">
            <div className="mb-6 pb-4 border-b border-border-subtle flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground">แก้ไขข้อมูล &ldquo;ติดต่อฉัน&rdquo; (Contact Info)</h2>
                <p className="text-xs text-muted mt-1">
                  ปรับแก้อีเมลที่แสดงผลสำหรับการติดต่อโดยตรง และข้อความแจ้งระยะเวลาการตอบกลับ
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveContactInfo} className="space-y-6 text-xs">
              <div>
                <label className="font-semibold block mb-1.5 text-foreground">อีเมลสำหรับติดต่อโดยตรง (Direct Email)</label>
                <input
                  type="email"
                  required
                  value={contactInfoForm.email}
                  onChange={(e) => setContactInfoForm({ ...contactInfoForm, email: e.target.value })}
                  className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  placeholder="contact@example.com"
                />
                <p className="text-[11px] text-muted mt-1">
                  อีเมลนี้จะแสดงในกล่องคัดลอกอีเมลบนหน้าเว็บ และใช้สำหรับปุ่มส่งอีเมล
                </p>
              </div>

              <div>
                <label className="font-semibold block mb-1.5 text-foreground">
                  ข้อความแจ้งระยะเวลาการตอบกลับ (ภาษาไทย)
                </label>
                <textarea
                  rows={3}
                  required
                  value={contactInfoForm.responseNote.th}
                  onChange={(e) =>
                    setContactInfoForm({
                      ...contactInfoForm,
                      responseNote: { ...contactInfoForm.responseNote, th: e.target.value },
                    })
                  }
                  className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1.5 text-foreground">
                  Response Time Note (English)
                </label>
                <textarea
                  rows={3}
                  required
                  value={contactInfoForm.responseNote.en}
                  onChange={(e) =>
                    setContactInfoForm({
                      ...contactInfoForm,
                      responseNote: { ...contactInfoForm.responseNote, en: e.target.value },
                    })
                  }
                  className="w-full p-2.5 border border-border-subtle rounded-lg bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-border-subtle flex justify-end">
                <Button type="submit" variant="primary" size="md" disabled={savingContactInfo} className="gap-2">
                  <Save className="w-4 h-4" />
                  <span>{savingContactInfo ? 'กำลังบันทึก...' : 'บันทึกข้อมูลติดต่อ'}</span>
                </Button>
              </div>
            </form>
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

        {/* Experience Create Modal */}
        {showExpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg p-6 bg-surface border border-border-subtle rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-base font-bold text-foreground mb-4">
                เพิ่มประวัติทำงาน/ศึกษา (Add Experience)
              </h3>
              <form onSubmit={handleCreateExperience} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1 text-foreground">ประเภท</label>
                  <select
                    value={newExp.type}
                    onChange={(e) => setNewExp({ ...newExp, type: e.target.value as 'work' | 'education' })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <option value="work">ประสบการณ์ทำงาน (Work)</option>
                    <option value="education">ประวัติการศึกษา (Education)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">ตำแหน่ง / สาขาวิชา (ไทย)</label>
                    <input
                      type="text"
                      required
                      value={newExp.thTitle}
                      onChange={(e) => setNewExp({ ...newExp, thTitle: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="เช่น Full-Stack Developer"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">ตำแหน่ง / สาขาวิชา (อังกฤษ)</label>
                    <input
                      type="text"
                      required
                      value={newExp.enTitle}
                      onChange={(e) => setNewExp({ ...newExp, enTitle: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="e.g. Full-Stack Developer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">บริษัท / สถาบัน (ไทย)</label>
                    <input
                      type="text"
                      required
                      value={newExp.thOrg}
                      onChange={(e) => setNewExp({ ...newExp, thOrg: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="เช่น บจก. เทคโนโลยีอินโนเวชั่น"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">บริษัท / สถาบัน (อังกฤษ)</label>
                    <input
                      type="text"
                      required
                      value={newExp.enOrg}
                      onChange={(e) => setNewExp({ ...newExp, enOrg: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="e.g. Tech Innovation Co., Ltd."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">ช่วงเวลา (Period)</label>
                    <input
                      type="text"
                      required
                      value={newExp.period}
                      onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="2024 - 2025"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">ทักษะ / Skills (คั่นด้วยจุลภาค)</label>
                    <input
                      type="text"
                      value={newExp.skills}
                      onChange={(e) => setNewExp({ ...newExp, skills: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="Next.js, NestJS, Docker"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-foreground">รายละเอียด (ไทย)</label>
                  <textarea
                    rows={2}
                    required
                    value={newExp.thDesc}
                    onChange={(e) => setNewExp({ ...newExp, thDesc: e.target.value })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-foreground">รายละเอียด (อังกฤษ)</label>
                  <textarea
                    rows={2}
                    required
                    value={newExp.enDesc}
                    onChange={(e) => setNewExp({ ...newExp, enDesc: e.target.value })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <Button variant="ghost" size="sm" type="button" onClick={() => setShowExpModal(false)} className="focus-visible:ring-2 focus-visible:ring-accent">
                    ยกเลิก
                  </Button>
                  <Button variant="primary" size="sm" type="submit" className="focus-visible:ring-2 focus-visible:ring-accent">
                    บันทึกประวัติ
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Certificate Create Modal */}
        {showCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg p-6 bg-surface border border-border-subtle rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-base font-bold text-foreground mb-4">
                เพิ่มใบรับรองใหม่ (Add Certificate)
              </h3>
              <form onSubmit={handleCreateCertificate} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1 text-foreground">ชื่อใบรับรอง (ไทย)</label>
                  <input
                    type="text"
                    required
                    value={newCert.thTitle}
                    onChange={(e) => setNewCert({ ...newCert, thTitle: e.target.value })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    placeholder="เช่น ใบรับรอง Full-Stack Developer"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-foreground">ชื่อใบรับรอง (อังกฤษ)</label>
                  <input
                    type="text"
                    required
                    value={newCert.enTitle}
                    onChange={(e) => setNewCert({ ...newCert, enTitle: e.target.value })}
                    className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    placeholder="e.g. Full-Stack Web Development Certificate"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">ผู้ออกใบรับรอง (Issuer)</label>
                    <input
                      type="text"
                      required
                      value={newCert.issuer}
                      onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="Coursera / Meta / Google"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">ปีที่ได้รับ (Issue Date)</label>
                    <input
                      type="text"
                      required
                      value={newCert.issueDate}
                      onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">หมวดหมู่ (Category)</label>
                    <input
                      type="text"
                      value={newCert.category}
                      onChange={(e) => setNewCert({ ...newCert, category: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="Full-Stack / Backend / Cloud"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-foreground">หรือลิงก์รูปภาพ/URL ตรวจสอบ (ถ้ามี)</label>
                    <input
                      type="url"
                      value={newCert.credentialUrl}
                      onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
                      className="w-full p-2 border border-border-subtle rounded-md bg-surface text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                      placeholder="https://... หรืออัปโหลดไฟล์ด้านล่าง"
                    />
                  </div>
                </div>

                {/* Upload Certificate Image */}
                <div>
                  <label className="font-semibold block mb-1 text-foreground">
                    อัปโหลดรูปภาพใบรับรอง (Certificate Image)
                  </label>
                  {certPreview ? (
                    <div className="relative rounded-lg border border-border-subtle p-2.5 bg-surface-subtle flex items-center gap-3">
                      <img
                        src={certPreview}
                        alt="Preview"
                        className="w-20 h-16 object-cover rounded border border-border-subtle shrink-0 bg-surface"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{certFile?.name || 'รูปภาพเกียรติบัตร'}</p>
                        <p className="text-[11px] text-muted">พร้อมสำหรับอัปโหลดเข้า Supabase Storage</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCertFile(null);
                          setCertPreview('');
                        }}
                        className="p-1.5 rounded-full hover:bg-rose-500/10 text-rose-500 transition-colors"
                        title="ลบรูป"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-border-subtle hover:border-accent rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-surface-subtle/40 hover:bg-surface-subtle">
                      <Upload className="w-6 h-6 text-muted mb-1" />
                      <span className="text-xs font-semibold text-foreground">คลิกเพื่อเลือกไฟล์รูปภาพเกียรติบัตร</span>
                      <span className="text-[11px] text-muted mt-0.5">PNG, JPG, WebP (ขนาดสูงสุด 10MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setShowCertModal(false);
                      setCertFile(null);
                      setCertPreview('');
                    }}
                    className="focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    disabled={isUploadingCert}
                    className="focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {isUploadingCert ? 'กำลังอัปโหลด...' : 'บันทึกใบรับรอง'}
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
