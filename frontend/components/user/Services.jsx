'use client'

import { useEffect, useState } from 'react'
import { getServices } from '@/lib/api'
import { Code, Palette, Smartphone, Server, TrendingUp } from 'lucide-react'

export default function Services () {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices()

        // ✅ Optional: only active services
        const activeServices = res.data.filter(s => s.isActive)
        const reverseData = activeServices.reverse()

        setServices(activeServices)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const iconMap = {
    Code,
    Palette,
    Smartphone,
    Server,
    TrendingUp
  }

  if (loading) {
    return <p className='text-center py-20'>Loading services...</p>
  }

  return (
    <div className='py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Heading */}
        <h2 className='heading text-3xl md:text-5xl font-bold text-center mb-16'>
          Our Professional Services
        </h2>

        {/* Cards */}
        <div className='grid md:grid-cols-3 gap-10 pt-16'>
          {services.map((service, index) => (
            <div key={index} className='relative flex justify-center mb-4'>
              {/* Card */}
              <div className='bg-linear-to-b from-teal-700 to-cyan-700 text-center text-white rounded-2xl p-8 pt-16 w-full max-w-xs shadow-md'>
                {/* Circle Icon */}
                {/* Circle Icon */}
                <div className='absolute -top-10 left-1/2 transform -translate-x-1/2'>
                  <div className='w-20 h-20 bg-teal-700 border-4 border-white rounded-full flex items-center justify-center'>
                    {(() => {
                      const Icon = iconMap[service.icon] || Code
                      return <Icon size={28} className='text-white' />
                    })()}
                  </div>
                </div>

                {/* Title */}
                <h3 className='font-semibold text-lg mb-4'>{service.title}</h3>

                {/* Description */}
                <p className='text-sm text-gray-100'>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
