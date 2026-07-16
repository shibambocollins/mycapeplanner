import React from 'react';
import { theme } from '../theme';

export const renderFormattedText = (text) => {
  if (!text) return null;
  // Splits on **bold** syntax to render correctly
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} style={{ color: theme.colors.secondary }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};
