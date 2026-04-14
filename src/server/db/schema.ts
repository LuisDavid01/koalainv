import { relations } from "drizzle-orm";
import { pgTable, bigint, text, timestamp, boolean, index, integer, primaryKey } from "drizzle-orm/pg-core";


export const auditTable = pgTable("audit", {
	id: bigint("id", { mode: "number" })
		.primaryKey()
		.generatedAlwaysAsIdentity(),
	action: text("action").notNull(),
	createdAt: timestamp("created_at").notNull(),
	isActive: boolean("is_active").notNull(),

})

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const session = pgTable(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const organization = pgTable("organization", {
	id: bigint("id", { mode: "number" })
		.primaryKey()
		.generatedAlwaysAsIdentity(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	active: boolean("active").default(true).notNull(),
})

export const organizationMember = pgTable("organization_member", {
	userId: text("user_id").notNull(),
	organizationId: bigint("organization_id", { mode: "number" })
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),
	role: text("role").notNull(),
	active: boolean("active").default(true).notNull(),
}, (t) => [
	primaryKey({ columns: [t.userId, t.organizationId] }),
])


export const category = pgTable("category", {
	id: bigint("id", { mode: "number" })
		.primaryKey()
		.generatedAlwaysAsIdentity(),
	name: text("name").notNull(),
	ivaPercent: integer("iva_percent").notNull(),
	active: boolean("active").default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const product = pgTable("product", {
	id: bigint("id", { mode: "number" })
		.primaryKey()
		.generatedAlwaysAsIdentity(),

	organizationId: bigint("organization_id", { mode: "number" })
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),

	name: text("name").notNull(),
	description: text("description").notNull(),
	price: bigint("price", { mode: "number" }).notNull(),

	categoryId: bigint("category_id", { mode: "number" })
		.references(() => category.id, { onDelete: "set null" }),
	active: boolean("active").default(true).notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
})


export const inventory = pgTable("inventory", {
	id: bigint("id", { mode: "number" })
		.primaryKey()
		.generatedAlwaysAsIdentity(),

	organizationId: bigint("organization_id", { mode: "number" })
		.notNull()
		.references(() => organization.id, { onDelete: "cascade" }),

	productId: bigint("product_id", { mode: "number" })
		.notNull()
		.references(() => product.id, { onDelete: "cascade" }),

	quantity: bigint("quantity", { mode: "number" }).notNull(),

	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
})


export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
export const organizationRelations = relations(organization, ({ many }) => ({
	members: many(organizationMember),
	products: many(product),
	inventories: many(inventory),
}));

export const organizationMemberRelations = relations(
	organizationMember,
	({ one }) => ({
		user: one(user, {
			fields: [organizationMember.userId],
			references: [user.id],
		}),
		organization: one(organization, {
			fields: [organizationMember.organizationId],
			references: [organization.id],
		}),
	})
);


export const categoryRelations = relations(category, ({ many }) => ({
	products: many(product),
}));


export const productRelations = relations(product, ({ one, many }) => ({
	organization: one(organization, {
		fields: [product.organizationId],
		references: [organization.id],
	}),

	category: one(category, {
		fields: [product.categoryId],
		references: [category.id],
	}),

	inventory: many(inventory),
}));




