import { Package } from "lucide-react"

export const metadata = {
  title: "Access Restricted",
  robots: "noindex, nofollow",
}

export default function AgeRestrictedPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center">
            <Package className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">Access Restricted</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">You must be 18 years or older to access this website.</p>
        </div>

        <div className="pt-4 border-t border-zinc-900">
          <p className="text-sm text-zinc-500">
            This website contains age-restricted products.
            <br />
            Please come back when you are of legal age.
          </p>
        </div>
      </div>
    </div>
  )
}
