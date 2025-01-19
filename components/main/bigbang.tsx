import React, { useState } from 'react';

function Bell() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "", content: "" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const images = [
    { src: "", alt: "Yellow Ball", isBall: true },
    { src: "/image_part_002.png", alt: "Image 2" },
    { src: "/image_part_003.png", alt: "Image 3" },
    { src: "/image_part_004.png", alt: "Image 4" },
    { src: "/image_part_005.png", alt: "Image 5" }
  ];

  const sections = [
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

  const handleOpenModal = (section) => {
    setModalData({ name: section.name, content: section.content });
    setModalOpen(true);
  };

  const lineStyle = (index) => ({
    height: hoveredIndex === index ? '95px' : '0',
    backgroundColor: 'white',
    width: '2px',
    position: 'absolute',
    left: index === 0 ? '100%' : '50%',
    transform: index === 0 ? 'translateX(100%)' : 'translateX(-50%)',
    bottom: '100%',
    transition: 'height 0.3s ease-out'
  });

  const textStyle = (index) => ({
    fontSize: '16px',
    color: 'white',
    left: index === 0 ? '50%' : '0%',
    opacity: hoveredIndex === index ? '1' : '0',
    transition: 'opacity 0.3s ease-out',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 'calc(100% + 100px)',
    pointerEvents: 'none'
  });

  return (
    <div className="flex justify-around items-center h-screen bg-transparent overflow-visible">
      {images.map((image, index) => (
        <div key={index}
             className="w-1/5 h-96 bg-transparent hover:bg-transparent transition duration-300 transform hover:-translate-y-2 cursor-pointer shadow-lg relative"
             onMouseEnter={() => setHoveredIndex(index)}
             onMouseLeave={() => setHoveredIndex(null)}
             onClick={() => handleOpenModal(sections[index])}>
          {image.isBall ?
            <div className="flex justify-end items-center w-full h-full">
              <div style={{
                width: '30px',
                height: '30px',
                backgroundColor: 'yellow',
                borderRadius: '50%'
              }}></div>
            </div>
            :
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover"/>
          }
          <div style={lineStyle(index)}></div>
          {sections[index] && <p style={textStyle(index)}>{sections[index].name}</p>}
        </div>
      ))}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg" style={{ width: '300px', maxWidth: '90%' }}>
            <h1 className="text-center md:text-2xl lg:text-[16px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{modalData.name}</h1>
            <div className="text-center mt-4 mb-4">{modalData.content}</div>
            <button className='mx-auto block font-bold bg-green-600 text-white rounded-lg w-24 h-12 hover:bg-green-700' onClick={() => setModalOpen(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );


}

export default Bell;
