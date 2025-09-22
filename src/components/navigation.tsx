export function Navigation() {
  const navItems = [
    "Home",
    "DISPOSABLE VAPE",
    "JUUL",
    "SHOP",
    "BRANDS",
    "POD SYSTEM",
    "PODS",
    "Nicotine Salt-30 ML",
    "Offer",
    "BLOG",
  ]

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 py-3">
          {navItems.map((item, index) => (
            <a key={index} href="#" className="text-sm font-medium hover:text-red-200 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
