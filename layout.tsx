import type { Metadata } from 'next';import './globals.css';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),title:'Ayodhya Digitech | Innovate · Build · Grow',description:'Digital growth, web development, marketing and automation for ambitious businesses.',robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
