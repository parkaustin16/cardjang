const decodeSlugValue = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const normalizeRouteSlug = (value?: string | null) =>
  decodeSlugValue(value ?? '').trim().toLowerCase();

export const toLegacyAsciiSlug = (value?: string | null) =>
  normalizeRouteSlug(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

export const matchesLegacySlug = (
  requestedSlug?: string | null,
  candidateSlug?: string | null
) => {
  const normalizedRequested = normalizeRouteSlug(requestedSlug);
  const normalizedCandidate = normalizeRouteSlug(candidateSlug);

  if (!normalizedRequested || !normalizedCandidate) {
    return false;
  }

  return (
    normalizedRequested === normalizedCandidate ||
    toLegacyAsciiSlug(normalizedRequested) === toLegacyAsciiSlug(normalizedCandidate)
  );
};