import { db } from ".";
import { categoryTable, inventoryProductTable, inventoryTable, organizationMember, organizationTable, productTable } from "./schema";



async function main() {
	console.log("Seeding database...");
	await db.insert(categoryTable).values({
		name: "Tecnologia",
		ivaPercent: 10,
		active: true,
	})
	await db.insert(organizationTable).values({
		name: "Luis org",
		active: true,
	})

	await db.insert(organizationMember).values({
		userId: "qqcrKaDCf8Kyvuoyl40QOaOWE65bF6IR",
		organizationId: 1,
		role: "admin",
		active: true,
	})

	await db.insert(inventoryTable).values({
		organizationId: 1,
		name: "Inventario test",
	})

	await db.insert(productTable).values({
		organizationId: 1,
		name: "Product test",
		description: "Product test description",
		price: 10000,
		categoryId: 1,
		active: true,
	})

	await db.insert(inventoryProductTable).values({
		inventoryId: 1,
		productId: 1,
		quantity: 10,
	})

	console.log("Database seeded successfully.");
}

main().catch((error) => {
	console.error("Error seeding database:", error);
	process.exit(1);
});
