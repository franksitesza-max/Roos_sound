const SAFE_LINK_PROTOCOLS = new Set(['https:', 'mailto:', 'tel:']);

export const SAFE_EXTERNAL_ORIGINS = new Set([
  'https://wa.me',
  'https://www.instagram.com',
  'https://instagram.com'
]);

export function parseSafeUrl(rawValue, options = {}) {
  const {
    allowSameOrigin = true,
    allowedExternalOrigins = SAFE_EXTERNAL_ORIGINS,
    allowedProtocols = SAFE_LINK_PROTOCOLS
  } = options;

  if (typeof rawValue !== 'string' || rawValue.trim() === '') {
    return null;
  }

  let url;

  try {
    url = new URL(rawValue, window.location.origin);
  } catch {
    return null;
  }

  if (!allowedProtocols.has(url.protocol)) {
    return null;
  }

  if (url.protocol === 'https:') {
    const isSameOrigin = url.origin === window.location.origin;
    const isAllowedExternal = allowedExternalOrigins.has(url.origin);

    if (!isSameOrigin && !isAllowedExternal) {
      return null;
    }

    if (!allowSameOrigin && isSameOrigin) {
      return null;
    }
  }

  return url;
}
