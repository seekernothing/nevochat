import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();

    const freeModels = data.data.filter(
      (model: { pricing?: { prompt?: string; completion?: string } }) => {
        const promptPrice = parseFloat(model.pricing?.prompt || "0");
        const completionPrice = parseFloat(model.pricing?.completion || "0");
        return promptPrice === 0 && completionPrice === 0;
      },
    );

    // Return formatted response with useful model information
    const formattedModels = freeModels.map(
      (model: {
        id: string;
        name: string;
        description: string;
        context_length: number;
        architecture: object;
        pricing: object;
        top_provider: object;
      }) => ({
        id: model.id,
        name: model.name,
        description: model.description,
        context_length: model.context_length,
        architecture: model.architecture,
        pricing: model.pricing,
        top_provider: model.top_provider,
      }),
    );

    return NextResponse.json({
      models: formattedModels,
    });
  } catch (error: unknown) {
    console.error("Error fetching free models:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch free models";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
