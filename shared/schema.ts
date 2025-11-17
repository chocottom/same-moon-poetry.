import { sql, relations } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - Required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - Required for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Poems table
export const poems = pgTable("poems", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  theme: varchar("theme", { length: 50 }).notNull(), // Spiritual Depth, Presence & Connection, Time & Purpose, Growth & Becoming
  mood: varchar("mood", { length: 50 }).notNull(), // Reflective, Energetic, Melancholic, Inspiring
  featuredImageUrl: text("featured_image_url"),
  readingTime: integer("reading_time").notNull().default(3), // in minutes
  status: varchar("status", { length: 20 }).notNull().default("draft"), // draft, published, scheduled
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords"),
  publishedAt: timestamp("published_at"),
  views: integer("views").notNull().default(0),
  isFeatured: integer("is_featured").notNull().default(0), // 0 = not featured, 1-3 = position in featured journey
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const poemsRelations = relations(poems, ({ many }) => ({
  analytics: many(poemAnalytics),
}));

export const insertPoemSchema = createInsertSchema(poems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
});

export type InsertPoem = z.infer<typeof insertPoemSchema>;
export type Poem = typeof poems.$inferSelect;

// Prose table
export const prose = pgTable("prose", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  philosophyContent: text("philosophy_content").notNull(), // Left column: philosophy/lesson
  narrativeContent: text("narrative_content").notNull(), // Right column: personal story
  theme: varchar("theme", { length: 50 }).notNull(),
  mood: varchar("mood", { length: 50 }).notNull(),
  featuredImageUrl: text("featured_image_url"),
  relatedPoemId: varchar("related_poem_id"), // Optional related poem
  readingTime: integer("reading_time").notNull().default(5), // in minutes
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords"),
  publishedAt: timestamp("published_at"),
  views: integer("views").notNull().default(0),
  isFeatured: integer("is_featured").notNull().default(0), // 0 = not featured, 1 = featured on home
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const proseRelations = relations(prose, ({ one, many }) => ({
  relatedPoem: one(poems, {
    fields: [prose.relatedPoemId],
    references: [poems.id],
  }),
  analytics: many(proseAnalytics),
}));

export const insertProseSchema = createInsertSchema(prose).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
});

export type InsertProse = z.infer<typeof insertProseSchema>;
export type Prose = typeof prose.$inferSelect;

// Newsletter subscribers table
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email", { length: 255 }).notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  subscribedAt: true,
});

export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// Poem analytics table
export const poemAnalytics = pgTable("poem_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poemId: varchar("poem_id").notNull(),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
}, (table) => [index("idx_poem_analytics_poem_id").on(table.poemId)]);

export const poemAnalyticsRelations = relations(poemAnalytics, ({ one }) => ({
  poem: one(poems, {
    fields: [poemAnalytics.poemId],
    references: [poems.id],
  }),
}));

// Prose analytics table
export const proseAnalytics = pgTable("prose_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  proseId: varchar("prose_id").notNull(),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
}, (table) => [index("idx_prose_analytics_prose_id").on(table.proseId)]);

export const proseAnalyticsRelations = relations(proseAnalytics, ({ one }) => ({
  prose: one(prose, {
    fields: [proseAnalytics.proseId],
    references: [prose.id],
  }),
}));

// Contact form submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  whatBroughtYou: text("what_brought_you").notNull(),
  resonatedPoem: text("resonated_poem"),
  message: text("message").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
