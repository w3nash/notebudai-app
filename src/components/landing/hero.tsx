import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  BookOpen,
  Brain,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export function Hero() {
  return (
    <section className="w-full px-4">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                NoteBud, Your AI-Powered Note-Taking App
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Take smarter notes, study more effectively, and ace your exams
                with Bud&apos;s AI-powered study tools.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button size="lg">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="from-primary/80 to-primary/40 flex w-full flex-col items-center justify-center rounded-lg bg-gradient-to-r shadow-xl backdrop-blur-lg">
              <div className="bg-card/90 w-full rounded-lg p-6 backdrop-blur-lg">
                <div className="mb-4 flex items-center gap-2">
                  <BookOpen className="text-primary h-5 w-5" />
                  <h3 className="font-semibold">Biology 101</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-sm">
                    The cell is the basic structural, functional, and biological
                    unit of all known organisms...
                  </p>
                  <div className="flex gap-2">
                    <Badge>Biology</Badge>
                    <Badge>Study</Badge>
                  </div>
                  <div className="mt-4 border-t pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Brain className="text-primary h-4 w-4" />
                      <span className="text-sm font-medium">AI Summary</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      This note covers the basic structure and function of
                      cells, which are the fundamental units of life. Key points
                      include cell components, types of cells, and their
                      functions.
                    </p>
                  </div>
                  <div className="my-4 border-t py-4 text-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <MessageSquare className="text-primary h-4 w-4" />
                      <span className="text-sm font-medium">
                        Study Questions
                      </span>
                    </div>
                    <div className="space-y-4">
                      <p className="font-medium">
                        What is the basic structural and functional unit of all
                        known organisms?
                      </p>
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-3 w-3" />
                        <span>Cell</span>
                      </div>
                      <div className="text-card rounded-md bg-green-500 p-4 text-sm dark:bg-green-600">
                        <p className="font-medium">Explanation:</p>
                        <p>
                          The cell is the basic structural, functional, and
                          biological unit of all known organisms. Cells are the
                          smallest unit of life that can replicate
                          independently, and are often called the &apos;building
                          blocks of life&apos;.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
