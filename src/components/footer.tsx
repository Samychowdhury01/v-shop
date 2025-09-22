export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/vape-store-skull-logo-red.jpg" alt="Vape Dubai Hub" className="h-12 w-12" />
            <div className="text-sm text-gray-300">
              <p>Vape Dubai Hub, Dragon Mart, Al Awir</p>
              <p>Road, Dubai International City, Dubai,</p>
              <p>United Arab Emirates.</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">CONTACT INFO</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">📧</span>
                <span>Email: contact@vapdubaihub.ae</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">📱</span>
                <span>WhatsApp: +971 54 472 0904</span>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">POPULAR CATEGORIES</h3>
            <div className="space-y-2 text-sm">
              {["DISPOSABLE VAPE", "JUUL", "POD SYSTEM", "Nicotine Salt-30 ML", "Offer"].map((category) => (
                <a key={category} href="#" className="block text-gray-300 hover:text-white transition-colors">
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">USEFUL LINKS</h3>
            <div className="space-y-2 text-sm">
              {["ABOUT US", "CONTACT US", "PRIVACY POLICY", "TERMS-CONDITIONS"].map((link) => (
                <a key={link} href="#" className="block text-gray-300 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>vapdubaihub.ae. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
