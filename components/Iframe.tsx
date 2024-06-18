"use client";
import { useState } from "react";

type links = { id: number; link: string; movie_id: number }[];

function Iframe({ links }: { links: links }) {
  const [currentLink, setCurrentLink] = useState(links[0].link);

  return (
    <div id="player" className="max-w-4xl min-w-max mx-auto p-6 rounded-lg shadow-md mt-20">
      <div className="flex flex-wrap justify-center mb-4">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => setCurrentLink(link.link)}
            className="
            bg-white hover:bg-[#1A1C29] hover:text-white 
            text-[#1A1C29] font-bold py-2 px-4 md:py-1 md:px-2 text-xs md:text-sm 
            rounded m-1 flex-grow hover:border-solid border-2 border-white"
          >
            Server {index + 1}
          </button>
        ))}
      </div>
      <div className="relative h-0 overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={currentLink}
          frameBorder="0"
          width="100%"
          height="100%"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

export default Iframe;
