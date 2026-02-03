import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import LeadDetail from "@/pages/lead-detail";
import LoginPage from "@/pages/login";
import { LeadProvider } from "@/lib/store";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { useLocation } from "wouter";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user && localStorage.getItem("lead-manager-user") === null) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  return user ? <Component /> : null;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/lead/:id">
        {() => <ProtectedRoute component={LeadDetail} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <LeadProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </LeadProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
