import { createServerFn } from "@tanstack/react-start";
import { QUERIES } from "../queries.server";


export const getProductos = createServerFn({method: "GET"})
.handler(async () => {
	const productos = await QUERIES.getAllProductos();
	return productos;
})
