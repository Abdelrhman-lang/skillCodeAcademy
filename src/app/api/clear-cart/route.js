import { eq } from "drizzle-orm"
import { db } from "../../../../config/db"
import { cartTable } from "../../../../config/schema"
import { NextResponse } from "next/server"

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId") // هنا بيرجع string لازم نحولو int

        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId" },
                {status: 400}
            )
        }
        const userIdAsInt = parseInt(userId, 10)
        await db.delete(cartTable).where(eq(cartTable.userId, userIdAsInt))
        return NextResponse.json({success: true},{status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: "Faild To Clear cart" },
            {status: 500}
        )
    }
}