"use client"
import { cdn } from "@/utils/cdn";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger) 

type NavigationLink = {
  label: string;
  href: string;
  isAnchor?: boolean;
}

type NavigationSectionProps = {
  links?: NavigationLink[];
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
}

export const NavigationSection = ({ 
  links = [
    { label: "Beneficios", href: "#beneficios", isAnchor: true },
    { label: "Preguntas Frecuentes", href: "#preguntas", isAnchor: true }
  ],
  socialLinks = {
    instagram: "/",
    tiktok: "/", 
    facebook: "/"
  }
}: NavigationSectionProps) => {

  const navigationRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    gsap.set(navigationRef.current, {
      opacity: 0,
      y: 100,
    })

    gsap.to(navigationRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.0,
    })

    gsap.to(navigationRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: navigationRef.current,
        start: "top 90%",
        toggleActions: "play reverse play reverse"
      }
    });
  });

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <div className="bg-in-cyan pb-10 md:pb-16 lg:pb-20">
      <section ref={navigationRef} className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between pt-8">
          <Image 
            src={cdn('/shared/logos/insalud-jesus-maria.svg')} 
            alt="Insalud Jesus Maria" 
            width={200} 
            height={36} 
            className="sm:w-64"
          />
          <nav>
            <ul className="flex font-in-nunito items-center gap-6 text-in-blue font-medium text-lg">
              {links.map((link, index) => (
                <li key={index} className="hidden md:block font-semibold">
                  <Link 
                    href={link.href}
                    onClick={(e) => link.isAnchor && handleAnchorClick(e, link.href)}
                    className="hover:text-in-cyan-base transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <nav>
                <ul className="flex items-center gap-4">
                  {socialLinks.instagram && (
                    <li>
                      <Link href={socialLinks.instagram}>
                        <Image 
                          src={cdn('/shared/iconos/instagram.svg')} 
                          alt="Instagram" 
                          width={26} 
                          height={26} 
                        />
                      </Link>
                    </li>
                  )}
                  {socialLinks.tiktok && (
                    <li>
                      <Link href={socialLinks.tiktok}>
                        <Image 
                          src={cdn('/shared/iconos/tiktok.svg')} 
                          alt="TikTok" 
                          width={26} 
                          height={26} 
                        />
                      </Link>
                    </li>
                  )}
                  {socialLinks.facebook && (
                    <li>
                      <Link href={socialLinks.facebook}>
                        <Image 
                          src={cdn('/shared/iconos/fb.svg')} 
                          alt="Facebook" 
                          width={26} 
                          height={26} 
                        />
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  )
}
