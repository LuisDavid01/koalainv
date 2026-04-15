import { eq } from "drizzle-orm";
import { db } from "./db";
import { productTable } from "./db/schema";


export const QUERIES = {

	getAllProductos: async function () {
		const productos = await db
		.select()
		.from(productTable)
		.where(eq(productTable.active, true))

		return productos;
	},

};
