import React from 'react';

// FIX: Updated CardProps to extend React.HTMLAttributes<HTMLDivElement> and updated the component
// to forward additional props. This allows passing standard HTML attributes like `onClick` to the Card component.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg';
  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
