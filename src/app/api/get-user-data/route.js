import { eq } from "drizzle-orm"
import { db } from "../../../../config/db"
import { usersTable } from "../../../../config/schema"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const {searchParams} = new URL(req.url)
        const  email  = searchParams.get("email")
        
        const result = await db.select().from(usersTable).where(eq(usersTable.email, email))
        return NextResponse.json(result[0], {status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: "Faild To fetch user data" },
            {status: 500}
        )
    }
}