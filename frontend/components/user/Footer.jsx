import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='bg-gray-900 text-white pt-2'>
      <div className='max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8'>
        {/* Company Info */}
        <div>
          <h2 className='text-xl font-bold mb-3'>DevelopersHub Corporation</h2>
          <p className='text-gray-400'>
            We build modern web solutions to help businesses grow digitally.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className='text-lg font-semibold mb-3'>Quick Links</h2>
          <ul className='space-y-2 text-gray-400'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>
              <Link href='/services'>Service</Link>
            </li>
            <li>
              <Link href='/portfolio'>Portfolio</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
            <li>
              <Link href='/booking'>Booking</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className='text-lg font-semibold mb-3'>Contact</h2>
          <p className='text-gray-400'>Email: info@developershub.com</p>
          <p className='text-gray-400'>Phone: +92 300 1234567</p>
          <p className='text-gray-400'>Location: Pakistan</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='text-center text-gray-500 text-sm border-t border-gray-700 py-4'>
        © {new Date().getFullYear()} DevelopersHub. All rights reserved.
      </div>
    </footer>
  )
}
