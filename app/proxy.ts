import { NextResponse, type NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const token = req.cookies.get('accessToken')

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}