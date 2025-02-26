
import { motion } from 'framer-motion';

interface HeroSectionProps {
  backers: number;
}

export function HeroSection({ backers }: HeroSectionProps) {
  return (
    <section className="text-gray-900 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Building Haiti's Digital Future</h1>
          <h2 className="text-xl md:text-2xl mb-6 text-gray-600">A revolutionary platform connecting Haitian businesses, creators, and communities</h2>
          <p className="mb-8 text-gray-600">Join {backers}+ backers who are already supporting this innovative platform</p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg h-64 md:h-96 mb-8 relative overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1590341328520-63256eb32bc3?w=800" 
              alt="Platform preview" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
