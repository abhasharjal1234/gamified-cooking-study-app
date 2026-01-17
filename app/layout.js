import './globals.css'

export const metadata = {
  title: 'Cooked - Game Your Way to A+',
  description: 'Study feels like cooking and combat',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
