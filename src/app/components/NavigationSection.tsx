import Image from "next/image";
import Link from "next/link";

export const NavigationSection = () => {
  return (
    <div className="bg-in-cyan pb-10 md:pb-16 lg:pb-20">
      <section className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between pt-8">
          <Image 
            src="/svg/logo-insalud.svg" 
            alt="Insalud Quito" 
            width={200} 
            height={36} 
            className="w-36"
          />
          <nav>
            <ul className="flex font-in-nunito items-center gap-6 text-in-blue font-medium text-lg">
              <li className="hidden sm:block font-semibold">
                <Link href="/">Beneficios</Link>
              </li>
              <li className="hidden sm:block font-semibold">
                <Link href="/">Preguntas Frecuentes</Link>
              </li>
              <nav>
                <ul className="flex items-center gap-4">
                  <li>
                    <Link href="/">
                      <Image src="/svg/socials/instagram.svg" alt="Instagram" width={26} height={26} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <Image src="/svg/socials/tiktok.svg" alt="TikTok" width={26} height={26} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <Image src="/svg/socials/facebook.svg" alt="Facebook" width={26} height={26} />
                    </Link>
                  </li>
                </ul>
              </nav>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  )
}
