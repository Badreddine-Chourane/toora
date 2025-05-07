import React from 'react';
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Toora.ma</h3>
            <p className="text-slate-400">
              Service de trottinettes électriques en libre-service. Économique, écologique et pratique.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Liens utiles</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">À propos</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Tarifs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contact</h3>
            <div className="flex items-center space-x-3 text-slate-400">
              <Mail className="text-emerald-400" size={18} />
              <a href="mailto:info@toora.ma" className="hover:text-emerald-400 transition-colors">info@toora.ma</a>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <Phone className="text-emerald-400" size={18} />
              <a href="tel:+212522123456" className="hover:text-emerald-400 transition-colors">+212 522 123 456</a>
            </div>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
          <p>© 2025 Toora.ma. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;