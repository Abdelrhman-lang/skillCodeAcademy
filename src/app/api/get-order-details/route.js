import { NextResponse } from "next/server"
import { db } from "../../../../config/db"
import { orderItemsTable, ordersTable, productsTable } from "../../../../config/schema"
import { eq } from "drizzle-orm"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const orderId = searchParams.get("orderId")
        const orderIdAsInt = parseInt(orderId, 10)

        if (Number.isNaN(orderIdAsInt) || orderIdAsInt <= 0) {
            return NextResponse.json(
                { error: "Invalid orderId. Must be a positive integer." },
                 { status: 400 }
    );
}

        const result = await db.select({
            id: orderItemsTable.id,
            orderId: ordersTable.id,
            productId: orderItemsTable.productId,
            productPrice: productsTable.price,
            productImage: productsTable.imageUrl,
            productTitle: productsTable.title

        }).from(orderItemsTable).leftJoin(ordersTable, eq(orderItemsTable.orderId, ordersTable.id)).leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id)).where(eq(orderItemsTable.orderId, orderIdAsInt))
        return NextResponse.json(result, {status: 200})
    } catch (err) {
        console.log("error get order details: ", err)
        return NextResponse.json(
            { error: "faild to get order details" },
            {status: 500}
        )
    }
}