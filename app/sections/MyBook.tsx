"use client";
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/app/contexts/GlobalContext';
import TypewriterEffect from '@/app/components/TypewriterEffect';
import BookComponent from '@/app/components/BookComponent';
import SlideFadeIn from '@/app/components/SlideFadeIn';

interface MyBookProps {
  id?: string;
}

const MyBook: React.FC<MyBookProps> = ({ id }) => {    
  const { cartItems, setCartItems, setCartCount, userId } = useGlobalContext();
  const [inCart, setInCart] = useState<boolean>(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false); // For width check

  const itemId = "Beginner To Composer In 14 Days PDF";
  const price = 10.00;

  useEffect(() => {
    const itemInCart = cartItems.some(item => item.itemId === itemId);
    setInCart(itemInCart);
  }, [cartItems, itemId, setInCart]);

  const addToCart = async () => {
    const response = await fetch('/api/addToCart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, price, userId }),
    });

    if (response.ok) {
      const newCartItems = [...cartItems, { itemId, price }];
      setCartItems(newCartItems);
      setCartCount(newCartItems.length);
      setInCart(true);
    }
  };

  const removeFromCart = async () => {
    const response = await fetch(`/api/removeFromCart?itemId=${itemId}&userId=${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const newCartItems = cartItems.filter(item => item.itemId !== itemId);
      setCartItems(newCartItems);
      setCartCount(newCartItems.length);
      setInCart(false);
    }
  };

  // Check for width (used for responsive small device layout)
  useEffect(() => {
    const updateViewportWidth = () => {
      setIsNarrowViewport(window.innerWidth < 768);
    };

    // Check initial width
    updateViewportWidth();

    // Add resize event listener
    window.addEventListener('resize', updateViewportWidth);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  return (
    <section id={id} className="md:pt-[var(--header-height)] md:pb-[var(--footer-height)] flex flex-col w-screen md:h-screen">

      <div className={`flex flex-col md:flex-row justify-center items-center md:gap-x-8 items-center h-auto md:h-screen ${isNarrowViewport ? 'space-y-8' : 'overflow-hidden'}`}>

        {/* Styling for devices wider than md (768px) */}
        {!isNarrowViewport ? (
          <>
            <div className="flex flex-col">       
              <SlideFadeIn direction="left" className="hidden md:block color-blue font-gopher-mono-semi leading-none text-11xl">
                <h1 className="opacity-40">myBook</h1>
              </SlideFadeIn>
              <SlideFadeIn direction="right" className="color-dark-blue font-gopher-mono underline text-decoration-color text-4vw md:text-4xl md:pl-32 tracking-largep whitespace-nowrap">
                <p className="">Beginner To Composer...</p>
              </SlideFadeIn>
              <SlideFadeIn direction="right" className="color-dark-blue font-gopher-mono underline text-decoration-color tracking-largep text-3vw md:text-2xl md:pl-32">
                <p><TypewriterEffect text="in 14 days" /></p>
              </SlideFadeIn>                            
              {/* <SlideFadeIn direction="left" className="w-[80vw] xl:w-[50vw] text-xs color-dark font-gopher-mono pt-4 text-right">
                {`Beginner To Composer In 14 Days is delightfully different. Moving swiftly from theory to action, Ben emerges as the teacher you always wished you'd had, championing radical creative freedom, improvisation and composition - even for beginners. Especially for beginners in fact. "Students need freedom to truly fall in love with their instrument" he writes, "frameworks that pique their curiosity over and over again so that practice becomes play". Whether you're a complete beginner or have a little knowledge up your sleeve, you'll adore this dynamic and intimate guide to learning the piano, peppered with evocative vignettes of a life lived with music at its heart. Best of all, you'll come away with a method you can use time and time again to create your very own music, captured on professional quality lead sheets you can share with other musicians, to bring your work to life. Suitable for adults and a useful resource for teachers. Complements graded and traditional approaches to learning.`}
              </SlideFadeIn> */}              

              <SlideFadeIn direction="up">
                <div className="pt-6 px-24 md:px-0 md:pr-2 text-right text-3vw md:text-sm font-gopher-mono text-dark max-w-3xl">
                  <p>
                  {`"Whether you're a complete beginner or have a little knowledge up your sleeve, you'll adore this dynamic and intimate guide to learning the piano, peppered with evocative vignettes of a life lived with music at its heart. Best of all, you'll come away with a method you can use time and time again to create your very own music, captured on professional quality lead sheets you can share with other musicians, to bring your work to life. Complements graded and traditional approaches to learning."`}
                  </p>
                  <div className="hidden md:block pt-2"><span className="font-gopher-mono-semi">Buy Now: </span>
                    <div 
                      className="inline underline color-green"
                      role="button"
                      tabIndex={0}
                      onClick={inCart ? removeFromCart : addToCart}
                      onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') removeFromCart : addToCart}}
                      > 
                      {inCart ? 'Remove PDF From Cart' : 'Add PDF To Cart'}
                    </div> | 
                    <a 
                      href="https://www.amazon.co.uk/Ben-Spooners-Beginner-Composer-Days/dp/139996769X/ref=sr_1_1?crid=WO4S5PFXTGBM&keywords=beginner+to+composer+in+14+days&qid=1697134011&sprefix=beginner+to+compo%2Caps%2C75&sr=8-1" className="hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                      > Amazon↑
                    </a> | 
                    <a 
                      href="https://books.apple.com/gb/book/ben-spooners-beginner-to-composer-in-14-days/id6468330191" className="hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                      > Apple Books↑
                    </a>                                
                  </div>
                </div>            
              </SlideFadeIn>     

            </div>        
            <BookComponent width={350} height={350} direction="right"/>      
          </>
          ) : (      
            <div className="space-y-6 text-center py-24 px-10 border-b-3 border-thick-border-gray">
                            
              <h1 className="text-7xl sm:text-8xl font-gopher-mono-semi color-blue opacity-40">myBook</h1>              
                                        
              <p className='text-2xl sm:text-3xl font-gopher-mono underline color-dark-blue tracking-wide sm:tracking-large whitespace-nowrap text-decoration-color'>Beginner To Composer...</p>              
                                        
              <p className="text-xl sm:text-2xl font-gopher-mono underline color-dark-blue tracking-wide text-decoration-color"><TypewriterEffect text="in 14 days" /></p>              
                                        
              <SlideFadeIn direction="up">
                <div className="pt-6 px-14 text-3vw font-gopher-mono text-dark w-screen">
                  <p>
                  {`"Whether you're a complete beginner or have a little knowledge up your sleeve, you'll adore this dynamic and intimate guide to learning the piano, peppered with evocative vignettes of a life lived with music at its heart. Best of all, you'll come away with a method you can use time and time again to create your very own music, captured on professional quality lead sheets you can share with other musicians, to bring your work to life. Complements graded and traditional approaches to learning."`}
                  </p>
                  <div className="pt-2"><span className="font-gopher-mono-semi flex flex-col mt-10">Buy Now</span>
                    <div 
                      className="inline underline color-green"
                      role="button"
                      tabIndex={0}
                      onClick={inCart ? removeFromCart : addToCart}
                      onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') removeFromCart : addToCart}}
                      > 
                      {inCart ? 'Remove PDF From Cart' : 'Add PDF To Cart'}
                    </div> | 
                    <a 
                      href="https://www.amazon.co.uk/Ben-Spooners-Beginner-Composer-Days/dp/139996769X/ref=sr_1_1?crid=WO4S5PFXTGBM&keywords=beginner+to+composer+in+14+days&qid=1697134011&sprefix=beginner+to+compo%2Caps%2C75&sr=8-1" className="hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                      > Amazon↑
                    </a> | 
                    <a 
                      href="https://books.apple.com/gb/book/ben-spooners-beginner-to-composer-in-14-days/id6468330191" className="hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                      > Apple Books↑
                    </a>                                
                  </div>
                </div>            
              </SlideFadeIn>   
            
              {/* Book Component */}
              <div className="flex justify-center">
                <BookComponent width={500} height={500} direction="right" />
              </div>
            </div>           
          )}
      </div>
    </section>
  );
};

export default MyBook;

