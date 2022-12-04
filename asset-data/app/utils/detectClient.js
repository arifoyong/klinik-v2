export const isClientSide = () => {
  return typeof window === 'object'
}