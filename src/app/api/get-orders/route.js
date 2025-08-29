import { eq } from "drizzle-orm"
import { db } from "../../../../config/db"
import { ordersTable } from "../../../../config/schema"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url) 
        const userId = searchParams.get("userId")

        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId" },
                {status: 400}
            )
        }
        const userIdAsInt = parseInt(userId, 10)
        const result = await db.select().from(ordersTable).where(eq(ordersTable.userId, userIdAsInt))
        return NextResponse.json(result,{status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: "failed to fetch order" },
            {status: 500}
        )
    }
}