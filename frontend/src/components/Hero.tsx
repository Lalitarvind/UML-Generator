'use client';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 px-6">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Generate{' '}
          <span className="bg-gradient-to-r from-[#3A2990] to-[#3A2990]/60 bg-clip-text text-transparent">
            UML Diagrams
          </span>{' '}
          with AI
        </h1>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Describe your software in plain English, and let our AI chatbot generate class, sequence,
          and other UML diagrams in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <button className="group flex items-center gap-2 px-6 py-3 bg-[#3A2990] text-white font-semibold rounded-md hover:bg-[#2e2070] transition-colors">
              Try it Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>

          <Link to="/docs">
            <button className="px-6 py-3 border border-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-50 transition-colors">
              How it Works
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
