import {
  users,
  poems,
  prose,
  newsletterSubscribers,
  poemAnalytics,
  proseAnalytics,
  contactSubmissions,
  type User,
  type UpsertUser,
  type Poem,
  type InsertPoem,
  type Prose,
  type InsertProse,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, or, like } from "drizzle-orm";

export interface IStorage {
  // User operations (Required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Poem operations
  createPoem(poem: InsertPoem): Promise<Poem>;
  getPoem(id: string): Promise<Poem | undefined>;
  getAllPoems(): Promise<Poem[]>;
  getPublishedPoems(): Promise<Poem[]>;
  getFeaturedPoems(): Promise<Poem[]>;
  getPoemsByTheme(theme: string): Promise<Poem[]>;
  updatePoem(id: string, poem: Partial<InsertPoem>): Promise<Poem | undefined>;
  deletePoem(id: string): Promise<void>;
  incrementPoemViews(id: string): Promise<void>;

  // Prose operations
  createProse(prose: InsertProse): Promise<Prose>;
  getProse(id: string): Promise<Prose | undefined>;
  getAllProse(): Promise<Prose[]>;
  getPublishedProse(): Promise<Prose[]>;
  getFeaturedProse(): Promise<Prose[]>;
  updateProse(id: string, prose: Partial<InsertProse>): Promise<Prose | undefined>;
  deleteProse(id: string): Promise<void>;
  incrementProseViews(id: string): Promise<void>;

  // Newsletter operations
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  checkNewsletterSubscriber(email: string): Promise<boolean>;

  // Contact operations
  createContactSubmission(contact: InsertContactSubmission): Promise<ContactSubmission>;

  // Analytics operations
  getAnalytics(): Promise<{
    totalPoemViews: number;
    totalProseViews: number;
    totalSubscribers: number;
    mostPopularPoem: { title: string; views: number } | null;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (Required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Poem operations
  async createPoem(poemData: InsertPoem): Promise<Poem> {
    const [poem] = await db
      .insert(poems)
      .values({
        ...poemData,
        publishedAt: poemData.status === "published" ? new Date() : null,
      })
      .returning();
    return poem;
  }

  async getPoem(id: string): Promise<Poem | undefined> {
    const [poem] = await db.select().from(poems).where(eq(poems.id, id));
    return poem;
  }

  async getAllPoems(): Promise<Poem[]> {
    return await db.select().from(poems).orderBy(desc(poems.createdAt));
  }

  async getPublishedPoems(): Promise<Poem[]> {
    return await db
      .select()
      .from(poems)
      .where(eq(poems.status, "published"))
      .orderBy(desc(poems.publishedAt));
  }

  async getFeaturedPoems(): Promise<Poem[]> {
    return await db
      .select()
      .from(poems)
      .where(and(eq(poems.status, "published"), sql`${poems.isFeatured} > 0`))
      .orderBy(desc(poems.isFeatured))
      .limit(3);
  }

  async getPoemsByTheme(theme: string): Promise<Poem[]> {
    return await db
      .select()
      .from(poems)
      .where(and(eq(poems.theme, theme), eq(poems.status, "published")))
      .orderBy(desc(poems.publishedAt));
  }

  async updatePoem(id: string, poemData: Partial<InsertPoem>): Promise<Poem | undefined> {
    const updateData: any = {
      ...poemData,
      updatedAt: new Date(),
    };

    // Set publishedAt if status is being changed to published
    if (poemData.status === "published") {
      const [existing] = await db.select().from(poems).where(eq(poems.id, id));
      if (existing && existing.status !== "published") {
        updateData.publishedAt = new Date();
      }
    }

    const [poem] = await db
      .update(poems)
      .set(updateData)
      .where(eq(poems.id, id))
      .returning();
    return poem;
  }

  async deletePoem(id: string): Promise<void> {
    // Delete analytics first
    await db.delete(poemAnalytics).where(eq(poemAnalytics.poemId, id));
    // Delete poem
    await db.delete(poems).where(eq(poems.id, id));
  }

  async incrementPoemViews(id: string): Promise<void> {
    // Increment views counter
    await db
      .update(poems)
      .set({ views: sql`${poems.views} + 1` })
      .where(eq(poems.id, id));
    
    // Record analytics
    await db.insert(poemAnalytics).values({ poemId: id });
  }

  // Prose operations
  async createProse(proseData: InsertProse): Promise<Prose> {
    const [proseItem] = await db
      .insert(prose)
      .values({
        ...proseData,
        publishedAt: proseData.status === "published" ? new Date() : null,
      })
      .returning();
    return proseItem;
  }

  async getProse(id: string): Promise<Prose | undefined> {
    const [proseItem] = await db.select().from(prose).where(eq(prose.id, id));
    return proseItem;
  }

  async getAllProse(): Promise<Prose[]> {
    return await db.select().from(prose).orderBy(desc(prose.createdAt));
  }

  async getPublishedProse(): Promise<Prose[]> {
    return await db
      .select()
      .from(prose)
      .where(eq(prose.status, "published"))
      .orderBy(desc(prose.publishedAt));
  }

  async getFeaturedProse(): Promise<Prose[]> {
    return await db
      .select()
      .from(prose)
      .where(and(eq(prose.status, "published"), sql`${prose.isFeatured} > 0`))
      .orderBy(desc(prose.isFeatured))
      .limit(1);
  }

  async updateProse(id: string, proseData: Partial<InsertProse>): Promise<Prose | undefined> {
    const updateData: any = {
      ...proseData,
      updatedAt: new Date(),
    };

    // Set publishedAt if status is being changed to published
    if (proseData.status === "published") {
      const [existing] = await db.select().from(prose).where(eq(prose.id, id));
      if (existing && existing.status !== "published") {
        updateData.publishedAt = new Date();
      }
    }

    const [proseItem] = await db
      .update(prose)
      .set(updateData)
      .where(eq(prose.id, id))
      .returning();
    return proseItem;
  }

  async deleteProse(id: string): Promise<void> {
    // Delete analytics first
    await db.delete(proseAnalytics).where(eq(proseAnalytics.proseId, id));
    // Delete prose
    await db.delete(prose).where(eq(prose.id, id));
  }

  async incrementProseViews(id: string): Promise<void> {
    // Increment views counter
    await db
      .update(prose)
      .set({ views: sql`${prose.views} + 1` })
      .where(eq(prose.id, id));
    
    // Record analytics
    await db.insert(proseAnalytics).values({ proseId: id });
  }

  // Newsletter operations
  async createNewsletterSubscriber(
    subscriberData: InsertNewsletterSubscriber
  ): Promise<NewsletterSubscriber> {
    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values(subscriberData)
      .onConflictDoNothing()
      .returning();
    return subscriber;
  }

  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db
      .select()
      .from(newsletterSubscribers)
      .orderBy(desc(newsletterSubscribers.subscribedAt));
  }

  async checkNewsletterSubscriber(email: string): Promise<boolean> {
    const [subscriber] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email));
    return !!subscriber;
  }

  // Contact operations
  async createContactSubmission(
    contactData: InsertContactSubmission
  ): Promise<ContactSubmission> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(contactData)
      .returning();
    return contact;
  }

  // Analytics operations
  async getAnalytics(): Promise<{
    totalPoemViews: number;
    totalProseViews: number;
    totalSubscribers: number;
    mostPopularPoem: { title: string; views: number } | null;
  }> {
    // Get total poem views
    const poemViewsResult = await db
      .select({ total: sql<number>`sum(${poems.views})` })
      .from(poems);
    const totalPoemViews = Number(poemViewsResult[0]?.total || 0);

    // Get total prose views
    const proseViewsResult = await db
      .select({ total: sql<number>`sum(${prose.views})` })
      .from(prose);
    const totalProseViews = Number(proseViewsResult[0]?.total || 0);

    // Get total subscribers
    const subscribersResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(newsletterSubscribers);
    const totalSubscribers = Number(subscribersResult[0]?.count || 0);

    // Get most popular poem
    const [popularPoem] = await db
      .select({ title: poems.title, views: poems.views })
      .from(poems)
      .where(eq(poems.status, "published"))
      .orderBy(desc(poems.views))
      .limit(1);

    return {
      totalPoemViews,
      totalProseViews,
      totalSubscribers,
      mostPopularPoem: popularPoem || null,
    };
  }
}

export const storage = new DatabaseStorage();
