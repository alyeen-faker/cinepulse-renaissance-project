import { Facebook, Twitter, Instagram, Youtube, Smartphone, Monitor } from "lucide-react";

export const Footer = () => {
  const navigationLinks = [
    { label: "Accueil", href: "/" },
    { label: "Films", href: "/films" },
    { label: "Séries", href: "/series" },
    { label: "Nouveautés", href: "/nouveautes" },
    { label: "Tendances", href: "/tendances" },
  ];

  const infoLinks = [
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Conditions d'utilisation", href: "/terms" },
    { label: "Politique de confidentialité", href: "/privacy" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-primary font-bold text-2xl">NYORA</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Votre plateforme de streaming premium avec téléchargements légaux et recommandations personnalisées.
              Découvrez des univers infinis et des histoires captivantes.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold text-lg">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold text-lg">Informations</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Apps */}
          <div className="space-y-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-sm mb-3">Téléchargez notre application</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="#"
                  className="bg-card hover:bg-card/80 border border-border px-3 py-2 rounded-lg flex items-center transition-colors duration-200 text-sm"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  <span>App Store</span>
                </a>
                <a
                  href="#"
                  className="bg-card hover:bg-card/80 border border-border px-3 py-2 rounded-lg flex items-center transition-colors duration-200 text-sm"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  <span>Play Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 NYORA. Tous droits réservés. Développé avec ❤️ pour les cinéphiles.
          </p>
        </div>
      </div>
    </footer>
  );
};