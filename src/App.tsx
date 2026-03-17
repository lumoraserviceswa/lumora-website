import { useEffect, useRef, useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown,
  Menu,
  X,
  Zap,
  Droplets,
  Sparkles,
  Wrench,
  Car,
  Ruler,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Gold Badge Component
const GoldBadge = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 160 160" className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C547" />
          <stop offset="50%" stopColor="#D4A03A" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="75" fill="url(#goldGradient)" />
      <circle cx="80" cy="80" r="68" fill="none" stroke="#0B0C0E" strokeWidth="1" opacity="0.3" />
      <path
        id="textPath"
        d="M 80, 80 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
        fill="none"
      />
      <text className="text-[10px] md:text-[11px] font-semibold uppercase tracking-widest">
        <textPath href="#textPath" fill="#0B0C0E">
          {text}
        </textPath>
      </text>
    </svg>
  </div>
);

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0B0C0E]/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <button onClick={() => scrollToSection('hero')} className="text-xl md:text-2xl font-bold tracking-wider text-white">
            LUMORA
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-sm text-white/80 hover:text-[#D4A03A] transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm text-white/80 hover:text-[#D4A03A] transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm text-white/80 hover:text-[#D4A03A] transition-colors">
              Contact
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0C0E]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          <button onClick={() => scrollToSection('services')} className="text-2xl text-white hover:text-[#D4A03A] transition-colors">
            Services
          </button>
          <button onClick={() => scrollToSection('about')} className="text-2xl text-white hover:text-[#D4A03A] transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-2xl text-white hover:text-[#D4A03A] transition-colors">
            Contact
          </button>
        </div>
      )}
    </>
  );
};

// Floating Contact Bar
const ContactBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}>
      <a 
        href="mailto:lumora.serviceswa@gmail.com"
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#D4A03A] hover:text-[#0B0C0E] transition-all"
      >
        <Mail size={20} />
      </a>
      <Dialog>
        <DialogTrigger asChild>
          <button className="gold-btn flex items-center gap-2">
            <span>Book Now</span>
            <ArrowRight size={16} />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#0B0C0E] border-[#D4A03A]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#D4A03A]">Book a Service</DialogTitle>
          </DialogHeader>
          <BookingForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Booking Form Component
const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-[#D4A03A] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Request Sent!</h3>
        <p className="text-white/70">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="text-sm text-white/70 mb-1 block">Name</label>
        <Input placeholder="Your name" className="bg-white/5 border-white/20 text-white placeholder:text-white/40" required />
      </div>
      <div>
        <label className="text-sm text-white/70 mb-1 block">Phone</label>
        <Input placeholder="Your phone number" className="bg-white/5 border-white/20 text-white placeholder:text-white/40" required />
      </div>
      <div>
        <label className="text-sm text-white/70 mb-1 block">Service</label>
        <Select>
          <SelectTrigger className="bg-white/5 border-white/20 text-white">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent className="bg-[#0B0C0E] border-white/20">
            <SelectItem value="electrical">Electrical</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="detailing">Car Detailing</SelectItem>
            <SelectItem value="mechanical">Mechanical</SelectItem>
            <SelectItem value="driver">Private Driver</SelectItem>
            <SelectItem value="design">Design & Build</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm text-white/70 mb-1 block">Message</label>
        <Textarea placeholder="Tell us what you need..." className="bg-white/5 border-white/20 text-white placeholder:text-white/40" rows={3} />
      </div>
      <button type="submit" className="gold-btn w-full">
        Send Request
      </button>
    </form>
  );
};

// Hero Section
const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="section-pinned">
      {/* Background Image */}
      <div className={`absolute inset-0 transition-all duration-1000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
        <img 
          src="/hero_home_interior.jpg" 
          alt="Premium home interior" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlays */}
      <div className="absolute inset-0 vignette-overlay" />
      <div className="absolute inset-0 grain-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/40 via-transparent to-[#0B0C0E]/60" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`headline-xl text-white mb-6 transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            One Number.<br />Every Service.
          </h1>
          <p className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 transition-all duration-700 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            From routine repairs to full renovations—Lumora keeps your home, vehicles, and schedule running without the hassle of multiple calls.
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Dialog>
              <DialogTrigger asChild>
                <button className="gold-btn">
                  Book a Visit
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#0B0C0E] border-[#D4A03A]/30 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#D4A03A]">Book a Service</DialogTitle>
                </DialogHeader>
                <BookingForm />
              </DialogContent>
            </Dialog>
            <button onClick={scrollToServices} className="outline-btn">
              See Services
            </button>
          </div>
        </div>
        
        {/* Scroll Hint */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-800 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <button onClick={scrollToServices} className="flex flex-col items-center text-white/60 hover:text-white transition-colors">
            <span className="micro-label mb-2">Scroll to explore</span>
            <ChevronDown className="animate-bounce" size={20} />
          </button>
        </div>
      </div>
      
      {/* Gold Badge */}
      <div className={`absolute top-24 right-6 md:right-12 lg:right-16 transition-all duration-700 delay-700 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}>
        <GoldBadge text="LUMORA • EST. 2020 • LUMORA • EST. 2020 •" />
      </div>
    </section>
  );
};

// Service Section Component
const ServiceSection = ({ 
  id, 
  title, 
  description, 
  cta, 
  badgeText, 
  image, 
  icon: Icon,
  reverse = false 
}: { 
  id: string;
  title: string;
  description: string;
  cta: string;
  badgeText: string;
  image: string;
  icon: React.ElementType;
  reverse?: boolean;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="section-pinned"
    >
      {/* Background Image */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
      }`}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlays */}
      <div className="absolute inset-0 vignette-overlay" />
      <div className="absolute inset-0 grain-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/80 via-[#0B0C0E]/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className={`w-full px-6 md:px-12 lg:px-20 ${reverse ? 'ml-auto text-right' : ''}`}>
          <div className={`max-w-xl ${reverse ? 'ml-auto' : ''}`}>
            {/* Icon */}
            <div className={`mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4A03A]/20 border border-[#D4A03A]/40">
                <Icon className="w-6 h-6 text-[#D4A03A]" />
              </div>
            </div>
            
            {/* Title */}
            <h2 className={`headline-lg text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}>
              {title}
            </h2>
            
            {/* Description */}
            <p className={`text-lg text-white/80 mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {description}
            </p>
            
            {/* CTA */}
            <div className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="gold-btn">
                    {cta}
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#0B0C0E] border-[#D4A03A]/30 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#D4A03A]">Book {title}</DialogTitle>
                  </DialogHeader>
                  <BookingForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gold Badge */}
      <div className={`absolute top-24 right-6 md:right-12 lg:right-16 transition-all duration-700 delay-400 ${
        isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'
      }`}>
        <GoldBadge text={badgeText} />
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: CheckCircle, title: 'Licensed & Insured', desc: 'All work fully guaranteed' },
    { icon: Clock, title: 'On-Time Service', desc: 'We respect your schedule' },
    { icon: Star, title: 'Premium Quality', desc: 'Attention to every detail' },
    { icon: Phone, title: 'One Call Does All', desc: 'Single point of contact' },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen bg-[#0B0C0E] py-24"
    >
      <div className="absolute inset-0 grain-overlay opacity-30" />
      
      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className={`micro-label text-[#D4A03A] mb-4 block transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                About Lumora
              </span>
              <h2 className={`headline-lg text-white mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                One Number.<br />All Services.
              </h2>
              <p className={`text-lg text-white/70 mb-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                Lumora Services is Perth&apos;s premier multi-service concierge. From electrical and plumbing to car detailing, mechanical work, private driving, and design-build projects—we handle it all.
              </p>
              <p className={`text-white/70 mb-8 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                Serving Perth and the South West region of Western Australia, we bring premium craftsmanship and white-glove service to every job, big or small.
              </p>
              
              <div className={`transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="gold-btn">
                      Get in Touch
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0B0C0E] border-[#D4A03A]/30 text-white max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#D4A03A]">Contact Us</DialogTitle>
                    </DialogHeader>
                    <BookingForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {/* Right Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A03A]/40 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <feature.icon className="w-8 h-8 text-[#D4A03A] mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Perth CBD',
      rating: 5,
      text: 'Lumora handled our home renovation from start to finish. Electrical, plumbing, and even the final detailing—they were incredible. One call really does do it all!'
    },
    {
      name: 'James T.',
      location: 'South Perth',
      rating: 5,
      text: 'Had my car detailed and serviced in the same day. The quality of work is outstanding. These guys are true professionals.'
    },
    {
      name: 'Emily R.',
      location: 'Fremantle',
      rating: 5,
      text: 'Used their private driver service for a corporate event. Punctual, professional, and the car was immaculate. Highly recommend!'
    },
    {
      name: 'Michael K.',
      location: 'Cottesloe',
      rating: 5,
      text: 'From blueprint to finished extension, Lumora made our dream home a reality. Their attention to detail is unmatched.'
    },
    {
      name: 'Lisa P.',
      location: 'Subiaco',
      rating: 5,
      text: 'Emergency plumbing fixed within hours. Fair pricing and exceptional service. Lumora is now my go-to for everything!'
    },
    {
      name: 'David W.',
      location: 'Claremont',
      rating: 5,
      text: 'The electrical work in our new kitchen was flawless. Clean, efficient, and they left the place spotless. Five stars!'
    }
  ];

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="relative py-24 bg-[#0B0C0E]"
    >
      <div className="absolute inset-0 grain-overlay opacity-30" />
      
      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className={`micro-label text-[#D4A03A] mb-4 block transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Testimonials
            </span>
            <h2 className={`headline-lg text-white transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              What Our Clients Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A03A]/30 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4A03A] text-[#D4A03A]" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 text-sm leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4A03A]/20 flex items-center justify-center">
                    <span className="text-[#D4A03A] font-semibold text-sm">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-white/50 text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen contact-paper py-24"
    >
      <div className="absolute inset-0 grain-overlay opacity-20" />
      
      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Content */}
            <div>
              <span className={`micro-label text-[#B8860B] mb-4 block transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                Get in Touch
              </span>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B0C0E] mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                Ready When<br />You Are.
              </h2>
              <p className={`text-lg text-[#0B0C0E]/70 mb-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                Tell us what you need. We&apos;ll confirm availability and show up on time.
              </p>
              
              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className={`flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-[#0B0C0E]/10 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-[#D4A03A]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#B8860B]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#0B0C0E]/60">Email</p>
                    <a href="mailto:lumora.serviceswa@gmail.com" className="text-[#0B0C0E] font-medium hover:text-[#B8860B] transition-colors">
                      lumora.serviceswa@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className={`flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-[#0B0C0E]/10 transition-all duration-700 delay-400 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-[#D4A03A]/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#B8860B]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#0B0C0E]/60">Service Area</p>
                    <p className="text-[#0B0C0E] font-medium">Perth & South West WA</p>
                  </div>
                </div>
                
                <div className={`flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-[#0B0C0E]/10 transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-[#D4A03A]/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#B8860B]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#0B0C0E]/60">Hours</p>
                    <p className="text-[#0B0C0E] font-medium">Mon–Sat 7am–7pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Form */}
            <div className={`bg-white rounded-2xl p-8 shadow-xl border border-[#0B0C0E]/10 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h3 className="text-2xl font-bold text-[#0B0C0E] mb-6">Request a Callback</h3>
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-[#0B0C0E] border-t border-white/10 py-12">
    <div className="px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">LUMORA</h3>
            <p className="text-white/60 text-sm">One Number. Every Service.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="mailto:lumora.serviceswa@gmail.com" className="text-white/60 hover:text-[#D4A03A] transition-colors">
              <Mail size={20} />
            </a>
            <span className="text-white/40">|</span>
            <span className="text-white/60 text-sm">Perth & South West WA</span>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Lumora Services. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// Main App
function App() {
  return (
    <div className="relative">
      <Navigation />
      <ContactBar />
      
      <main className="relative">
        <HeroSection />
        
        <div id="services">
          <ServiceSection
            id="electrical"
            title="Electrical"
            description="Safety-first wiring, upgrades, and repairs—done neatly, certified, and on time."
            cta="Book an Electrician"
            badgeText="LUMORA • SPARK • LUMORA • SPARK •"
            image="/service_electrician.jpg"
            icon={Zap}
          />
          
          <ServiceSection
            id="plumbing"
            title="Plumbing"
            description="Leaks, installs, pressure fixes, and full bathroom fit-outs—tidy workmanship guaranteed."
            cta="Book a Plumber"
            badgeText="LUMORA • FLOW • LUMORA • FLOW •"
            image="/service_plumbing.jpg"
            icon={Droplets}
          />
          
          <ServiceSection
            id="detailing"
            title="Detailing"
            description="Paint correction, ceramic protection, and interior finishes that feel new—every time."
            cta="Book Detailing"
            badgeText="LUMORA • SHINE • LUMORA • SHINE •"
            image="/service_detailing.jpg"
            icon={Sparkles}
          />
          
          <ServiceSection
            id="mechanical"
            title="Mechanical"
            description="Servicing, brakes, diagnostics, and pre-trip checks—straight talk, fair pricing."
            cta="Book Mechanical"
            badgeText="LUMORA • TORQUE • LUMORA • TORQUE •"
            image="/service_mechanical.jpg"
            icon={Wrench}
          />
          
          <ServiceSection
            id="driver"
            title="Private Driver"
            description="Punctual, discreet, and polished—arrive ready, relaxed, and on schedule."
            cta="Reserve a Driver"
            badgeText="LUMORA • RIDE • LUMORA • RIDE •"
            image="/service_chauffeur.jpg"
            icon={Car}
          />
          
          <ServiceSection
            id="design"
            title="Design & Build"
            description="Drafting, permits, and construction management—one team from idea to finished space."
            cta="Start a Project"
            badgeText="LUMORA • BUILD • LUMORA • BUILD •"
            image="/service_design_build.jpg"
            icon={Ruler}
          />
        </div>
        
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
