export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-sample-1',
    name: 'Tech Recruiter',
    email: 'recruiter@techfirm.example',
    message: 'สวัสดีครับ สนใจผลงานและโปรไฟล์ของคุณ อยากสอบถามความสนใจในตำแหน่ง Full-Stack Engineer ครับ',
    createdAt: new Date().toISOString(),
    read: false,
  },
];
