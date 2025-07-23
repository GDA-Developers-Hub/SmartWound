"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

const translations = {
  en: {
    smartWound: "Smart Wound",
    logIn: "Log In",
    getStarted: "Get Started",
    heroTitle: "The Future of Wound Care is Here.",
    heroSubtitle: "Your personal AI companion for tracking healing, getting safe guidance, and connecting with support. Take control of your recovery journey.",
    startTracking: "Start Tracking for Free",
    assistantTitle: "An Intelligent Assistant for Every Step",
    photoCheckTitle: "AI Photo Check",
    photoCheckDesc: "Upload a photo to classify your wound type. Get instant, safe guidance and alerts for severe conditions.",
    chatTitle: "GPT-Powered Chat",
    chatDesc: "Ask questions and get general wound care advice from our AI chatbot, available 24/7.",
    trackerTitle: "Healing Tracker",
    trackerDesc: "Log daily progress with photos and notes. Visualize your healing journey and get smart reminders.",
    howItWorksTitle: "Simple Steps to Smarter Healing",
    step1Title: "Upload a Photo.",
    step1Desc: "Snap a picture of your wound to begin.",
    step2Title: "Get AI Insights.",
    step2Desc: "Receive safe care tips and wound classification.",
    step3Title: "Track & Heal.",
    step3Desc: "Log daily photos and notes to monitor your progress.",
    safetyTitle: "Important: Your Safety is Our Priority",
    safetyDesc: "Smart Wound is an informational tool, not a substitute for professional medical diagnosis or treatment. Always consult a healthcare provider for any medical concerns.",
    about: "About Us",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    copyright: "Smart Wound. All rights reserved.",
  },
  am: {
    smartWound: "ብልጥ ቁስል",
    logIn: "ይግቡ",
    getStarted: "ይጀምሩ",
    heroTitle: "የወደፊቱ የ Wound እንክብካቤ እዚህ አለ",
    heroSubtitle: "የእርስዎ የግል ሰው ሰራሽ ረዳት ፈውስን ለመከታተል፣ ደህንነቱ የተጠበቀ መመሪያ ለማግኘት እና ከድጋፍ ጋር ለመገናኘት። የማገገም ጉዞዎን ይቆጣጠሩ።",
    startTracking: "በነጻ መከታተል ይጀምሩ",
    assistantTitle: "ለሁሉም እርምጃ የማሰብ ችሎታ ያለው ረዳት",
    photoCheckTitle: "የ AI ፎቶ ማረጋገጫ",
    photoCheckDesc: "የቁስልዎን አይነት ለመለየት ፎቶ ይስቀሉ። ፈጣን፣ ደህንነቱ የተጠበቀ መመሪያ እና ለከባድ ሁኔታዎች ማንቂያዎችን ያግኙ።",
    chatTitle: "በGPT-የሚሰራ ውይይት",
    chatDesc: "ጥያቄዎችን ይጠይቁ እና ከእኛ AI chatbot አጠቃላይ የቁስል እንክብካቤ ምክር ያግኙ፣ 24/7 ይገኛል።",
    trackerTitle: "የፈውስ መከታተያ",
    trackerDesc: "የየቀኑን ሂደት በፎቶዎች እና ማስታወሻዎች ይመዝግቡ። የፈውስ ጉዞዎን በዓይነ ሕሊናዎ ይመልከቱ እና ዘመናዊ አስታዋሾችን ያግኙ።",
    howItWorksTitle: "ወደ ዘመናዊ ፈውስ ቀላል ደረጃዎች",
    step1Title: "ፎቶ ይስቀሉ።",
    step1Desc: "ለመጀመር የቁስልዎን ፎቶ አንሳ።",
    step2Title: "የ AI ግንዛቤዎችን ያግኙ።",
    step2Desc: "ደህንነቱ የተጠበቀ የእንክብካቤ ምክሮችን እና የቁስል ምደባን ይቀበሉ።",
    step3Title: "ይከታተሉ እና ይፈውሱ።",
    step3Desc: "ሂደትዎን ለመከታተል የየቀኑን ፎቶዎች እና ማስታወሻዎች ይመዝግቡ።",
    safetyTitle: "አስፈላጊ፡ የእርስዎ ደህንነት ቅድሚያ የምንሰጠው ጉዳይ ነው",
    safetyDesc: "ስማርት ቁስል የመረጃ መሳሪያ ነው፣ ለሙያዊ የህክምና ምርመራ ወይም ህክምና ምትክ አይደለም። ለማንኛውም የህክምና ጉዳይ ሁል ጊዜ የጤና እንክብካቤ አቅራቢን ያማክሩ።",
    about: "ስለ እኛ",
    privacy: "የ ግል የሆነ",
    terms: "የአገልግሎት ውል",
    contact: "ያግኙን",
    copyright: "ብልጥ ቁስል. መብቱ በህግ የተጠበቀ ነው.",
  }
};


export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [activeSection, setActiveSection] = useState('');

  const t = translations[language];

  // Smooth scroll and active section highlight
  useEffect(() => {
    document.body.style.scrollBehavior = 'smooth';
    const handleScroll = () => {
      const sections = ['about', 'features', 'how', 'contact'];
      let found = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = id;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-indigo-100">
        <div className="flex items-center">
          <Image src="/favicon-32x32.png" alt="Smart Wound Logo" width={40} height={40} className="mr-3" />
          <span className="text-2xl font-extrabold tracking-tight text-indigo-700 drop-shadow-sm">{t.smartWound}</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => scrollToSection('about')} className={`transition font-medium px-2 py-1 rounded-lg ${activeSection === 'about' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-gray-600 hover:text-indigo-600'}`}>{t.about}</button>
          <button onClick={() => scrollToSection('features')} className={`transition font-medium px-2 py-1 rounded-lg ${activeSection === 'features' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-gray-600 hover:text-indigo-600'}`}>Features</button>
          <button onClick={() => scrollToSection('how')} className={`transition font-medium px-2 py-1 rounded-lg ${activeSection === 'how' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-gray-600 hover:text-indigo-600'}`}>How It Works</button>
          <button onClick={() => scrollToSection('contact')} className={`transition font-medium px-2 py-1 rounded-lg ${activeSection === 'contact' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-gray-600 hover:text-indigo-600'}`}>{t.contact}</button>
          <div className="inline-flex items-center mr-2 ml-2">
            <button
              onClick={() => setLanguage('am')}
              className={`font-semibold transition ${language === 'am' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              am
            </button>
            <span className="mx-2 text-gray-300">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`font-semibold transition ${language === 'en' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              en
            </button>
          </div>
          <button
            onClick={openLogin}
            className="text-indigo-600 font-semibold mr-2 hover:text-indigo-800 transition"
          >
            {t.logIn}
          </button>
          <button
            onClick={openSignup}
            className="bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-indigo-700 transition"
          >
            {t.getStarted}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-20 px-6 text-center bg-gradient-to-br from-indigo-50 to-blue-50">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.heroSubtitle}
          </p>
          <a
            onClick={openSignup}
            className="cursor-pointer bg-indigo-600 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:bg-indigo-700 transition-transform transform hover:scale-105 text-lg"
          >
            {t.startTracking}
          </a>
          <p className="text-sm text-gray-500 mt-4"></p>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Smart Wound</h2>
            <p className="text-lg text-gray-600 mb-4">
              Smart Wound is an AI-powered wound care companion designed to help you track healing, get safe guidance, and connect with support. Our mission is to empower anyone, anywhere to take control of their recovery journey with confidence and peace of mind.
            </p>
            <p className="text-md text-gray-500">
              We combine advanced image analysis, smart reminders, and a supportive AI assistant to make wound care simple, safe, and accessible for everyone.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.assistantTitle}</h2>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
                <div className="text-5xl mb-4">📸</div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{t.photoCheckTitle}</h3>
                <p className="text-gray-600">
                  {t.photoCheckDesc}
                </p>
              </div>
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{t.chatTitle}</h3>
                <p className="text-gray-600">
                  {t.chatDesc}
                </p>
              </div>
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
                <div className="text-5xl mb-4">📈</div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{t.trackerTitle}</h3>
                <p className="text-gray-600">
                  {t.trackerDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.howItWorksTitle}</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-indigo-200" aria-hidden="true"></div>
              <div className="space-y-12">
                <div className="flex items-center justify-center relative">
                  <div className="z-10 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                  <p className="ml-8 text-lg text-gray-700 w-1/2">
                    <span className="font-bold">{t.step1Title}</span> {t.step1Desc}
                  </p>
                </div>
                <div className="flex flex-row-reverse items-center justify-center relative">
                  <div className="z-10 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">2</div>
                  <p className="mr-8 text-lg text-gray-700 w-1/2 text-right">
                    <span className="font-bold">{t.step2Title}</span> {t.step2Desc}
                  </p>
                </div>
                <div className="flex items-center justify-center relative">
                  <div className="z-10 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">3</div>
                  <p className="ml-8 text-lg text-gray-700 w-1/2">
                    <span className="font-bold">{t.step3Title}</span> {t.step3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Disclaimer Section */}
        <section className="py-20 px-6 bg-red-50 border-t border-b border-red-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">{t.safetyTitle}</h2>
            <p className="text-red-700 text-lg">
              <span className="font-bold">{t.safetyDesc.split(',')[0]},</span>{t.safetyDesc.split(',').slice(1).join(',')}
            </p>
      </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-6">
              Have questions, feedback, or want to partner with us? Reach out below!
            </p>
            <a href="mailto:info@smartwound.com" className="inline-block bg-indigo-600 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-indigo-700 transition text-lg">
              info@smartwound.com
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/about" className="hover:text-indigo-600">{t.about}</Link>
            <Link href="/privacy" className="hover:text-indigo-600">{t.privacy}</Link>
            <Link href="/terms" className="hover:text-indigo-600">{t.terms}</Link>
            <Link href="/contact" className="hover:text-indigo-600">{t.contact}</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
        </div>
      </footer>
      <Modal open={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm onSwitchToSignup={openSignup} onSuccess={() => setShowLogin(false)} />
      </Modal>
      <Modal open={showSignup} onClose={() => setShowSignup(false)}>
        <SignupForm onSwitchToLogin={openLogin} onSuccess={() => setShowSignup(false)} />
      </Modal>
    </div>
  );
}
