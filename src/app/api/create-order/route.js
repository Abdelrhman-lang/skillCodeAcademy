import { NextResponse } from "next/server"
import { db } from "../../../../config/db"
import { orderItemsTable, ordersTable } from "../../../../config/schema"

export async function POST(req) {
    try {
        const { userId, items } = await req.json()
        
        if (!userId || !items || items.length === 0) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }
        
        // Calculate total amount
        const totalAmount = items.reduce((total, item) => {
            return total + (parseFloat(item.price));
        }, 0);
        
        // 1- إنشاء order جديد
        const [order] = await db.insert(ordersTable).values({
            userId,
            status: "pending",
            totalAmount: totalAmount
        }).returning();
        
        // 2- إدخال المنتجات في order_items
        const orderItems = items.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            price: item.price
        }));
  
        await db.insert(orderItemsTable).values(orderItems);
        return NextResponse.json({ success: true, orderId: order.id });
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: "faild to create order" },
            {status: 500}
        )
    }
}