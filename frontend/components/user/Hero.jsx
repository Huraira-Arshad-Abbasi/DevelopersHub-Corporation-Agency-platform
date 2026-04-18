import Link from "next/link";
import Button from "../shared/Button";

export default function page() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-4 h-full">
      <div className="max-w-3xl text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl heading font-extrabold leading-tight text-gray-900">
          Transforming Ideas <br />
          into <br />
          intelligent systems <br />
          <span className="text-blue-600">
            That Drive Result
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
          Developers Hub Corporation, a dynamic software hub and global community 
          of tech professionals. We bring together highly skilled developers from 
          around the world, fostering a collaborative environment where innovation 
          and excellence thrive.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/services" >
            <Button >
              Our Services
            </Button>
          </Link>

          <Link href="/contact">
            <Button >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}