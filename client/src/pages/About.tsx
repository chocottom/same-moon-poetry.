import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Send } from "lucide-react";

const PHILOSOPHY_CARDS = [
  {
    title: "Authentic Connection",
    preview: "I believe in authentic connection",
    full: "True connection isn't about agreeing on everything—it's about being fully present with another person, listening deeply, and allowing yourself to be truly seen. It's rare, precious, and worth protecting.",
    relatedPoem: "When we first talked, really talked..."
  },
  {
    title: "Growth & Discipline",
    preview: "Growth requires presence and discipline",
    full: "Growth doesn't happen by accident. It requires showing up consistently, even when you don't feel like it. It demands discipline—not as punishment, but as dedication to becoming who you're meant to be.",
    relatedPoem: "The hard you choose shapes you..."
  },
  {
    title: "Time as Teacher",
    preview: "Time is the ultimate teacher",
    full: "We're all wrestling with time—trying to slow it down, speed it up, or make the most of it. But time teaches us patience, perspective, and the value of this present moment. It's the one thing we can't get back.",
    relatedPoem: "Seconds slip like sand..."
  },
  {
    title: "Universal Connection",
    preview: "We're all watching the same moon",
    full: "No matter where we are, what we believe, or who we've become—we're all under the same sky, watching the same moon. That shared experience connects us in ways we often forget. We're more alike than different.",
    relatedPoem: "At least we are watching the same moon"
  }
];

export default function About() {
  const { toast } = useToast();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    whatBroughtYou: "",
    resonatedPoem: "",
    message: "",
    email: "",
    name: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({
        whatBroughtYou: "",
        resonatedPoem: "",
        message: "",
        email: "",
        name: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-2xl font-bold hover:text-primary transition-colors">
            Same Moon Poetry
          </a>
          <nav className="flex items-center gap-6">
            <a href="/poetry" className="text-sm hover:text-primary transition-colors">
              Poetry
            </a>
            <a href="/prose" className="text-sm hover:text-primary transition-colors">
              Prose
            </a>
            <a href="/about" className="text-sm font-medium text-primary">
              About
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Amen Allah Jebali
          </h1>
          <p className="text-2xl text-muted-foreground font-display italic mb-8">
            Poet, Writer, and Seeker of Truth
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Through poetry and prose, I explore the intersections of spiritual growth, 
            human connection, and the universal experiences that bind us all together.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Timeline Section */}
        <section className="mb-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Creative Journey
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {[
                {
                  year: "Early Years",
                  title: "Finding My Voice",
                  description: "Began writing as a way to process complex emotions and spiritual questions. Poetry became a tool for self-discovery."
                },
                {
                  year: "Growth",
                  title: "Exploring Themes",
                  description: "Developed distinct themes around spiritual depth, authentic connection, time, and personal growth. Each poem became a meditation."
                },
                {
                  year: "Present",
                  title: "Sharing the Journey",
                  description: "Now sharing these reflections to connect with others on similar paths. We're all watching the same moon."
                }
              ].map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1">
                    <Card className={`p-6 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-sm font-medium text-primary">{milestone.year}</span>
                      <h3 className="font-display text-xl font-semibold mt-2 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Cards */}
        <section className="mb-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Core Beliefs
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {PHILOSOPHY_CARDS.map((card, index) => (
              <Card
                key={index}
                className={`p-6 cursor-pointer transition-all duration-300 hover-elevate ${
                  selectedCard === index ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCard(selectedCard === index ? null : index)}
                data-testid={`card-philosophy-${index}`}
              >
                <h3 className="font-display text-xl font-semibold mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {selectedCard === index ? card.full : card.preview}
                </p>
                {selectedCard === index && (
                  <p className="font-display italic text-sm text-primary">
                    Related: "{card.relatedPoem}"
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Let's Connect
              </h2>
              <p className="text-muted-foreground">
                I'd love to hear from you. Share what brought you here or which piece resonated most.
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="whatBroughtYou">What brought you here?</Label>
                  <Textarea
                    id="whatBroughtYou"
                    value={formData.whatBroughtYou}
                    onChange={(e) => setFormData({ ...formData, whatBroughtYou: e.target.value })}
                    required
                    rows={3}
                    data-testid="input-what-brought-you"
                  />
                </div>

                <div>
                  <Label htmlFor="resonatedPoem">Which poem resonated most?</Label>
                  <Input
                    id="resonatedPoem"
                    value={formData.resonatedPoem}
                    onChange={(e) => setFormData({ ...formData, resonatedPoem: e.target.value })}
                    placeholder="Optional"
                    data-testid="input-resonated-poem"
                  />
                </div>

                <div>
                  <Label htmlFor="message">What's on your mind?</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    data-testid="input-message"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-name"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
