import { eq } from "drizzle-orm"
import { db } from "../../../../config/db"
import { productsTable } from "../../../../config/schema"
import { NextResponse } from "next/server"


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const courseId = searchParams.get("id")

        if (!courseId) {
            return NextResponse.json(
                { error: "Missing course id" },
                 { status: 400 }
            )
        }

        const result = await db.select().from(productsTable).where(eq(productsTable.id, Number(courseId)))
        return NextResponse.json(result[0], {status: 200})
    } catch (err) {
        console.log("Error Fetch Course:", err)
        return NextResponse.json(
            { error: "Error Fetch Course" },
            {status: 500}
        )
    }
}