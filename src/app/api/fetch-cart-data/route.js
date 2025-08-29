import { eq } from "drizzle-orm"
import { db } from "../../../../config/db"
import { cartTable, productsTable } from "../../../../config/schema"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                { error: "Missing Email" },
                {status: 400}
            )
        }
        const result = await db
        .select({
          cartId: cartTable.id,
          productId: productsTable.id,
          productTitle: productsTable.title,
          productPrice: productsTable.price,
          productImage: productsTable.imageUrl,
          productCategory: productsTable.category
        })
        .from(cartTable)
        .leftJoin(productsTable, eq(cartTable.productId, productsTable.id))
        .where(eq(cartTable.userId, id))
        return NextResponse.json(result, {status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: "Failed Fetch cart data" },
            {status: 500}
        )
    }
}