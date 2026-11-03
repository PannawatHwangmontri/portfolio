export interface Certificate {
  id: string;
  title: {
    th: string;
    en: string;
  };
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  category?: string;
  order: number;
}

