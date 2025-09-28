import { BiPhone } from "react-icons/bi";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { LuMapPinCheck } from "react-icons/lu";


const Footer = () => {
  const footerLinks = {
    shop: [
      'All Categories',
      'Electronics',
      'Fashion',
      'Home & Garden',
      'Sports & Outdoors',
      'Health & Beauty',
    ],
    support: [
      'Help Center',
      'Contact Us',
      'Shipping Info',
      'Returns',
      'Size Guide',
      'Track Order',
    ],
    company: [
      'About SkyRec',
      'Careers',
      'Press',
      'Blog',
      'Affiliates',
      'Investors',
    ],
  };

  return (
    <footer className="bg-[hsl(224_71%_16%)]  text-[hsl[210_40%_98%]] w-full">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <p className="text-white mb-6 max-w-md">
              Your premium destination for quality products, exceptional service, 
              and unbeatable value. Discover, shop, and experience the difference.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <BiPhone className="h-7 w-7 text-accent" />
                <span className="text-primary">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdMarkEmailUnread className="h-7 w-7 text-accent" />
                <span className="text-primary">hello@skyrec.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <LuMapPinCheck className="h-7 w-7 text-accent" />
                <span className="text-primary">123 Commerce St, NY 10001</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
                <button 
                  key={index}
                  size="icon" 
                  variant="ghost" 
                  className="text-accent hover:text-accent/80 transition-colors cursor-pointer"
                >
                  <Icon className="h-8 w-8 " />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-primary hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-primary hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-primary hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary/60 text-sm">
              © 2024 SkyRec. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary/60 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary/60 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary/60 hover:text-accent transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;