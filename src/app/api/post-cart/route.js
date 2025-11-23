import { NextResponse } from "next/server";
import { db } from "../../../../config/db";
import { cartItemsTable, cartTable } from "../../../../config/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { userEmail, productId, name, price, image, quantity } =
      await req.json();
    if (!userEmail || !productId || !name || !price || !image || !quantity) {
      return NextResponse.json(
        { error: "Missing Requierd Data" },
        { status: 400 }
      );
    }
    let [cart] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userEmail, userEmail));

    if (!cart) {
      const [newCart] = await db
        .insert(cartTable)
        .values({
          userEmail,
        })
        .returning();
      cart = newCart;
    }
    const existingCart = await db
      .select()
      .from(cartItemsTable)
      .where(
        and(
          eq(cartItemsTable.cartId, cart.id),
          eq(cartItemsTable.productId, Number(productId))
        )
      );

    if (existingCart.length > 0) {
      return NextResponse.json(
        { error: "Product already exists in cart" },
        { status: 400 }
      );
    }

    const [inserted] = await db
      .insert(cartItemsTable)
      .values({
        cartId: cart.id,
        productId,
        name,
        price,
        image,
        quantity,
      })
      .returning();
    return NextResponse.json(inserted);
  } catch (err) {
    console.error("Error adding to cart :", err);
    return NextResponse.json(
      { error: err.message || "Faild to Add Product to cart" },
      { status: 500 }
    );
  }
}
