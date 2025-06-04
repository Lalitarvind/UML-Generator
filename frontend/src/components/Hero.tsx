'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-accent/10 px-6">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Generate{' '}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            UML Diagrams
          </span>{' '}
          with AI
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Describe your software in plain English, and let our AI chatbot generate class, sequence,
          and other UML diagrams in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button size="lg" className="group">
              Try it Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link to="/docs">
            <Button size="lg" variant="outline">
              How it Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
