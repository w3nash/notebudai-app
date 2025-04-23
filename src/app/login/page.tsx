import { Header } from "@/components/login/header";
import { Footer } from "@/components/login/footer";
import { authConfig } from "@/server/auth/config";
import { LogInProviders } from "@/components/login/providers";
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
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
};

export default async function LogInPage() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  if (isAuthenticated) {
    redirect("/chatbud");
  }

  // Construct providers from authConfig
  const providers = authConfig.providers.map((provider) => ({
    id: provider.id,
    name: provider.name,
  }));

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
              Welcome, Buddy!
            </CardTitle>
            <CardDescription className="px-4 text-center">
              Please log in to access your{" "}
              <span className="text-primary text- font-bold">NoteBud</span>{" "}
              account.
              <br />
              You can use your{" "}
              <span className="text-primary text- font-medium">
                Google
              </span>,{" "}
              <span className="text-primary text- font-medium">Discord</span>,{" "}
              or <span className="text-primary text- font-medium">GitHub</span>{" "}
              account to sign in.
            </CardDescription>
          </CardHeader>
          <Separator />

          <CardContent>
            <LogInProviders providers={providers} />
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
