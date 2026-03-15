import modelsData from '@/data/models.json'

export interface Model {
  id: string
  name: string
  contextLength: number
  inputPrice: number
  outputPrice: number
  description: string
}

export interface Provider {
  name: string
  models: Model[]
}

export interface CostBreakdown {
  inputCost: number
  outputCost: number
  totalCost: number
  inputTokens: number
  outputTokens: number
  model: Model
}

/**
 * Get all providers with their models
 */
export function getAllProviders(): Provider[] {
  return modelsData.providers
}

/**
 * Get all models across all providers
 */
export function getAllModels(): Model[] {
  return modelsData.providers.flatMap((provider) =>
    provider.models.map((model) => ({
      ...model,
      provider: provider.name,
    }))
  ) as Model[]
}

/**
 * Get a specific model by ID
 */
export function getModelById(modelId: string): Model | undefined {
  for (const provider of modelsData.providers) {
    const model = provider.models.find((m) => m.id === modelId)
    if (model) {
      return model
    }
  }
  return undefined
}

/**
 * Calculate API call cost
 * Prices are per 1M tokens
 */
export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  modelId: string
): CostBreakdown | null {
  const model = getModelById(modelId)
  if (!model) {
    return null
  }

  // Prices are per 1M tokens, so divide by 1,000,000
  const inputCost = (inputTokens * model.inputPrice) / 1000000
  const outputCost = (outputTokens * model.outputPrice) / 1000000

  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    inputTokens,
    outputTokens,
    model,
  }
}

/**
 * Format cost as currency string
 */
export function formatCost(cost: number): string {
  if (cost < 0.0001) {
    return `$${cost.toExponential(2)}`
  }
  if (cost < 0.01) {
    return `$${cost.toFixed(6)}`
  }
  if (cost < 1) {
    return `$${cost.toFixed(4)}`
  }
  return `$${cost.toFixed(2)}`
}

/**
 * Format price per 1M tokens
 */
export function formatPricePerMillion(price: number): string {
  return `$${price.toFixed(2)}`
}

/**
 * Compare costs across all models
 */
export interface ModelCostComparison {
  model: Model
  provider: string
  inputCost: number
  outputCost: number
  totalCost: number
}

export function compareCosts(
  inputTokens: number,
  outputTokens: number
): ModelCostComparison[] {
  const comparisons: ModelCostComparison[] = []

  for (const provider of modelsData.providers) {
    for (const model of provider.models) {
      const inputCost = (inputTokens * model.inputPrice) / 1000000
      const outputCost = (outputTokens * model.outputPrice) / 1000000

      comparisons.push({
        model,
        provider: provider.name,
        inputCost,
        outputCost,
        totalCost: inputCost + outputCost,
      })
    }
  }

  // Sort by total cost
  return comparisons.sort((a, b) => a.totalCost - b.totalCost)
}

/**
 * Get context length for a model
 */
export function getModelContextLength(modelId: string): number {
  const model = getModelById(modelId)
  return model?.contextLength || 0
}

/**
 * Check if token count is within model's context limit
 */
export function isWithinContextLimit(
  tokenCount: number,
  modelId: string
): boolean {
  const contextLength = getModelContextLength(modelId)
  return contextLength > 0 && tokenCount <= contextLength
}

/**
 * Get recommended models based on token count
 */
export function getRecommendedModels(tokenCount: number): Model[] {
  const allModels = getAllModels()
  return allModels.filter((model) => model.contextLength >= tokenCount)
}
