import { NextResponse } from "next/server"
import { db } from "../../../../config/db"
import { cartTable } from "../../../../config/schema"
import { eq } from "drizzle-orm"

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                { error: "Missing id" },
                {status : 400}
            )
        }
        await db.delete(cartTable).where(eq(cartTable.id, id))
        return NextResponse.json({success: true},{status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {error: "Faild to delete product" },
            {status : 500}
        )
    }
}