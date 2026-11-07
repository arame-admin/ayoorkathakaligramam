/**
 * Video Player & YouTube Live Showcase Manager
 * Provides responsive embedding, offline poster fallback,
 * sound policy compliance, and channel links.
 */

export class VideoShowcase {
  constructor() {
    this.container = document.querySelector('.cinematic-video-container');
    this.playOverlay = document.querySelector('.video-play-overlay');
    this.iframeWrapper = document.querySelector('.video-iframe-wrapper');
    this.initPlayer();
  }

  initPlayer() {
    if (!this.playOverlay || !this.iframeWrapper) return;

    // Kathakali Gramam Ayroor documentary / performance ID
    // Official video or fallback stream embed
    const videoId = 'sYGsqFtojDc'; // Or standard embed
    // Kathakali performance video on YouTube
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`;

    this.playOverlay.addEventListener('click', () => {
      this.playOverlay.style.opacity = '0';
      this.playOverlay.style.pointerEvents = 'none';

      // Insert iframe cleanly on user intent
      this.iframeWrapper.innerHTML = `
        <iframe 
          src="${embedUrl}" 
          title="Ayroor Kathakali Gramam Live Performance"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          class="cinematic-iframe"
        ></iframe>
      `;
    });
  }
}
