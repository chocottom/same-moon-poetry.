import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertPoemSchema, 
  insertProseSchema, 
  insertNewsletterSubscriberSchema,
  insertContactSubmissionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes - Return null if not authenticated instead of 401
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.json(null);
      }
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public Poem Routes
  app.get("/api/poems", async (req, res) => {
    try {
      const { featured } = req.query;
      let poems;
      
      // Handle featured query parameter
      if (featured === "true" || featured === "1" || req.path.includes("featured")) {
        poems = await storage.getFeaturedPoems();
      } else {
        poems = await storage.getPublishedPoems();
      }
      
      res.json(poems);
    } catch (error) {
      console.error("Error fetching poems:", error);
      res.status(500).json({ message: "Failed to fetch poems" });
    }
  });

  app.get("/api/poems/:id", async (req, res) => {
    try {
      const poem = await storage.getPoem(req.params.id);
      if (!poem) {
        return res.status(404).json({ message: "Poem not found" });
      }
      res.json(poem);
    } catch (error) {
      console.error("Error fetching poem:", error);
      res.status(500).json({ message: "Failed to fetch poem" });
    }
  });

  app.post("/api/poems/:id/view", async (req, res) => {
    try {
      await storage.incrementPoemViews(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking poem view:", error);
      res.status(500).json({ message: "Failed to track view" });
    }
  });

  // Public Prose Routes
  app.get("/api/prose", async (req, res) => {
    try {
      const { featured } = req.query;
      let proseStories;
      
      // Handle featured query parameter
      if (featured === "true" || featured === "1" || req.path.includes("featured")) {
        proseStories = await storage.getFeaturedProse();
      } else {
        proseStories = await storage.getPublishedProse();
      }
      
      res.json(proseStories);
    } catch (error) {
      console.error("Error fetching prose:", error);
      res.status(500).json({ message: "Failed to fetch prose" });
    }
  });

  app.get("/api/prose/:id", async (req, res) => {
    try {
      const proseItem = await storage.getProse(req.params.id);
      if (!proseItem) {
        return res.status(404).json({ message: "Prose not found" });
      }
      res.json(proseItem);
    } catch (error) {
      console.error("Error fetching prose:", error);
      res.status(500).json({ message: "Failed to fetch prose" });
    }
  });

  app.post("/api/prose/:id/view", async (req, res) => {
    try {
      await storage.incrementProseViews(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking prose view:", error);
      res.status(500).json({ message: "Failed to track view" });
    }
  });

  // Newsletter Route
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validation = insertNewsletterSubscriberSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: validation.error.errors 
        });
      }

      // Check if already subscribed
      const exists = await storage.checkNewsletterSubscriber(validation.data.email);
      if (exists) {
        return res.status(409).json({ message: "Email already subscribed" });
      }

      await storage.createNewsletterSubscriber(validation.data);
      res.json({ success: true, message: "Successfully subscribed" });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  // Contact Form Route
  app.post("/api/contact", async (req, res) => {
    try {
      const validation = insertContactSubmissionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: validation.error.errors 
        });
      }

      await storage.createContactSubmission(validation.data);
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Admin Poem Routes (Protected)
  app.get("/api/admin/poems", isAuthenticated, async (req, res) => {
    try {
      const poems = await storage.getAllPoems();
      res.json(poems);
    } catch (error) {
      console.error("Error fetching admin poems:", error);
      res.status(500).json({ message: "Failed to fetch poems" });
    }
  });

  app.post("/api/admin/poems", isAuthenticated, async (req, res) => {
    try {
      const validation = insertPoemSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: validation.error.errors 
        });
      }

      const poem = await storage.createPoem(validation.data);
      res.json(poem);
    } catch (error) {
      console.error("Error creating poem:", error);
      res.status(500).json({ message: "Failed to create poem" });
    }
  });

  app.put("/api/admin/poems/:id", isAuthenticated, async (req, res) => {
    try {
      const validation = insertPoemSchema.partial().safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: validation.error.errors 
        });
      }

      const poem = await storage.updatePoem(req.params.id, validation.data);
      if (!poem) {
        return res.status(404).json({ message: "Poem not found" });
      }
      res.json(poem);
    } catch (error) {
      console.error("Error updating poem:", error);
      res.status(500).json({ message: "Failed to update poem" });
    }
  });

  app.delete("/api/admin/poems/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deletePoem(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting poem:", error);
      res.status(500).json({ message: "Failed to delete poem" });
    }
  });

  // Admin Prose Routes (Protected)
  app.get("/api/admin/prose", isAuthenticated, async (req, res) => {
    try {
      const proseStories = await storage.getAllProse();
      res.json(proseStories);
    } catch (error) {
      console.error("Error fetching admin prose:", error);
      res.status(500).json({ message: "Failed to fetch prose" });
    }
  });

  app.post("/api/admin/prose", isAuthenticated, async (req, res) => {
    try {
      const validation = insertProseSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: validation.error.errors 
        });
      }

      const proseItem = await storage.createProse(validation.data);
      res.json(proseItem);
    } catch (error) {
      console.error("Error creating prose:", error);
      res.status(500).json({ message: "Failed to create prose" });
    }
  });

  app.put("/api/admin/prose/:id", isAuthenticated, async (req, res) => {
    try {
      const validation = insertProseSchema.partial().safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: validation.error.errors 
        });
      }

      const proseItem = await storage.updateProse(req.params.id, validation.data);
      if (!proseItem) {
        return res.status(404).json({ message: "Prose not found" });
      }
      res.json(proseItem);
    } catch (error) {
      console.error("Error updating prose:", error);
      res.status(500).json({ message: "Failed to update prose" });
    }
  });

  app.delete("/api/admin/prose/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteProse(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting prose:", error);
      res.status(500).json({ message: "Failed to delete prose" });
    }
  });

  // Admin Analytics Route (Protected)
  app.get("/api/admin/analytics", isAuthenticated, async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Admin Newsletter Subscribers Route (Protected)
  app.get("/api/admin/subscribers", isAuthenticated, async (req, res) => {
    try {
      const subscribers = await storage.getAllNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
