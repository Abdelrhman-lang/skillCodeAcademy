import { NextResponse } from "next/server"
import { db } from "../../../../config/db"
import { cartTable, productsTable, usersTable } from "../../../../config/schema"
import { eq } from "drizzle-orm"

export async function POST(req) {
    try {
        const { userId, productId, quantity } = await req.json()
        
        if (!userId || !productId) {
            return NextResponse.json(
                { error: "missing userId or productId" },
                {status : 400}
            )
        } 
        const [inserted] = await db.insert(cartTable).values({
            userId: userId,
            productId: productId,
            quantity: quantity || 1
        }).returning()

        const result = await db.select({
            cartId: cartTable.id,
            quantity: cartTable.quantity,
            userName: usersTable.name,
            userEmail: usersTable.email,
            productTitle: productsTable.title,
            productPrice: productsTable.price,
            productImage: productsTable.imageUrl,
            
        }).from(cartTable).leftJoin(usersTable, eq(cartTable.userId, usersTable.id)).leftJoin(productsTable, eq(cartTable.productId, productsTable.id)).where(eq(cartTable.id, inserted.id))
        return NextResponse.json(result[0], {status : 201})
    } catch (err) {
        console.error("Error adding to cart:", err);
        return NextResponse.json(
            { error: "Failed to add to cart" },
            { status: 500 }
          );
    }
}