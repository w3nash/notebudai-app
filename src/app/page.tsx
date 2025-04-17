import { auth } from "@/server/auth";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { CTA } from "@/components/landing/cta";

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="flex min-h-screen flex-col [background:radial-gradient(145%_125%_at_50%_10%,#f5f3ff_50%,#8e51ff_100%)] dark:[background:radial-gradient(145%_125%_at_50%_10%,#000_50%,#7f22fe_100%)]">
      {/* Header */}
      <Header isAuthenticated={isAuthenticated} />
      {/* Main */}
      <main className="flex flex-col pt-8 md:pt-18 lg:pt-20">
        {/* Hero Section */}
        <Hero />
        {/* Features Section */}
        <Features />
        {/* How It Works Section */}
        <HowItWorks />
        {/* CTA Section */}
        <CTA />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
