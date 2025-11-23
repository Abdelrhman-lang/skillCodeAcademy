import { NextResponse } from "next/server";
import { db } from "../../../../config/db";
import {
  cartItemsTable,
  cartTable,
  orderItemsTable,
  ordersTable,
} from "../../../../config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: "Missing User Email" },
        { status: 400 }
      );
    }

    const [cart] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userEmail, userEmail));

    if (!cart) {
      return NextResponse.json({ error: "Cart Not Found" }, { status: 404 });
    }

    const cartItems = await db
      .select()
      .from(cartItemsTable)
      .where(eq(cartItemsTable.cartId, cart.id));

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is Empty" }, { status: 400 });
    }

    const [order] = await db
      .insert(ordersTable)
      .values({
        userEmail,
      })
      .returning();

    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      name: item.name,
      price: Number(item.price),
      image: item.image,
    }));
    await db.insert(orderItemsTable).values(orderItems);
    await db.delete(cartItemsTable).where(eq(cartItemsTable.cartId, cart.id));

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error(err.message || "Error while Create Order", err);
    return NextResponse.json(
      { error: err.message || "Faild to Create Order" },
      { status: 500 }
    );
  }
}
