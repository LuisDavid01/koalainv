import { eq } from "drizzle-orm";
import { db } from "./db";
import { product } from "./db/schema";


export const QUERIES = {

	getProductos: async function () {
		const productos = await db
		.select()
		.from(product)
		.where(eq(product.active, true))

		return productos;
	},

};
