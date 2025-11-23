import { eq } from "drizzle-orm";
import { db } from "../../../../config/db";
import { ordersTable } from "../../../../config/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { error: "Missing User Email" },
        { status: 400 }
      );
    }
    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.userEmail, userEmail));
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "failed to fetch order" },
      { status: 500 }
    );
  }
}
