import { NextResponse } from "next/server";
import { db } from "../../../../config/db";
import { orderItemsTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing Order Id" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(orderItemsTable)
      .where(eq(orderItemsTable.orderId, Number(orderId)));
    return NextResponse.json(result);
  } catch (err) {
    console.error("Error Get Order Details", err);
    return NextResponse.json(
      { error: "Faild To Get Order Details" },
      { status: 500 }
    );
  }
}
