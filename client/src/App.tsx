import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import LeadDetail from "@/pages/lead-detail";
import { LeadProvider } from "@/lib/store";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/lead/:id" component={LeadDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LeadProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LeadProvider>
    </QueryClientProvider>
  );
}

export default App;
