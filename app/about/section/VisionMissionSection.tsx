import React from 'react';
import { AboutVisionMissionTransformed } from '../core/about-page.model';
import FeatureCard from '@/components/partials/FeatureCard';
import { Users, Star, Handshake, Heart, Target, Shield } from 'lucide-react';

interface VisionMissionSectionProps {
  visionMission: AboutVisionMissionTransformed;
}

const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({ visionMission }) => {
  // Map mission index to icons
  const getIconForMission = (index: number) => {
    const icons = [Users, Star, Handshake, Heart];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-8 h-8" />;
  };

  // Check if missions data is available from Strapi
  if (!visionMission.missions || visionMission.missions.length === 0) {
    return (
      <section className="py-32 bg-white relative overflow-hidden">
        <div className='text-center mb-16'>
          <div className="inline-block">
            <h1 className='text-6xl font-bold text-blue-900 leading-tight mb-4'>
              {visionMission.title}
            </h1>
            <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-16">
            {/* Vision Section - Top */}
            <div className="bg-white shadow-xl p-8 border border-gray-100 rounded-2xl">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Visi</h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  {visionMission.vision}
                </p>
              </div>
            </div>

            {/* Mission Section - Bottom */}
            <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-blue-900">Misi</h2>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <div className="text-red-600 text-xl mb-2">⚠️ Missions Data Required</div>
                <p className="text-red-700">
                  Mission data is not available from Strapi API. Please add Mission field to VissionMission in Strapi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const missions = visionMission.missions;

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className='text-center mb-16'>
        <div className="inline-block">
          <h1 className='text-6xl font-bold text-blue-900 leading-tight mb-4'>
            {visionMission.title}
          </h1>
          <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Vision Section - Top */}
          <div className="bg-white shadow-xl p-8 border border-gray-100 rounded-2xl">
            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {visionMission.vision}
              </p>
            </div>
          </div>

          {/* Mission Section - Bottom */}
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missions.map((mission, index) => (
                <FeatureCard
                  key={mission.id}
                  icon={getIconForMission(index)}
                  title={mission.title}
                  description={mission.description}
                  className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:border-blue-200 shadow-lg transition-all duration-300 hover:shadow-xl"
                  iconBgColor={index % 2 === 0 ? "bg-blue-600" : "bg-orange-500"}
                  iconSize="w-12 h-12"
                  titleSize="text-lg"
                  descriptionSize="text-sm text-gray-600"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
