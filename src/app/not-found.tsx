import { Header } from "@/components/login/header";
import { Footer } from "@/components/login/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const metadata = {
  title: "Not Found",
};

export default async function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col [background:radial-gradient(145%_125%_at_50%_10%,#f5f3ff_50%,#8e51ff_100%)] dark:[background:radial-gradient(145%_125%_at_50%_10%,#000_50%,#7f22fe_100%)]">
      {/* Header */}
      <Header />
      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <Card className="bg-card/40 w-full backdrop-blur-lg md:w-md">
          <CardHeader className="flex flex-col items-center justify-center">
            <Logo className="my-4" />

            <CardTitle className="my-1 text-center text-xl font-bold">
              404 | Page Not Found
            </CardTitle>
            <CardDescription className="px-4 text-center">
              We&apos;re sorry, but the page you&apos;re looking for
              doesn&apos;t exist.
              <br />
              Please check the{" "}
              <span className="text-primary text-medium">URL</span> and try
              again.
            </CardDescription>
          </CardHeader>
          <Separator />

          <CardContent>
            <Image
              src="/assets/404.jpg"
              width={750}
              height={600}
              alt="404 Not Found"
            />
          </CardContent>
          <Separator />
          <CardFooter className="flex items-center justify-center">
            <p className="text-muted-foreground text-xs">
              © 2025 NoteBud v1.0. All rights reserved.
            </p>
          </CardFooter>
        </Card>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
