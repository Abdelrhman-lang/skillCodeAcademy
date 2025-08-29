
import { integer, numeric, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
});
export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  imageUrl: varchar().default(""),
  price: numeric({precision: 10, scale: 2}).notNull(),
  category: varchar().notNull(),
});

export const cartTable = pgTable("cart", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => usersTable.id).notNull(),
  productId: integer().references(() => productsTable.id).notNull(),
  quantity: integer().default(1).notNull()
})

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id).notNull(),
  status: text("status").notNull().default("pending"),
  totalAmount: numeric({precision: 10, scale: 2}).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const orderItemsTable = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => ordersTable.id).notNull(),
  productId: integer("product_id").references(() => productsTable.id).notNull(),
  price: numeric({precision: 10, scale: 2}).notNull(), // Price at time of order
  createdAt: timestamp("created_at").defaultNow()
});