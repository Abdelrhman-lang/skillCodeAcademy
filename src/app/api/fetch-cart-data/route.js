import { eq } from "drizzle-orm";
import { db } from "../../../../config/db";
import { cartItemsTable, cartTable } from "../../../../config/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json({ error: "Missing Email" }, { status: 400 });
    }
    const [cart] = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userEmail, userEmail));

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    const items = await db
      .select()
      .from(cartItemsTable)
      .where(eq(cartItemsTable.cartId, cart.id));
    return NextResponse.json({
      cartId: cart.id,
      items,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed Fetch cart data" },
      { status: 500 }
    );
  }
}
