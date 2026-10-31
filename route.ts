import { NextResponse } from 'next/server';
import { addEnquiry } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const b = await req.json();

    // Honeypot spam protection
    if (b.website) {
      return NextResponse.json({ ok: true });
    }

    const name = String(b.name || '').trim();
    const email = String(b.email || '').trim();
    const message = String(b.message || '').trim();

    if (
      name.length < 2 ||
      name.length > 120 ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      email.length > 254 ||
      message.length < 5 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: 'Please check your name, email and message.' },
        { status: 400 }
      );
    }

    await addEnquiry({
      name,
      email,
      phone: String(b.phone || '').slice(0, 40),
      service: String(b.service || '').slice(0, 120),
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Enquiry API error:', error);

    return NextResponse.json(
      { error: 'Could not save enquiry. Please try again.' },
      { status: 500 }
    );
  }
}