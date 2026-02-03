import { Lead, Note } from "./types";

const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex.r@example.com",
    channel: "instagram",
    status: "new",
    value: 1200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    notes: []
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@tech.co",
    channel: "linkedin",
    status: "qualified",
    value: 5000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    lastContactedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    notes: [
      {
        id: "n1",
        content: "Interested in the enterprise plan. Needs a demo next week.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
      }
    ]
  },
  {
    id: "3",
    name: "Mike Ross",
    phone: "+1 555 0192",
    channel: "whatsapp",
    status: "contacted",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    notes: []
  },
  {
    id: "4",
    name: "Design Co Studio",
    channel: "tiktok",
    status: "lost",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    notes: [
      {
        id: "n2",
        content: "Budget too low for current pricing.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
      }
    ]
  },
  {
    id: "5",
    name: "James Holden",
    channel: "x",
    status: "won",
    value: 3500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    notes: []
  }
];

export function getInitialLeads(): Lead[] {
  const stored = localStorage.getItem("leads-data");
  if (stored) {
    return JSON.parse(stored);
  }
  return MOCK_LEADS;
}

export function saveLeads(leads: Lead[]) {
  localStorage.setItem("leads-data", JSON.stringify(leads));
}
