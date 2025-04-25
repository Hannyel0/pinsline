import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This middleware doesn't modify the request, but it ensures
  // that the geo information is attached to requests by Vercel
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/geolocation'],
}; 