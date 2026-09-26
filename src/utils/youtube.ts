/**
 * Utility to extract YouTube video ID from various URL formats
 */
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();

  // If already a clean 11-char ID without slashes or query
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex matches standard watch?v=, short youtu.be, embed/, shorts/, etc.
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);

  return match && match[1] ? match[1] : trimmed;
}

/**
 * Returns the standard embed URL for iframe player
 */
export function getYouTubeEmbedUrl(videoIdOrUrl: string, options: { autoplay?: boolean; mute?: boolean } = {}): string {
  const id = extractYouTubeId(videoIdOrUrl);
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1',
  });

  if (options.autoplay) {
    params.set('autoplay', '1');
  }
  if (options.mute) {
    params.set('mute', '1');
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/**
 * Returns high quality thumbnail URL from YouTube
 */
export function getYouTubeThumbnail(videoIdOrUrl: string, fallbackThumb?: string): string {
  const id = extractYouTubeId(videoIdOrUrl);
  if (!id) return fallbackThumb || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
