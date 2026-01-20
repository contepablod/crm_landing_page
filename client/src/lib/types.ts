export type Channel = 'instagram' | 'tiktok' | 'linkedin' | 'whatsapp' | 'x' | 'reddit' | 'other';

export type Status = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  channel: Channel;
  status: Status;
  notes: Note[];
  value?: number;
  createdAt: string;
  lastContactedAt?: string;
}

export const CHANNELS: Channel[] = ['instagram', 'tiktok', 'linkedin', 'whatsapp', 'x', 'reddit', 'other'];
export const STATUSES: Status[] = ['new', 'contacted', 'qualified', 'won', 'lost'];
