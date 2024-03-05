import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { c_section_hero } from '../public/colors';
import user_img from '../public/image/profile.png'
import {isMobile} from 'react-device-detect'

const HomeSlider = () => {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 1 : 2,
        slidesToScroll: 1
    };
    
    return (
        <div>
            <Slider {...settings}>
                <div
                    className='p-5 pt-24'
                >
                    <div
                        className='p-4 flex flex-col justify-center items-center bg-[#EDEFFB] rounded-3xl'
                    >
                        <img
                            src={user_img.src}
                            className='h-[150px] w-[150px] -mt-[90px] rounded-full'
                        />
                        <p
                            className='text-xl font-semibold'
                        >
                            Robiul Awal
                        </p>
                        <p
                            className='text-gray-500'
                        >
                            CEO AmaderDoctor
                        </p>
                        <p
                            className='text-4xl font-semibold text-yellow-500'
                        >
                            * * * * *
                        </p>
                        <p
                            className='text-gray-500'
                        >
                            Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story.
                        </p>
                    </div>
                </div>
                <div
                    className='p-5 pt-24'
                >
                    <div
                        className='p-4 flex flex-col justify-center items-center bg-[#EDEFFB] rounded-3xl'
                    >
                        <img
                            src={user_img.src}
                            className='h-[150px] w-[150px] -mt-[90px] rounded-full'
                        />
                        <p
                            className='text-xl font-semibold'
                        >
                            Rubel Islam
                        </p>
                        <p
                            className='text-gray-500'
                        >
                            ED AmaderDoctor
                        </p>
                        <p
                            className='text-4xl font-semibold text-yellow-500'
                        >
                            * * * * *
                        </p>
                        <p
                            className='text-gray-500'
                        >
                            Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story.
                        </p>
                    </div>
                </div>

                <div
                    className='p-5 pt-24'
                >
                    <div
                        className='p-4 flex flex-col justify-center items-center bg-[#EDEFFB] rounded-3xl'
                    >
                        <img
                            src={user_img.src}
                            className='h-[150px] w-[150px] -mt-[90px] rounded-full'
                        />
                        <p
                            className='text-xl font-semibold'
                        >
                            Rasel Islam
                        </p>
                        <p
                            className='text-gray-500'
                        >
                            ED AmaderDoctor
                        </p>
                        <p
                            className='text-4xl font-semibold text-yellow-500'
                        >
                            * * * * *
                        </p>
                        <p
                            className='text-gray-500'
                        >
                            Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story.
                        </p>
                    </div>
                </div>

            </Slider>
        </div>
    );
};

export default HomeSlider;