import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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
  price: numeric({ precision: 10, scale: 2 }).notNull(),
  category: varchar().notNull(),
});

export const cartTable = pgTable("cart", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userEmail: text("user_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const cartItemsTable = pgTable("cart_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  cartId: integer("cart_id")
    .references(() => cartTable.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  image: text("image").notNull(),
  quantity: integer("quantity").default(1).notNull(),
});
export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  userEmail: text("user_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").default("pending").notNull(),
});
export const orderItemsTable = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  image: text("image").notNull(),
});
