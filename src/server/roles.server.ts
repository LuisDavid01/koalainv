import { db } from "@/server/db";
import { auth } from "@/lib/auth";
import {
	getRequest,
} from '@tanstack/react-start/server'
import { organizationMember } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export async function isCurrentUserOrgMember(organizationId: number | null | undefined) {
	if (!organizationId) {
		return false;
	}

	const req = getRequest();
	const user = await auth.api.getSession({
		headers: req.headers
	});
	if (!user?.session) {
		return false;
	}

	try {
		const [result] = await db
			.select()
			.from(organizationMember)
			.where(and(
				eq(organizationMember.organizationId, organizationId),
				eq(organizationMember.userId, user.session.userId),
				eq(organizationMember.active, true)
			))
		return !!result;
	} catch (error) {
		console.log(error)
		throw new Error(error as string)
	}
}

