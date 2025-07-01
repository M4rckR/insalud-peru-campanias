"use client";

import React, { ReactNode } from 'react';
import { TitleProvider } from '@/contexts/TitleContext';
import dynamic from 'next/dynamic';

// Importación dinámica del SpinWheelTrigger
const SpinWheelTrigger = dynamic(
  () => import('./SpinWheelTrigger').then(mod => mod.SpinWheelTrigger),
  { ssr: false }
);

interface PageWrapperProps {
  children: ReactNode;
  sede: string;
  tratamiento: string;
  spinWheelProps?: {
    autoShowDelay?: number;
    spinDuration?: number;
    firstSpinAngle?: number;
    secondSpinAngle?: number;
    showCloseButton?: boolean;
  };
}

export function PageWrapper({ 
  children, 
  sede, 
  tratamiento, 
  spinWheelProps = {} 
}: PageWrapperProps) {
  return (
    <TitleProvider sede={sede} tratamiento={tratamiento}>
      {children}
      
      <SpinWheelTrigger
        sede={sede}
        tratamiento={tratamiento}
        autoShowDelay={spinWheelProps.autoShowDelay || 1}
        spinDuration={spinWheelProps.spinDuration || 5}
        firstSpinAngle={spinWheelProps.firstSpinAngle || 315}
        secondSpinAngle={spinWheelProps.secondSpinAngle || 225}
        showCloseButton={spinWheelProps.showCloseButton || false}
      />
    </TitleProvider>
  );
} 