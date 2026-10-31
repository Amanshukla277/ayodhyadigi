import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const key=()=>new TextEncoder().encode(process.env.SESSION_SECRET||'dev-only-change-this-secret-before-sharing-123456789');
export async function createSession(email:string){return new SignJWT({email,role:'admin'}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('8h').sign(key())}
export async function isAdmin(){try{const c=await cookies();const token=c.get('ayodhya_admin')?.value;if(!token)return false;const {payload}=await jwtVerify(token,key());return payload.role==='admin'&&payload.email===process.env.ADMIN_EMAIL;}catch{return false}}
