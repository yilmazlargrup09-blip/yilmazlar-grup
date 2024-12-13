import { Franchises } from "@/components/Franchises"


export const metadata = {
  title: 'Our Franchises | Yilmazlar Grup',
  description: 'Explore our franchises including Linea Rossa Aluminum, Albert Genau, and Winsa PVC. High-quality products and expert installation services in Marmaris.',
}

export default function FranchisesPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Franchises />
    </main>
  )
}

