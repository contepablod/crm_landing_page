import { Lead } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { formatDistanceToNow } from "date-fns";
import { Link } from "wouter";

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <Link href={`/lead/${lead.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-border/50 hover:border-border group">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-secondary/50 rounded-lg group-hover:bg-secondary transition-colors">
              <ChannelIcon channel={lead.channel} className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-foreground">{lead.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Added {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
              </p>
              {lead.value && (
                <p className="text-xs font-medium text-foreground mt-1">
                  Est. Value: ${lead.value.toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <StatusBadge status={lead.status} />
        </div>
      </Card>
    </Link>
  );
}
