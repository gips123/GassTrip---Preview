import React from 'react';

const VisionMissionSection: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
       <div className='text-center mb-16'>
         <div className="inline-block">
           <h1 className='text-6xl font-bold text-blue-900 leading-tight mb-4'>
             Visi & Misi
           </h1>
           <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full"></div>
         </div>
       </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="bg-white lg:col-span-1 flex justify-center items-center shadow-2xl p-8 border border-gray-100 rounded-2xl p-8 shadow-lg pb-41">
                <p className="text-lg text-gray-700 leading-relaxed flex-1">
                    Menjadi perusahaan tour & travel terdepan, terpercaya, dan unggul di Indonesia yang berkomitmen memberikan pengalaman perjalanan yang berkesan, aman, dan memuaskan bagi setiap pelanggan, sekaligus berkontribusi positif pada pariwisata berkelanjutan.
                </p>
          </div>

          {/* Mission Section - Right */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission 1 */}
                <div className="group h-full">
                  <div className="bg-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200 h-full flex flex-col">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                          <span className="text-sm font-bold">01</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          Pelayanan Prima
                        </h4>
                        <p className="text-gray-600 leading-relaxed flex-1 text-sm">
                          Memberikan pelayanan yang profesional, ramah, cepat, dan responsif mulai dari perencanaan hingga purna-wisata.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission 2 */}
                <div className="group h-full">
                  <div className="bg-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-orange-200 h-full flex flex-col">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                          <span className="text-sm font-bold">02</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                          Kualitas & Inovasi
                        </h4>
                        <p className="text-gray-600 leading-relaxed flex-1 text-sm">
                          Menyediakan paket perjalanan berkualitas dan terus berinovasi dalam menciptakan rute dan layanan baru.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission 3 */}
                <div className="group h-full">
                  <div className="bg-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200 h-full flex flex-col">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                          <span className="text-sm font-bold">03</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          Kemitraan Strategis
                        </h4>
                        <p className="text-gray-600 leading-relaxed flex-1 text-sm">
                          Membangun hubungan baik dengan mitra bisnis untuk memastikan harga kompetitif dan layanan optimal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission 4 */}
                <div className="group h-full">
                  <div className="bg-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-orange-200 h-full flex flex-col">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                          <span className="text-sm font-bold">04</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                          Tanggung Jawab Sosial
                        </h4>
                        <p className="text-gray-600 leading-relaxed flex-1 text-sm">
                          Mendukung pariwisata berkelanjutan dengan menghargai budaya lokal dan memberikan manfaat bagi masyarakat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
