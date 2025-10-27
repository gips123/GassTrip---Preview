import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  iconBgColor?: string;
  iconSize?: string;
  titleSize?: string;
  descriptionSize?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = "",
  iconBgColor = "bg-blue-600",
  iconSize = "w-16 h-16",
  titleSize = "text-xl",
  descriptionSize = "text-gray-600"
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden border border-gray-100 hover:border-blue-200 ${className}`}>
      <div className="p-8 text-center">
        <div className="mb-6">
          <div className={`${iconSize} ${iconBgColor} rounded-xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 mx-auto`}>
            {icon}
          </div>
        </div>
        <h3 className={`${titleSize} font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300`}>
          {title}
        </h3>
        <p className={`${descriptionSize} leading-relaxed`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
