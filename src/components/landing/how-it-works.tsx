import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-8">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How NoteBud Works
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              NoteBud&apos;s AI-powered tools help you maximize your study time
              and improve retention.
            </p>
            <Badge>How It Works</Badge>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold">Take Notes</h3>
            <p className="text-muted-foreground text-center">
              Create detailed notes in our easy-to-use editor. Add tags and
              organize into folders.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold">Let AI Work</h3>
            <p className="text-muted-foreground text-center">
              Bud analyzes your notes and generates summaries, questions, and
              mind maps.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-full text-3xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold">Study & Succeed</h3>
            <p className="text-muted-foreground text-center">
              Review materials, test your knowledge, and ace your exams with
              confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
