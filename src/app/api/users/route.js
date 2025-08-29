
import { db } from "../../../../config/db"
import { usersTable } from "../../../../config/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { email, name } = await req.json()
        
        // check if user exist
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email))

        // if ther is noe user in table
            if (existingUser.length === 0) {
                const result = await db.insert(usersTable).values({
                    name: name,
                    email:email
                }).returning()
                return NextResponse.json(result[0])
            }
        return NextResponse.json(existingUser[0])

    } catch (error) {
        console.error("Error in user API:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}