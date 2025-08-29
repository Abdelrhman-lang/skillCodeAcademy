import { NextResponse } from "next/server"
import { db } from "../../../../config/db"
import { productsTable } from "../../../../config/schema"

export async function GET() {
    try {
        const result = await db.select().from(productsTable)
        return NextResponse.json(result,{status: 200})
    } catch (err) {
        console.log("Error Fetching Products:", err)
        return NextResponse.json(
            { error: "Faild to fetch products" },
            {status: 500}
        )
    }
}