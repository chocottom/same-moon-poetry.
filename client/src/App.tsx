import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import PoetryCollection from "@/pages/PoetryCollection";
import ProseCollection from "@/pages/ProseCollection";
import ProseStory from "@/pages/ProseStory";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/poetry" component={PoetryCollection} />
      <Route path="/prose" component={ProseCollection} />
      <Route path="/prose/:id" component={ProseStory} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}
