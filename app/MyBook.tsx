"use client"
import React from 'react';
import TypewriterEffect from '@/app/components/TypewriterEffect';
import BookComponent from '@/app/components/BookComponent';
import Image from 'next/image';
import SlideFadeIn from './components/SlideFadeIn';

const MyBook: React.FC = () => {

  return (
    <section id="myBook" className="pt-[var(--header-height)] pb-[var(--footer-height)] flex flex-col w-full h-screen overflow-hidden">
      
      <div className="hidden md:flex flex-row justify-center gap-x-8 px-32 items-center h-screen overflow-hidden">
        
        {/* Left Column */}
        <div className="hidden md:flex flex-col">       
          <SlideFadeIn direction="left" className="hidden md:block color-blue font-gopher-mono-semi leading-none text-11xl"><h1 className="opacity-40">myBook</h1></SlideFadeIn>

          <SlideFadeIn direction="right" className="color-dark-blue font-gopher-mono underline text-decoration-color text-4vw md:text-4xl md:pl-32 tracking-largep whitespace-nowrap"><p className="">Beginner To Composer...</p></SlideFadeIn>

          <SlideFadeIn direction="right" className="color-dark-blue font-gopher-mono underline text-decoration-color tracking-largep text-3vw md:text-2xl md:pl-32"><p><TypewriterEffect text="in 14 days" /></p></SlideFadeIn>

          <SlideFadeIn direction="left" className="text-2vw md:text-xs color-dark font-gopher-mono pt-4">
            {`Beginner To Composer In 14 Days is delightfully different. Moving swiftly from theory to action, Ben emerges as the teacher you always wished you'd had, championing radical creative freedom, improvisation and composition - even for beginners. Especially for beginners in fact. "Students need freedom to truly fall in love with their instrument" he writes, "frameworks that pique their curiosity over and over again so that practice becomes play". Whether you're a complete beginner or have a little knowledge up your sleeve, you'll adore this dynamic and intimate guide to learning the piano, peppered with evocative vignettes of a life lived with music at its heart. Best of all, you'll come away with a method you can use time and time again to create your very own music, captured on professional quality lead sheets you can share with other musicians, to bring your work to life. Suitable for adults and a useful resource for teachers. Complements graded and traditional approaches to learning.`}
          </SlideFadeIn>

          {/* Buy Now Links */}
          <SlideFadeIn direction="up" className={`flex flex-col w-full w-auto mt-4 text-sm font-gopher-mono`}>
            <p className="bold color-dark">BUY NOW</p>                
            <a 
                href="https://www.amazon.co.uk/Ben-Spooners-Beginner-Composer-Days/dp/139996769X/ref=sr_1_1?crid=WO4S5PFXTGBM&keywords=beginner+to+composer+in+14+days&qid=1697134011&sprefix=beginner+to+compo%2Caps%2C75&sr=8-1" 
                target="_blank" 
                rel="noopener noreferrer">
                    <span className="hidden xl:inline">- </span><span className="underline color-green">Amazon↑</span>
            </a>
            <a 
                href="https://books.apple.com/gb/book/ben-spooners-beginner-to-composer-in-14-days/id6468330191" 
                target="_blank" 
                rel="noopener noreferrer">
                    <span className="hidden xl:inline">- </span><span className="underline color-green">Apple Books↑</span>
            </a>
          </SlideFadeIn>
        </div>
                        
        {/* Right Column */}
        <BookComponent width={3000} height={3000} direction="right"/>
                  
      </div>    
      {/* Image and Links for Mobile */}
      <div className="flex flex-col justify-center items-center md:hidden h-full space-y-2">        
        <SlideFadeIn direction="right" className="color-dark-blue font-gopher-mono underline text-decoration-color tracking-largep text-4vw"><p>BUY MY BOOK NOW</p></SlideFadeIn>
        
        {/* Buy Now Links */}
        <SlideFadeIn direction="up" className={`flex flex-col items-center w-full w-auto text-sm font-gopher-mono`}>
          <p className="bold color-dark">Beginner To Composer In 14 Days</p>                
          <a 
              href="https://www.amazon.co.uk/Ben-Spooners-Beginner-Composer-Days/dp/139996769X/ref=sr_1_1?crid=WO4S5PFXTGBM&keywords=beginner+to+composer+in+14+days&qid=1697134011&sprefix=beginner+to+compo%2Caps%2C75&sr=8-1" 
              target="_blank" 
              rel="noopener noreferrer">
                  <span className="underline color-green">Amazon↑</span>
          </a>
          <a 
              href="https://books.apple.com/gb/book/ben-spooners-beginner-to-composer-in-14-days/id6468330191" 
              target="_blank" 
              rel="noopener noreferrer">
                  <span className="underline color-green">Apple Books↑</span>
          </a>
        </SlideFadeIn>
      </div>
      
  </section>
  );
}
export default MyBook;