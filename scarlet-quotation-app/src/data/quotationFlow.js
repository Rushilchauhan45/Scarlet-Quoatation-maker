export const BHK_OPTIONS = [
  { value: '2BHK', icon: '🏠' },
  { value: '3BHK', icon: '🏡' },
  { value: '4BHK', icon: '🏘️' },
  { value: 'Other', icon: '✏️' },
]

export const QUOTATION_TYPES = ['Turnkey Interior', 'Only Designing (3D Visualization)']

export const PACKAGE_OPTIONS = ['STANDARD', 'PREMIUM', 'LUXURIOUS']

export const getAllowedPackages = (bhkType, quotationType) => {
  if (!bhkType) return []
  if (quotationType === 'Only Designing (3D Visualization)') return ['STANDARD']
  if (bhkType === '2BHK') return ['STANDARD']
  return PACKAGE_OPTIONS
}

export const normalizePackageForFlow = (bhkType, packageType, quotationType) => {
  const allowed = getAllowedPackages(bhkType, quotationType)
  if (!allowed.length) return ''
  if (packageType && allowed.includes(packageType)) return packageType
  return allowed[0]
}
