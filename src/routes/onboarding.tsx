import CleanNavbar from '@/components/landing/CleanNavbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<CleanNavbar />

			<section className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8 divide-y divide-gray-200 text-center">
					<div className="space-y-8 divide-y divide-gray-200 text-center">
						<div>
							<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								Onboarding
							</h1>
							<p className="mt-4 text-lg text-gray-500">
								Get started by creating your first post.
							</p>
						</div>
						<div className="mt-8 space-y-6 sm:space-y-5">
							<div className="rounded-md shadow">
								<a
									href="#"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
								>
									Get started
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>

	)
}
