import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Thasala Admission Portal',
    short_name: 'Thasala Admission',
    description: 'ระบบรับสมัครนักเรียนออนไลน์ โรงเรียนท่าศาลาประสิทธิ์ศึกษา',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#F59E0B',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
