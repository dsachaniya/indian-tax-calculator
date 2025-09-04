import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dsachaniya.github.io/indian-tax-calculator'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gst-section-14-time-of-supply/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add more pages here as you expand the application
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/tax-guide`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.9,
    // },
  ]
}
