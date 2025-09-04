import { redirect } from 'next/navigation'

export default function GSTCalculatorPage() {
  redirect('/gst-section-14-time-of-supply')
}

export const metadata = {
  title: 'GST Calculator - Redirecting to Section 14 Calculator',
  description: 'Redirecting to GST Section 14 Time of Supply Calculator',
}
