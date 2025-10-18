import { AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Access Restricted",
  robots: "noindex, nofollow",
}

export default function AgeRestrictedPage() {
  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center ring-4 ring-amber-400">
            <AlertTriangle className="w-12 h-12 text-amber-600" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">Access Restricted</h1>
          <p className="text-gray-600 text-lg leading-relaxed">You must be 18 years or older to access this website.</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This website contains age-restricted products.
            <br />
            Please come back when you are of legal age.
          </p>
        </div>
      </div>
    </div>
  )
}
