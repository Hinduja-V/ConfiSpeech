import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  icon: Icon
}) => {
  const baseStyle = "relative inline-flex items-center justify-center font-semibold rounded-premium transition-all duration-300 focus:outline-none overflow-hidden py-3 px-6 text-sm md:text-base";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white shadow-premium hover:shadow-premium-hover hover:brightness-105",
    secondary: "bg-gradient-to-r from-secondary to-primary text-white shadow-premium hover:shadow-premium-hover hover:brightness-105",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary bg-transparent",
    glass: "glass-card text-primary border-primary/20 hover:bg-primary/5 hover:border-primary/40",
    danger: "bg-red-500 text-white shadow-md hover:bg-red-600 hover:shadow-lg"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
