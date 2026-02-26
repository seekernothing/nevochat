"use client";
import { useState } from "react";
import { Check, ChevronDown, Info, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AIModel {
  id: string;
  name: string;
  description: string;
  context_length: number;
  architecture: {
    modality: string;
    tokenizer: string;
    input_modalities: string[];
    output_modalities: string[];
  };
  pricing: {
    prompt: string;
    completion: string;
    request: string;
    [key: string]: string;
  };
  top_provider: {
    max_completion_tokens: number;
    is_moderated: boolean;
  };
}

interface ModelSelectorProps {
  models: AIModel[];
  selectedModelId: string | null | undefined;
  onModelSelect: (id: string) => void;
  className?: string;
}

export function ModelSelector({
  models,
  selectedModelId,
  onModelSelect,
  className,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedForDetails, setSelectedForDetails] = useState<AIModel | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const selectedModel = models.find((m) => m.id === selectedModelId);

  const formatContextLength = (length: number) => {
    if (length >= 1000000) return `${(length / 1000000).toFixed(1)}M`;
    if (length >= 1000) return `${(length / 1000).toFixed(0)}K`;
    return length.toString();
  };

  const isFreeModel = (model: AIModel) => {
    return (
      model.pricing.prompt === "0" &&
      model.pricing.completion === "0" &&
      model.pricing.request === "0"
    );
  };

  const openModelDetails = (model: AIModel, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedForDetails(model);
    setDetailsOpen(true);
  };

  const filteredModels = models.filter((model) => {
    const query = searchQuery.toLowerCase();
    return (
      model.name.toLowerCase().includes(query) ||
      model.description?.toLowerCase().includes(query) ||
      model.id.toLowerCase().includes(query) ||
      model.architecture?.modality?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="neutral"
            role="combobox"
            aria-expanded={open}
            className={cn("h-9 justify-between gap-2 px-3 text-xs", className)}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate font-base">
                {selectedModel?.name || "Select model"}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[min(480px,calc(100vw-2rem))] p-0 bg-secondary-background"
          align="start"
        >
          <div className="p-3 border-b-2 border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/50" />
              <Input
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9"
              />
            </div>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="p-2">
              <div className="px-2 py-1.5 text-xs font-heading text-foreground/60 uppercase tracking-wide">
                Available Models ({filteredModels.length})
              </div>
            </div>
            {filteredModels.length === 0 ? (
              <div className="px-2 py-8 text-center text-sm text-foreground/50">
                No models found matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredModels.map((model) => (
                <div
                  key={model.id}
                  className={cn(
                    "relative flex cursor-pointer select-none items-start gap-2 rounded-base mx-2 px-2 py-2 text-sm transition-all hover:bg-main/20",
                    selectedModelId === model.id &&
                      "bg-main/30 border-2 border-border shadow-shadow",
                  )}
                  onClick={() => {
                    onModelSelect(model.id);
                    setOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <div className="flex h-5 items-center">
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selectedModelId === model.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm leading-none truncate">
                        {model.name}
                      </span>
                      {isFreeModel(model) && (
                        <Badge
                          variant="default"
                          className="h-4 px-1.5 text-[10px] rounded-base"
                        >
                          FREE
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-foreground/60 line-clamp-2">
                      {model.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-foreground/50">
                      <span>
                        Context: {formatContextLength(model.context_length)}
                      </span>
                      <span>•</span>
                      <span className="capitalize">
                        {model.architecture?.modality?.replace("->", " → ")}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="neutral"
                    size="sm"
                    className="h-6 w-6 p-0 shrink-0"
                    onClick={(e) => openModelDetails(model, e)}
                  >
                    <Info className="h-3.5 w-3.5" />
                    <span className="sr-only">View details</span>
                  </Button>
                </div>
              ))
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {selectedForDetails?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed information about this AI model
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="pr-4 h-[400px]">
            {selectedForDetails && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-heading mb-2">Description</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {selectedForDetails.description}
                  </p>
                </div>

                <Separator />

                {/* Context & Capabilities */}
                <div>
                  <h3 className="text-sm font-heading mb-3">
                    Context & Capabilities
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/50">
                        Context Length
                      </p>
                      <p className="text-sm font-heading">
                        {formatContextLength(selectedForDetails.context_length)}{" "}
                        tokens
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/50">
                        Max Completion Tokens
                      </p>
                      <p className="text-sm font-heading">
                        {selectedForDetails.top_provider?.max_completion_tokens
                          ? formatContextLength(
                              selectedForDetails.top_provider
                                .max_completion_tokens,
                            )
                          : "N/A"}{" "}
                        tokens
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/50">Modality</p>
                      <p className="text-sm font-heading capitalize">
                        {selectedForDetails.architecture?.modality?.replace(
                          "->",
                          " → ",
                        )}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/50">Tokenizer</p>
                      <p className="text-sm font-heading">
                        {selectedForDetails.architecture?.tokenizer}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Input/Output Modalities */}
                <div>
                  <h3 className="text-sm font-heading mb-3">
                    Supported Modalities
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs text-foreground/50">
                        Input Modalities
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedForDetails.architecture?.input_modalities?.map(
                          (modality) => (
                            <Badge
                              key={modality}
                              variant="outline"
                              className="text-xs rounded-base"
                            >
                              {modality}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-foreground/50">
                        Output Modalities
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedForDetails.architecture?.output_modalities?.map(
                          (modality) => (
                            <Badge
                              key={modality}
                              variant="outline"
                              className="text-xs rounded-base"
                            >
                              {modality}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pricing */}
                <div>
                  <h3 className="text-sm font-heading mb-3">Pricing</h3>
                  {isFreeModel(selectedForDetails) ? (
                    <div className="flex items-center gap-2 p-3 rounded-base bg-main/20 border-2 border-border">
                      <Badge variant="default" className="rounded-base">
                        FREE
                      </Badge>
                      <p className="text-sm text-foreground/70">
                        This model is completely free to use
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedForDetails.pricing).map(
                        ([key, value]) => {
                          if (value === "0") return null;
                          return (
                            <div key={key} className="space-y-1">
                              <p className="text-xs text-foreground/50 capitalize">
                                {key.replace("_", " ")}
                              </p>
                              <p className="text-sm font-heading">${value}</p>
                            </div>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Provider Info */}
                <div>
                  <h3 className="text-sm font-heading mb-3">
                    Provider Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/70">
                        Content Moderation
                      </span>
                      <Badge
                        variant={
                          selectedForDetails.top_provider?.is_moderated
                            ? "default"
                            : "secondary"
                        }
                        className="rounded-base"
                      >
                        {selectedForDetails.top_provider?.is_moderated
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Model ID */}
                <div>
                  <h3 className="text-sm font-heading mb-2">Model ID</h3>
                  <code className="text-xs bg-main/10 border-2 border-border px-2 py-1 rounded-base block break-all font-base">
                    {selectedForDetails.id}
                  </code>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
