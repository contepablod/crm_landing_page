import React, { createContext, useContext, useState, useEffect } from "react";
import { Lead, Note, Status } from "./types";
import { getInitialLeads, saveLeads } from "./data";
import { useToast } from "@/hooks/use-toast";

interface LeadContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "notes">) => void;
  updateLead: (id: string, data: Partial<Lead>) => void;
  addNote: (leadId: string, content: string) => void;
  getLead: (id: string) => Lead | undefined;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setLeads(getInitialLeads());
  }, []);

  useEffect(() => {
    if (leads.length > 0) {
      saveLeads(leads);
    }
  }, [leads]);

  const addLead = (data: Omit<Lead, "id" | "createdAt" | "notes">) => {
    const newLead: Lead = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      notes: []
    };
    setLeads((prev) => [newLead, ...prev]);
    toast({ title: "Lead created", description: `${newLead.name} has been added.` });
  };

  const updateLead = (id: string, data: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...data } : lead))
    );
    toast({ title: "Lead updated", description: "Changes saved successfully." });
  };

  const addNote = (leadId: string, content: string) => {
    const note: Note = {
      id: Math.random().toString(36).substring(2, 9),
      content,
      createdAt: new Date().toISOString()
    };
    
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, notes: [note, ...lead.notes] } : lead
      )
    );
    toast({ title: "Note added" });
  };

  const getLead = (id: string) => leads.find((l) => l.id === id);

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, addNote, getLead }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
}
