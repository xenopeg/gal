import 'server-only'
import { cookies } from 'next/headers'
import { randomBytes } from 'crypto'
import prisma from '.'
 
export async function createSession(id: number) {
   const session = await prisma.session.create({
    data: {
      userId: id,
      createdOn: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      token: randomBytes(48).toString("hex"),
      disabled: false
    }
   });
 
   
  cookies().set('session', session.token, {
    httpOnly: true,
    secure: true,
    expires: session.expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}