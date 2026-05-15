import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from './app/lib/auth';

const adminRoutes = [
    "/admin",
    "/add-destinations"
];


export async function proxy(request) {
    const session = await auth.api.getSession({
            headers: await headers(),
        });
    
    if (!session) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        )
    }

    const pathname = request.nextUrl.pathname;
    const role = session.user.role;

    const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isProfileRoute = pathname.startsWith("/profile");

    if (isAdminRoute && role !== "admin") {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    const canAccessProfile = ["user", "admin"].includes(role);

    if (
        isProfileRoute  &&
        !canAccessProfile
    ) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    return NextResponse.next();
}
 
export const config = {
    matcher: [   
        "/admin",
        "/add-destinations",
        "/profile",
        "/profile/:path*",    
    ],
}