export default function Footer() {
  return (
    <footer className="bg-gray-950 py-32 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 text-white/50">
        <div className="md:col-span-2">
          <div className="text-3xl font-main font-black tracking-tighter text-white mb-10 uppercase">
            COASTAL COVE
          </div>
          <p className="max-w-sm text-sm leading-relaxed mb-10 font-medium">
            A sanctuary for the soul, where the horizon meets architectural elegance. Experience the pinnacle of island living.
          </p>
          <div className="flex gap-8 text-[12px] font-extrabold uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
        <div>
          <h4 className="text-white text-[12px] font-extrabold uppercase tracking-[0.3em] mb-10">Navigation</h4>
          <ul className="space-y-6 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">The Residences</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Dining</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Wellness</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Experiences</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-[12px] font-extrabold uppercase tracking-[0.3em] mb-10">Newsletter</h4>
          <p className="text-sm mb-8 font-medium">Stay updated with our latest collections and events.</p>
          <div className="flex border-b border-white/20 pb-4 group focus-within:border-accent transition-all">
            <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent text-white w-full text-[10px] font-extrabold tracking-widest focus:outline-none placeholder:text-white/30" />
            <button className="text-white hover:text-accent transition-colors font-bold">→</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-32 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-extrabold uppercase tracking-[0.4em]">
        <span>© 2026 COASTAL COVE</span>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
