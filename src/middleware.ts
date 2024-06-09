import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"
 

export default withAuth(
  function middleware(request) {
    if(request.nextauth.token) {
      return NextResponse.next();
    }
    
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        token?.role === "COORDINATOR" || 
        token?.role === "LOGISTICS" || 
        token?.role === "STORAGE"
      },
    },
  },
)
// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   return NextResponse.next()
// }
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
      ],
}
