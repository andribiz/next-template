import { siteConfig } from "@/config/site";
import { buttonVariants } from "@template/ui/button";
import { cn } from "@template/ui/lib";
import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-label="hero not_found" className="mt-12 w-full md:mt-32">
      <div className="container flex flex-col items-center gap-6 text-center">
        <h1 className="animate-fade-up font-extrabold font-urbanist text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Oops! Ini Aneh.
          <br />
          <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text font-extrabold text-transparent">
            {siteConfig.name}
          </span>
        </h1>

        <h3 className="max-w-[54rem] animate-fade-up text-muted-foreground sm:text-xl sm:leading-8">
          Tidak dapat Menemukan Link undanganmu
        </h3>

        <div className="z-10 flex animate-fade-up flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "md:hover:-translate-y-2 transition-all duration-1000 ease-out",
            )}
          >
            Bawa aku kembali
          </Link>
        </div>
      </div>
    </section>
  );
}
