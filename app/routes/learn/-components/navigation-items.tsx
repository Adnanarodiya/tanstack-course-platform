import { Check, ChevronRight, Lock } from "lucide-react";
import { Segment } from "~/db/schema";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { useSegment } from "./segment-context";
import { GetSegmentsWithProgressResult } from "~/data-access/segments";

interface NavigationItemsProps {
  segments: GetSegmentsWithProgressResult;
  currentSegmentId: Segment["id"];
  isAdmin: boolean;
  isPremium: boolean;
  className?: string;
  onItemClick?: () => void;
}

export function NavigationItems({
  segments,
  currentSegmentId,
  isAdmin,
  isPremium,
  className,
  onItemClick,
}: NavigationItemsProps) {
  const { setCurrentSegmentId } = useSegment();

  // Group segments by moduleId
  const groupedSegments = segments.reduce(
    (acc, segment) => {
      if (!acc[segment.moduleId]) {
        acc[segment.moduleId] = [];
      }
      acc[segment.moduleId].push(segment);
      return acc;
    },
    {} as Record<string, GetSegmentsWithProgressResult>
  );

  // Find the current segment's moduleId
  const currentSegment = segments.find((s) => s.id === currentSegmentId);
  const currentModuleId = currentSegment?.moduleId;

  // Track expanded state for each module
  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >(() => {
    return currentModuleId ? { [currentModuleId]: true } : {};
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleSegmentClick = (segment: Segment) => {
    setCurrentSegmentId(segment.id);
    onItemClick?.();
  };

  return (
    <div className={className}>
      {Object.entries(groupedSegments).map(([moduleId, moduleSegments]) => (
        <div key={moduleId} className="relative">
          <button
            onClick={() => toggleModule(moduleId)}
            className="flex items-center gap-2 w-full px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex items-center gap-2 flex-1">
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  expandedModules[moduleId] && "rotate-90"
                )}
              />
              <span>{moduleId}</span>
            </div>
          </button>
          {expandedModules[moduleId] && (
            <div className="relative ml-6">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              {moduleSegments.map((segment) => {
                const isActive = segment.id === currentSegmentId;
                return (
                  <div key={segment.id} className="relative">
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground" />
                    )}
                    <button
                      onClick={() => handleSegmentClick(segment)}
                      className={cn(
                        "flex items-center gap-2 w-full pl-6 pr-4 py-3 text-base hover:text-foreground transition-colors group relative text-left",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span className="flex-1">{segment.title}</span>
                      {segment.isPremium && !isPremium && (
                        <Lock className="h-4 w-4" />
                      )}
                      {segment.progress && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
