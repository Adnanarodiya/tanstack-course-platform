import { Button } from "~/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useContinueSlug } from "~/hooks/use-continue-slug";
import { GraphVisualization } from "~/components/graph-visualization";

export function HeroSection() {
  const continueSlug = useContinueSlug();

  return (
    <section className="relative h-screen overflow-hidden w-full bg-black">
      {/* Background container with fixed dimensions */}
      <div className="absolute inset-0" aria-hidden="true">
        <GraphVisualization />
      </div>

      {/* Content - now with a subtle gradient background to ensure visibility */}
      <div className="relative z-10 h-full bg-gradient-to-r from-black/50 to-transparent">
        <div className="container mx-auto h-full px-6 lg:px-12">
          <div className="flex items-center h-full">
            <div className="max-w-xl relative backdrop-blur-[2px] p-6 rounded-lg bg-black/10">
              <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-white [text-shadow:_0_1px_12px_rgb(0_0_0_/_40%)]">
                20 <span className="text-theme-400">Beginner</span> React
                Challenges
              </h1>
              <p className="text-xl text-gray-200 mb-12 [text-shadow:_0_1px_12px_rgb(0_0_0_/_40%)]">
                Master React through hands-on practice with 20 engaging
                challenges. From building a Connect Four game to crafting a
                Quote Generator, you'll learn to solve real-world React problems
                by breaking them down into manageable pieces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/purchase">
                  <Button
                    size="lg"
                    className="bg-theme-500 hover:bg-theme-600 text-black w-full sm:w-auto px-8 relative"
                  >
                    Buy Now
                  </Button>
                </Link>
                <Link to={"/learn/$slug"} params={{ slug: continueSlug }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto px-8 rounded-md relative"
                  >
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
