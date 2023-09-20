"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function NavbarActions({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeid}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`
        }
    ]



    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map(({ href, label, active }, index) => (
                <Link
                    key={index}
                    href={href}
                    className={cn(
                        "text-gray-500 font-medium transition-colors hover:text-gray-900",
                        active && "text-gray-900 dark:text-white"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}