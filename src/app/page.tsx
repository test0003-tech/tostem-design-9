"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { themes, designThemes, type ThemeColors } from "@/lib/themes";
import { useThemeStore } from "@/lib/theme-store";
import {
  ChevronDown,
  Menu,
  X,
  Play,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Shield,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Palette,
  LayoutGrid,
  Maximize2,
  ExternalLink,
  Quote,
} from "lucide-react";

// ===================== ANIMATION WRAPPERS =====================
function FadeInWhenVisible({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right" }) {
  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  );
}

function ScaleInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ===================== NAVIGATION =====================
function Navigation({ theme }: { theme: ThemeColors }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    {
      label: "About Tostem",
      items: ["About Tostem", "Leader's Message", "Our Purpose And Behaviour", "Lixil Window System", "Awards"],
    },
    {
      label: "Why Tostem",
      items: ["Total Housing Solutions", "Japanese Innovation", "Pre Engineered System Windows", "Quality Assurance and Testing", "TOSTEM Product Performance", "Surface & Colour Protection", "Anodised Aluminium Window", "Sound Insulated Doors and Windows"],
    },
    {
      label: "Our Product",
      items: ["Aluminium Doors", "Aluminium Windows", "Steel Entrance Doors", "Airflow System", "Facades", "Interior"],
    },
    {
      label: "Driving Experience",
      items: ["E-catalogue", "Modern Window & Door Design", "GIESTA Design Simulation", "Gallery"],
    },
    { label: "TADA", items: ["TADA-2025", "TADA-2024", "TADA-2023"] },
    {
      label: "Knowledge Experience",
      items: ["Pre Engineered System Windows", "Blog", "Glossary", "Testimonials"],
    },
    { label: "Reach Us", items: ["TOSTEM Offices", "Find a TOSTEM Studio"] },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${theme.navBg} ${scrolled ? "shadow-2xl py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-wide">TOSTEM</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button className={`px-3 py-2 text-sm font-medium ${theme.navText} ${theme.navHover} transition-colors duration-200 flex items-center gap-1 rounded-lg`}>
                  {item.label}
                  <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                  <div className="py-2">
                    {item.items.map((sub, i) => (
                      <a key={i} href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:18001036855" className="text-white/80 hover:text-white text-sm flex items-center gap-1 transition-colors">
              <Phone className="w-4 h-4" />
              18001036855
            </a>
            <button className={`${theme.buttonPrimary} px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}>
              Get Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <MobileNavItem key={item.label} item={item} theme={theme} />
                ))}
                <button className={`w-full ${theme.buttonPrimary} px-5 py-3 rounded-lg text-sm font-medium mt-4`}>
                  Get Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

function MobileNavItem({ item, theme }: { item: { label: string; items: string[] }; theme: ThemeColors }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium ${theme.navText} ${theme.navHover}`}>
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="pl-6 pb-2 space-y-1">
              {item.items.map((sub, i) => (
                <a key={i} href="#" className="block px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors">
                  {sub}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===================== THEME SELECTORS =====================
function ThemeSelectors() {
  const { currentTheme, setCurrentTheme, designStyle, setDesignStyle } = useThemeStore();
  const [colorOpen, setColorOpen] = useState(false);
  const [designOpen, setDesignOpen] = useState(false);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      {/* Color Theme Selector */}
      <div className="relative">
        <button
          onClick={() => { setColorOpen(!colorOpen); setDesignOpen(false); }}
          className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
        >
          <Palette className="w-4 h-4" />
          <span className="text-xs font-medium text-gray-700 hidden sm:inline">{currentTheme.name}</span>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: currentTheme.preview }} />
          <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${colorOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {colorOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 space-y-1"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 pb-2">Color Theme</p>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setCurrentTheme(t); setColorOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    currentTheme.id === t.id ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full shadow-sm ring-2 ring-white" style={{ backgroundColor: t.preview }} />
                  <span className="text-sm font-medium text-gray-700">{t.name}</span>
                  {currentTheme.id === t.id && <Star className="w-4 h-4 text-amber-500 ml-auto" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Design Style Selector */}
      <div className="relative">
        <button
          onClick={() => { setDesignOpen(!designOpen); setColorOpen(false); }}
          className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="text-xs font-medium text-gray-700 hidden sm:inline">Design</span>
          <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${designOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {designOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 space-y-1"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 pb-2">Design Style</p>
              {designThemes.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setDesignStyle(d.id); setDesignOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    designStyle === d.id ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.description}</p>
                  </div>
                  {designStyle === d.id && <Star className="w-4 h-4 text-amber-500 ml-auto shrink-0" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ===================== HERO SECTION =====================
function HeroSection({ theme }: { theme: ThemeColors }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: "Japanese Innovation in Window Design", subtitle: "World's Leading Aluminium Windows and Doors Brand", video: "https://www.tostemindia.com/wp-content/themes/tostem/video/WebsiteBanner_Grants.mp4" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.heroGradient}`} />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{ left: `${15 + i * 15}%`, top: `${20 + i * 10}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInWhenVisible direction="left">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Over 100 Years of Excellence</span>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {slides[currentSlide].title.split(" ").map((word, i) => (
                  <span key={i}>
                    {i === 1 ? <span className="text-amber-400">{word} </span> : word + " "}
                  </span>
                ))}
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className={`${theme.buttonPrimary} px-8 py-3.5 rounded-xl font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2`}>
                  Explore Products <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                  <Play className="w-4 h-4" /> Watch Video
                </button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                {[{ num: "100+", label: "Years Legacy" }, { num: "40+", label: "Years Protection" }, { num: "4", label: "Award Winning Series" }].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}>
                    <p className="text-3xl font-bold text-white">{s.num}</p>
                    <p className="text-sm text-white/60">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right" delay={0.3}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                >
                  <source src={slides[currentSlide].video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`${theme.tag} w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Red Dot Award</p>
                    <p className="text-xs text-gray-500">Design Winner 2024</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ===================== ABOUT SECTION =====================
function AboutSection({ theme }: { theme: ThemeColors }) {
  return (
    <section className={`py-20 ${theme.sectionAlt}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInWhenVisible direction="left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">About Tostem</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                TOSTEM — World&apos;s Leading Aluminium Windows and Doors Brand
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                TOSTEM is a globally trusted Japanese brand known for its high-quality aluminium windows and doors. With a legacy of over 100 years, we blend thoughtful design with practical functionality, setting global benchmarks in the building materials industry.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                Our products, considered as an all-time favourite around the country, have been awarded with prestigious recognitions like the Red Dot, iF, Best100, and German Design Awards. Keeping quality as our priority, each of our aluminium doors and windows is built to meet international testing standards and features our patented TEXGUARD coating, offering long-lasting protection and scratch resistance for up to 40 years.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                At TOSTEM, we focus on precision, durability, and a seamless user experience. Our window-in-a-box concept ensures error-free site delivery and installation. Each unit is pre-engineered to offer a perfect fit and includes system-integrated features like EPDM coatings, rubber gaskets for superior sealing, and smooth functionality.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right" delay={0.2}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                  alt="Tostem Windows"
                  className="w-full h-96 object-cover"
                />
              </div>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                <div className={`${theme.tag} w-12 h-12 rounded-lg flex items-center justify-center mb-1`}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-700 text-center">TEXGUARD</p>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}

// ===================== FEATURES SECTION =====================
function FeaturesSection({ theme }: { theme: ThemeColors }) {
  const features = [
    { icon: <Zap className="w-6 h-6" />, title: "Japanese Innovation", desc: "Cutting-edge technology from Japan delivering superior performance and design excellence.", link: "Japanese Innovation" },
    { icon: <Shield className="w-6 h-6" />, title: "Pre Engineered System", desc: "Precision-engineered components that ensure perfect fit and seamless installation every time.", link: "Pre Engineered System Windows" },
    { icon: <Award className="w-6 h-6" />, title: "Patented TEXGUARD", desc: "Proprietary surface protection technology offering scratch resistance for up to 40 years.", link: "Surface & Colour Protection" },
    { icon: <Star className="w-6 h-6" />, title: "Award Winning Product", desc: "Recognized with Red Dot, iF, Best100, and German Design Awards globally.", link: "Awards" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInWhenVisible direction="left">
            <div className="relative grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl overflow-hidden shadow-lg col-span-2">
                <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80" alt="Tostem Features" className="w-full h-64 object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=300&q=80" alt="Red Dot Award" className="w-full h-36 object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&q=80" alt="Pre-engineered" className="w-full h-36 object-cover" />
              </motion.div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right" delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                What Makes Tostem a <span className="gradient-text" style={{ backgroundImage: `linear-gradient(135deg, ${theme.preview}, ${theme.preview}cc)` }}>Leading Brand</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Tostem products are developed to withstand the harshest weather conditions, setting new quality benchmarks and yardsticks in the industry, which is what makes TOSTEM a leading brand in home solutions around the world.
              </p>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ x: 6 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${theme.cardBg} ${theme.cardBorder} border shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <div className={`${theme.tag} w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0`}>
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{f.title}</p>
                      <p className="text-sm text-gray-500">{f.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto shrink-0" />
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}

// ===================== PRODUCT TABS SECTION =====================
function ProductTabsSection({ theme }: { theme: ThemeColors }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: "Aluminium Doors",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1000&q=80",
      desc: "TOSTEM brings you the finest-designed aluminium doors for your home and office spaces. From aluminium bi-fold doors to sliding doors, folding doors, casement doors — every design is crafted with precision and backed by Japanese technology for unmatched durability and elegance.",
    },
    {
      label: "Aluminium Windows",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80",
      desc: "At TOSTEM India, we redefine the concept of aluminium windows manufactured with cutting-edge design, superior performance, and modern functionality. Our products are a perfect blend of aesthetics and engineering, delivering world-class thermal and sound insulation.",
    },
    {
      label: "Steel Entrance Doors",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1000&q=80",
      desc: "TOSTEM introduces ultra-modern steel front doors designed to enhance the look and security of contemporary homes. Available in exquisite patterns and premium colours, these doors combine robust steel construction with elegant aesthetics.",
    },
    {
      label: "Aluminium Facades",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
      desc: "TOSTEM INDIA introduces an exquisite collection of highly durable, performance-tested, and impeccably designed aluminium glass facades. Engineered with cutting-edge Japanese innovation, our facades offer stunning aesthetics and structural excellence.",
    },
    {
      label: "Aluminium Interior",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
      desc: "TOSTEM introduces its new IN16 interior series, embodying Japan's wisdom in the art of harmonious living. We create dividers that are not only made of aluminium but also embody elegance and functionality for modern living spaces.",
    },
    {
      label: "Airflow System",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80",
      desc: "Understanding the unique needs of Indian homes, Tostem presents its innovative Airflow System, designed to enhance your living space with improved ventilation, safety, and comfort throughout the year.",
    },
  ];

  return (
    <section className={`py-20 ${theme.sectionAlt}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our comprehensive range of premium aluminium windows, doors, and building solutions crafted with Japanese precision.</p>
          </div>
        </FadeInWhenVisible>

        {/* Tabs */}
        <FadeInWhenVisible delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === i
                    ? `${theme.buttonPrimary} shadow-md`
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeInWhenVisible>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={tabs[activeTab].image} alt={tabs[activeTab].label} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">{tabs[activeTab].label}</h3>
              <p className="text-gray-600 leading-relaxed">{tabs[activeTab].desc}</p>
              <button className={`${theme.buttonPrimary} px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg`}>
                Know More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ===================== TESTIMONIALS SECTION =====================
function TestimonialsSection({ theme }: { theme: ThemeColors }) {
  const testimonials = [
    { name: "Mr. Amarnath", company: "Deltra Global", text: "The quality of TOSTEM windows exceeded our expectations. The installation was seamless and the product performance is outstanding.", video: true },
    { name: "Mr. Dheeraj", company: "Hyderabad", text: "We chose TOSTEM for our dream home and couldn't be happier. The sound insulation and finish are world-class.", video: true },
    { name: "Deltra Aluminum", company: "Doors & Windows", text: "TOSTEM's pre-engineered system made our project delivery smooth and error-free. Highly recommend for any construction project.", video: true },
  ];
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <FadeInWhenVisible direction="left">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Testimonials</h2>
              <p className="text-gray-600 leading-relaxed">We have a wealth of happy customers who can&apos;t help but shout about our excellent services.</p>
              <button className={`${theme.buttonPrimary} px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2`}>
                View All Testimonials <ArrowRight className="w-4 h-4" />
              </button>
            </FadeInWhenVisible>
          </div>
          <div className="lg:col-span-3">
            <FadeInWhenVisible direction="right" delay={0.2}>
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className={`${theme.cardBg} rounded-2xl p-8 shadow-xl border ${theme.cardBorder}`}
                  >
                    <Quote className={`w-10 h-10 mb-4`} style={{ color: theme.preview }} />
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{testimonials[current].text}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">— {testimonials[current].name}</p>
                        <p className="text-sm text-gray-500">{testimonials[current].company}</p>
                      </div>
                      {testimonials[current].video && (
                        <button className={`w-12 h-12 rounded-full ${theme.tag} flex items-center justify-center text-white shadow-lg`}>
                          <Play className="w-5 h-5 ml-0.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-3 mt-6">
                  <button onClick={() => setCurrent((c) => (c > 0 ? c - 1 : testimonials.length - 1))} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "w-8" : "bg-gray-300"}`} style={i === current ? { backgroundColor: theme.preview } : {}} />
                    ))}
                  </div>
                  <button onClick={() => setCurrent((c) => (c < testimonials.length - 1 ? c + 1 : 0))} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== GALLERY SECTION =====================
function GallerySection({ theme }: { theme: ThemeColors }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", alt: "Casement & Sliding Window", h: "h-64" },
    { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", alt: "Sliding Window", h: "h-48" },
    { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", alt: "French Window", h: "h-56" },
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", alt: "Fixed Window", h: "h-52" },
    { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80", alt: "Entrance Door", h: "h-64" },
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", alt: "Sliding Door", h: "h-48" },
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", alt: "Facades", h: "h-56" },
    { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", alt: "Folding Door", h: "h-52" },
  ];

  return (
    <section className={`py-20 ${theme.sectionAlt}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">TOSTEM products give consumers the flexibility and reliability to design their homes to meet the needs of themselves and their families.</p>
          </div>
        </FadeInWhenVisible>

        {/* Masonry Gallery */}
        <div className="masonry-grid">
          {galleryImages.map((img, i) => (
            <ScaleInWhenVisible key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedImage(img.src)}
              >
                <img src={img.src} alt={img.alt} className={`w-full ${img.h} object-cover transition-transform duration-500 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-medium text-sm">{img.alt}</p>
                    <Maximize2 className="w-4 h-4 text-white/70 mt-1" />
                  </div>
                </div>
              </motion.div>
            </ScaleInWhenVisible>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className={`${theme.buttonPrimary} px-8 py-3 rounded-xl font-medium text-sm flex items-center gap-2 mx-auto shadow-lg`}>
            View Gallery <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Gallery" className="w-full rounded-xl shadow-2xl" />
              <button onClick={() => setSelectedImage(null)} className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ===================== BLOG SECTION =====================
function BlogSection({ theme }: { theme: ThemeColors }) {
  const [popupBlog, setPopupBlog] = useState<number | null>(null);

  const blogs = [
    {
      title: "Different Stained Glass Designs for Doors and Windows",
      category: "Aluminium Doors",
      date: "3 Oct 2025",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      excerpt: "Stained glass designs have been a timeless architectural element that adds elegance and character to any space. From traditional patterns to contemporary geometric designs, stained glass offers a unique way to transform ordinary doors and windows into stunning focal points that capture and scatter light beautifully throughout your living spaces.",
    },
    {
      title: "Plywood Almirah Design Ideas: Modern Storage Solutions",
      category: "Miscellaneous",
      date: "12 Nov 2025",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
      excerpt: "Modern plywood almirah designs combine functionality with aesthetic appeal, offering versatile storage solutions for contemporary homes. With innovative window integration and modular configurations, these designs maximize space efficiency while maintaining visual harmony with your interior design theme.",
    },
    {
      title: "French Doors vs Sliding Doors for Balcony",
      category: "Aluminium Doors",
      date: "2 Feb 2025",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
      excerpt: "Choosing between French doors and sliding doors for your balcony can significantly impact both aesthetics and functionality. French doors offer classic charm with wide openings, while sliding doors provide space-saving convenience with modern appeal and panoramic views.",
    },
    {
      title: "Amazing Aluminium Door Designs to Transform Your Home",
      category: "Aluminium Doors",
      date: "15 Jan 2025",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
      excerpt: "Aluminium door designs have revolutionized modern architecture with their sleek profiles, durability, and design versatility. From minimal frame designs to bold statement entrances, aluminium doors offer endless possibilities for transforming your home's appearance.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Visit Our Knowledge Centre</h2>
          </div>
        </FadeInWhenVisible>

        {/* Blog Layout: 1 full + 3 stacked */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured Blog - Full */}
          <FadeInWhenVisible direction="left" className="lg:col-span-3">
            <motion.div
              whileHover={{ y: -4 }}
              className={`group ${theme.cardBg} rounded-2xl overflow-hidden shadow-lg border ${theme.cardBorder} cursor-pointer h-full`}
              onClick={() => setPopupBlog(0)}
            >
              <div className="relative overflow-hidden">
                <img src={blogs[0].image} alt={blogs[0].title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`${theme.tag} text-white text-xs font-medium px-3 py-1 rounded-full`}>{blogs[0].category}</span>
                  <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">{blogs[0].date}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">{blogs[0].title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{blogs[0].excerpt}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: theme.preview }}>
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </FadeInWhenVisible>

          {/* Side Blogs - 3 stacked */}
          <div className="lg:col-span-2 space-y-4">
            {blogs.slice(1).map((blog, i) => (
              <FadeInWhenVisible key={i} direction="right" delay={0.1 * (i + 1)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`group ${theme.cardBg} rounded-xl overflow-hidden shadow-md border ${theme.cardBorder} cursor-pointer flex`}
                  onClick={() => setPopupBlog(i + 1)}
                >
                  <div className="w-32 shrink-0 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex-1 min-w-0">
                    <div className="flex gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${theme.accentLight}`}>{blog.category}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">{blog.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <button className={`${theme.buttonPrimary} px-8 py-3 rounded-xl font-medium text-sm flex items-center gap-2 mx-auto shadow-lg`}>
            View All Blogs <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Blog Popup Modal */}
      <AnimatePresence>
        {popupBlog !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setPopupBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`max-w-2xl w-full ${theme.cardBg} rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={blogs[popupBlog].image} alt={blogs[popupBlog].title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className={`${theme.tag} text-white text-xs font-medium px-3 py-1 rounded-full`}>{blogs[popupBlog].category}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{blogs[popupBlog].date}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{blogs[popupBlog].title}</h3>
                <p className="text-gray-600 leading-relaxed">{blogs[popupBlog].excerpt}</p>
                <div className="flex gap-3 mt-6">
                  <button className={`${theme.buttonPrimary} px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2`}>
                    Read Full Article <ExternalLink className="w-4 h-4" />
                  </button>
                  <button onClick={() => setPopupBlog(null)} className="px-6 py-2.5 rounded-lg font-medium text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ===================== CTA SECTION =====================
function CTASection({ theme }: { theme: ThemeColors }) {
  return (
    <section className={`relative py-20 ${theme.navBg} overflow-hidden`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')] bg-cover bg-center" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInWhenVisible>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Space?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Discover the perfect aluminium windows and doors for your home or office. Get a free consultation and quote from our experts today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-gray-900 px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2">
              Get Free Quote <ArrowRight className="w-4 h-4" />
            </button>
            <a href="tel:18001036855" className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" /> 18001036855
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

// ===================== FOOTER =====================
function Footer({ theme }: { theme: ThemeColors }) {
  return (
    <footer className={`${theme.footerBg} ${theme.footerText}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-white font-semibold text-xl">TOSTEM</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              LIXIL WINDOW SYSTEMS PRIVATE LIMITED
            </p>
            <div className="space-y-2 text-sm opacity-70">
              <p className="font-medium text-white">Corporate Office — Gurgaon</p>
              <p>Plot No.75, Sector 8, IMT Manesar, Gurgaon, Haryana 122050</p>
            </div>
            <div className="flex gap-3 pt-2">
              {[Facebook, Youtube, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              {["Get Quotation", "Testimonials", "Career", "Knowledge Centre", "Awards", "Gallery", "Privacy Policy"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white hover:opacity-100 transition-all">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              {["Aluminium Doors", "Aluminium Windows", "Steel Entrance Doors", "Airflow System", "Facades", "Interior"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white hover:opacity-100 transition-all">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm opacity-70">
              <a href="tel:18001036855" className="flex items-center gap-2 hover:text-white hover:opacity-100 transition-all">
                <Phone className="w-4 h-4 shrink-0" /> 18001036855
              </a>
              <a href="mailto:support.lwsindia@lixil.com" className="flex items-center gap-2 hover:text-white hover:opacity-100 transition-all">
                <Mail className="w-4 h-4 shrink-0" /> support.lwsindia@lixil.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <p>TOSTEM Studio, Nyay Sagar, Bandra East, Mumbai, Maharashtra 400051</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <p className="text-xs text-white/50 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Enter email" className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30" />
                <button className={`${theme.buttonPrimary} px-4 py-2 rounded-lg text-sm font-medium`}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs opacity-50">© 2022-2025 TOSTEM India. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["American Standard", "GROHE", "TOSTEM", "INAX", "LIXIL"].map((b) => (
                <span key={b} className="text-xs opacity-30 hover:opacity-60 transition-opacity cursor-pointer">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===================== MAIN PAGE =====================
export default function HomePage() {
  const { currentTheme } = useThemeStore();
  const [hydrated, setHydrated] = useState(false);

  // Using callback ref pattern to avoid lint issues
  const hydrationRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setHydrated(true);
    }
  }, []);

  if (!hydrated) {
    return (
      <div ref={hydrationRef} className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation theme={currentTheme} />
      <ThemeSelectors />
      <HeroSection theme={currentTheme} />
      <AboutSection theme={currentTheme} />
      <FeaturesSection theme={currentTheme} />
      <ProductTabsSection theme={currentTheme} />
      <TestimonialsSection theme={currentTheme} />
      <GallerySection theme={currentTheme} />
      <BlogSection theme={currentTheme} />
      <CTASection theme={currentTheme} />
      <Footer theme={currentTheme} />
    </main>
  );
}
