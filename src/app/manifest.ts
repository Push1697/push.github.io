import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pushpendra - Server Administrator & Cloud Engineer Portfolio',
    short_name: 'Pushpendra Portfolio',
    description: 'Expert Server Administrator and Cloud Engineer specializing in AWS, Kubernetes, Docker, and DevOps automation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#22d3ee',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
