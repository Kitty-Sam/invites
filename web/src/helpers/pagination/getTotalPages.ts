export const getTotalPages = (totalItems: number, ITEMS_PER_PAGE: number) => {
  return Math.ceil(totalItems / ITEMS_PER_PAGE)
}
