import React, { useState } from 'react';

// Define interfaces for your types
interface Image {
  id: number; // Added an ID for unique identification
  src: string;
  alt: string;
  isBall?: boolean;
}

interface Section {
  name: string;
  content: string;
}

function Bell() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{ name: string; content: string }>({ name: "", content: "" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images: Image[] = [
    { id: 1, src: "path_to_yellow_ball.png", alt: "Yellow Ball", isBall: true },
    { id: 2, src: "/image_part_002.png", alt: "Image 2" },
    { id: 3, src: "/image_part_003.png", alt: "Image 3" },
    { id: 4, src: "/image_part_004.png", alt: "Image 4" },
    { id: 5, src: "/image_part_005.png", alt: "Image 5" }
  ];

  const sections: Section[] = [
    {
      name: "Planning",
      content: "The most crucial phase of the project development. This step involves the calculation of all the required technologies, estimated time required for the project development, costing of the project and deployment. It is also when the final quotation is provided to client."
    },
    {
      name: "Architecting",
      content: "This is the time when most of the developers and architects go mad. Architecting seals the fate of the project. All sorts of odd scenarios and probable outcomes are thought of during this phase. Fallback strategies are designed and process is laid down so that you never get detailed on your project."
    },
    {
      name: "Designing",
      content: "Creating the visuals for the project is super important. During this phase the team decides and discusses upon the designs and wireframe of the entire product. It is much more tedious than it seems and requires quite a bit of expertise, so that the product is built world-class."
    },
    {
      name: "Developing",
      content: "The actual time to get the hands dirty with logics, codes and testings. A repetitive incremental process to bring to your table what we have all planned and understood. This phases takes majority of the time although AI has significantly reduced the delays."
    },
    {
      name: "Deploying",
      content: "The nightmare and the success imprint. This is a tight rope on which depends whether there would be any further works or a market hit. Once the perspiration is completed, your long waited and invested product is cooked."
    }
  ];

  const handleOpenModal = (section: Section) => {
    setModalData(section);
    setModalOpen(true);
  };

  return (
    <div className="flex justify-around items-center min-h-screen bg-transparent p-4">
      {images.map((image, index) => {
        const section = sections[index];
        
        return (
          <div 
            key={image.id}
            className="relative w-48 h-96 group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => section && handleOpenModal(section)}
          >
            {image.isBall ? (
              <div className="flex justify-end items-center w-full h-full">
                <div className="w-8 h-8 rounded-full bg-yellow-400"></div>
              </div>
            ) : (
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            
            {/* Line */}
            <div 
              className="absolute left-1/2 bottom-full w-0.5 bg-white transition-all duration-300 ease-out"
              style={{ 
                height: hoveredIndex === index ? '96px' : '0',
                transform: 'translateX(-50%)'
              }}
            />
            
            {/* Text */}
            {section && (
              <div 
                className="absolute bottom-full mb-24 left-1/2 -translate-x-1/2 w-full text-center text-white transition-opacity duration-300 pointer-events-none"
                style={{ opacity: hoveredIndex === index ? 1 : 0 }}
              >
                <p className="text-base">{section.name}</p>
              </div>
            )}
          </div>
        );
      })}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4" onClick={() => setModalOpen(false)}>
          <div 
            className="bg-white p-6 rounded-lg max-w-md w-full" 
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {modalData.name}
            </h2>
            <p className="mt-4 mb-6 text-gray-700 text-center">
              {modalData.content}
            </p>
            <button 
              className="mx-auto block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bell;