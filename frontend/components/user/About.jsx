import Image from 'next/image'
// import Container from "@/components/shared/Container";
// import Section from "@/components/shared/Section";
import Button from '@/components/shared/Button'
import Link from 'next/link'

export default function About () {
  return (
    <section className='bg-linear-to-r from-teal-500 to-cyan-700 min-h-screen flex items-center justify-center px-4 h-full'>
      <div className='grid md:grid-cols-2 gap-10 items-center'>
        {/* Left Content */}
        <div className='text-white'>
          <h2 className='heading text-4xl md:text-5xl font-extrabold mb-4'>
            About Us
          </h2>

          <h3 className='font-semibold text-lg mb-4'>
            Your Trusted Web Development Agency
          </h3>

          <p className='body-text text-sm leading-relaxed mb-4 text-gray-100'>
            At Developers Hub Corporation, we provide comprehensive IT services
            and work on next-generation technologies, pushing the boundaries of
            what is possible in the tech industry. Our community is dedicated to
            connecting developers, enabling them to share knowledge, collaborate
            on cutting-edge projects, and drive technological advancements.
          </p>

          <p className='body-text text-sm leading-relaxed mb-6 text-gray-100'>
            Our international network of tech enthusiasts ensures that we remain
            at the forefront of industry trends and developments.
          </p>

          <Link href='/contact'>
            <Button>Let’s work together</Button>
          </Link>
        </div>

        {/* Right Image */}
        <div className='flex justify-center'>
          <Image
            src='/teamwork.jpeg' // put your image in public/images
            alt='Team Work'
            width={500}
            height={400}
            className='w-full max-w-md'
          />
        </div>
      </div>
    </section>
  )
}
