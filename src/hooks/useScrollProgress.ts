import { useState, useEffect, useCallback } from 'react';

interface ScrollProgress {
  progress: number; // 0-1 overall progress
  section: 'welcome' | 'warp' | 'blackhole' | 'planet' | 'void';
  sectionProgress: number; // 0-1 progress within current section
}

// Section breakpoints (as percentage of total scroll)
const SECTIONS = {
  welcome: { start: 0, end: 0.15 },
  warp: { start: 0.15, end: 0.35 },
  blackhole: { start: 0.35, end: 0.55 },
  planet: { start: 0.55, end: 0.8 },
  void: { start: 0.8, end: 1 },
};

export const useScrollProgress = (): ScrollProgress => {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const newProgress = Math.min(scrolled / scrollHeight, 1);
    setProgress(newProgress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Determine current section
  let section: ScrollProgress['section'] = 'welcome';
  let sectionProgress = 0;

  if (progress < SECTIONS.welcome.end) {
    section = 'welcome';
    sectionProgress = progress / SECTIONS.welcome.end;
  } else if (progress < SECTIONS.warp.end) {
    section = 'warp';
    sectionProgress = (progress - SECTIONS.warp.start) / (SECTIONS.warp.end - SECTIONS.warp.start);
  } else if (progress < SECTIONS.blackhole.end) {
    section = 'blackhole';
    sectionProgress = (progress - SECTIONS.blackhole.start) / (SECTIONS.blackhole.end - SECTIONS.blackhole.start);
  } else if (progress < SECTIONS.planet.end) {
    section = 'planet';
    sectionProgress = (progress - SECTIONS.planet.start) / (SECTIONS.planet.end - SECTIONS.planet.start);
  } else {
    section = 'void';
    sectionProgress = (progress - SECTIONS.void.start) / (SECTIONS.void.end - SECTIONS.void.start);
  }

  return { progress, section, sectionProgress: Math.min(Math.max(sectionProgress, 0), 1) };
};

export const SECTION_CONFIG = SECTIONS;
