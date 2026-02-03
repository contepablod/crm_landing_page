import { useParams, useLocation } from "wouter";
import { useLeads } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Phone, Mail, Clock, DollarSign } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUSES, Status } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { format } from "date-fns";

export default function LeadDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { getLead, updateLead, addNote } = useLeads();
  const [noteContent, setNoteContent] = useState("");

  const lead = getLead(id || "");

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Lead not found</h2>
          <Button variant="link" onClick={() => setLocation("/")}>
            Go back home
          </Button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (value: string) => {
    updateLead(lead.id, { status: value as Status });
  };

  const handleAddNote = () => {
    if (!noteContent.trim()) return;
    addNote(lead.id, noteContent);
    setNoteContent("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">{lead.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={lead.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <ChannelIcon channel={lead.channel} className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{lead.name}</h2>
                  <p className="text-sm text-muted-foreground capitalize">Via {lead.channel}</p>
                </div>
              </div>
              <StatusBadge status={lead.status} className="px-3 py-1 text-sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lead.email && (
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{lead.email}</span>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{lead.phone}</span>
                </div>
              )}
              {lead.value && (
                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">${lead.value.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-md">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Added {format(new Date(lead.createdAt), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>

          {/* Activity/Notes Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Notes & Activity</h3>
            
            <div className="bg-card rounded-lg border p-4 shadow-sm">
              <div className="flex gap-2 mb-4">
                <Textarea 
                  placeholder="Add a note about this interaction..." 
                  className="min-h-[100px] resize-none"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddNote} disabled={!noteContent.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {lead.notes.length === 0 ? (
                <p className="text-center text-muted-foreground py-4 text-sm">No notes yet.</p>
              ) : (
                lead.notes.map((note) => (
                  <div key={note.id} className="bg-card rounded-lg border p-4 animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-2 text-right">
                      {format(new Date(note.createdAt), "MMM d, h:mm a")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Lead
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
