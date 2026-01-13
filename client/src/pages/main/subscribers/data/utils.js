/**
 * Вычисляет статус подписчика на основе статусов его продуктов
 * @param {Array} products - Массив продуктов подписчика
 * @returns {string} - Статус подписчика
 */
export function calculateSubscriberStatus(products) {
  if (!products || products.length === 0) return "не активные"
  
  const statuses = products.map((p) => p.paymentStatus)
  
  // Если есть хотя бы один "оплата не прошла"
  if (statuses.includes("оплата не прошла")) {
    return "оплата не прошла"
  }
  
  // Если есть хотя бы один "ожидает оплаты"
  if (statuses.includes("ожидает оплаты")) {
    // Проверяем, что остальные только "оплачено" или "приглашенные"
    const otherStatuses = statuses.filter((s) => s !== "ожидает оплаты")
    if (otherStatuses.every((s) => s === "оплачено" || s === "приглашенные")) {
      return "ожидает оплаты"
    }
  }
  
  // Если есть хотя бы один "приглашенные" и все остальные "оплачено"
  if (statuses.includes("приглашенные")) {
    const otherStatuses = statuses.filter((s) => s !== "приглашенные")
    if (otherStatuses.every((s) => s === "оплачено")) {
      return "приглашенные"
    }
  }
  
  // Если все продукты "оплачено"
  if (statuses.every((s) => s === "оплачено")) {
    return "оплачено"
  }
  
  // По умолчанию "не активные"
  return "не активные"
}

