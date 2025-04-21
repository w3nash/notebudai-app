import { features } from "@/lib/features";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Features() {
  return (
    <section id="features" className="w-full py-8">
      <div className="w-full px-4 md:px-6">
        <div className="mb-4 flex flex-col items-center justify-center text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Everything You Need for Effective Studying
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              NoteBud combines powerful note-taking with AI-powered study tools
              to help you learn faster and remember more.
            </p>
            <Badge>Features</Badge>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 items-stretch gap-6 py-4 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card/40 flex h-full flex-col shadow-sm backdrop-blur-lg"
            >
              <CardHeader className="flex flex-col items-center space-y-2">
                <feature.icon className="text-primary h-12 w-12" />
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
