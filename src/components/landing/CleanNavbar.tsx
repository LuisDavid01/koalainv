import { Link} from '@tanstack/react-router'



export default function CleanNavbar() {


	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background">
			<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
				<Link
					to="/"
					className="flex items-center gap-2 text-xl font-bold text-foreground"
				>
					<span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
						K
					</span>
					koalaInv
				</Link>

			</nav>

		</header>
	)
}
