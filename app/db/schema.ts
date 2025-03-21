import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const PREFIX = "app";

const tableCreator = pgTableCreator((name) => `${PREFIX}_${name}`);

export const users = tableCreator("user", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
});

export const accounts = tableCreator(
  "accounts",
  {
    id: serial("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    googleId: text("googleId").unique(),
  },
  (table) => ({
    userIdGoogleIdIdx: index("user_id_google_id_idx").on(
      table.userId,
      table.googleId
    ),
  })
);

export const profiles = tableCreator("profile", {
  id: serial("id").primaryKey(),
  userId: serial("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  displayName: text("displayName"),
  imageId: text("imageId"),
  image: text("image"),
  bio: text("bio").notNull().default(""),
});

export const sessions = tableCreator(
  "session",
  {
    id: text("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (table) => ({ userIdIdx: index("sessions_user_id_idx").on(table.userId) })
);

export const segments = tableCreator(
  "segment",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    order: integer("order").notNull(),
    moduleId: text("moduleId").notNull(),
    videoKey: text("videoKey"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({ slugIdx: index("segments_slug_idx").on(table.slug) })
);

export const segmentsRelations = relations(segments, ({ many }) => ({
  attachments: many(attachments),
}));

export const attachments = tableCreator("attachment", {
  id: serial("id").primaryKey(),
  segmentId: serial("segmentId")
    .notNull()
    .references(() => segments.id, { onDelete: "cascade" }),
  fileName: text("fileName").notNull(),
  fileKey: text("fileKey").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  segment: one(segments, {
    fields: [attachments.segmentId],
    references: [segments.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Segment = typeof segments.$inferSelect;
export type SegmentCreate = typeof segments.$inferInsert;
export type Attachment = typeof attachments.$inferSelect;
export type AttachmentCreate = typeof attachments.$inferInsert;
