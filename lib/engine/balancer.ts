/**
 * Balancer ensures none of the nutrients are missing if a combined rule is desired.
 * For now, it's a pass-through with explanation placeholder.
 */
export function balance(doses: { N: number | null; P2O5: number | null; K2O: number | null }) {
  return { doses, explain: { layer1_5: "no balancing applied in prototype" } };
}
