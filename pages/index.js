import Head from 'next/head';
import { TiArrowRightThick } from "react-icons/ti";
import HomeLayout from '../components/HomeLayout';
import HomeSlider from '../components/HomeSlider';
import { c_green, c_main, c_section_hero } from "../public/colors";
import android from '../public/image/Google_Play_Store_badge.svg';
import apple from '../public/image/IOS_App_Store_badge.svg';
import web from '../public/image/Web_App_badge.svg';
import w_image_1 from '../public/image/incomeAndExpense.webp';
import w_image_3 from '../public/image/multipleBusinesses.webp';
import w_image_4 from '../public/image/passbook.webp';
import w_image_5 from '../public/image/reports.webp';
import w_image_2 from '../public/image/staffToBusiness.webp';
import hero_image from '../public/image/uncleWithBlueBg.webp';
import benifit_image from '../public/image/uncleWithoutBg.webp';

export default function Index() {

  const hero_topics = [
    'Track Income & Expenses',
    'Add Your Staff To Business',
    'Set Up Multiple Business',
    'Download PDF & Excel Report'
  ]

  const statuses = [
    {
      icon: '',
      head: '4.5/5',
      title: 'Playstore Rating'
    },
    {
      icon: '',
      head: '3.5 M+',
      title: 'Downloads'
    },
    {
      icon: '',
      head: '5+',
      title: 'Languages'
    },
  ]

  const whyTopics = [
    {
      image: w_image_1.src,
      head: 'Track Income & Expenses',
      title: 'Easy Book-Keeping For Healthy Cashflow'
    },
    {
      image: w_image_2.src,
      head: 'Add Your Staff To Business',
      title: 'Add Team Members, Assign Roles & Manage Business Together'
    },
    {
      image: w_image_3.src,
      head: 'Set Up Multiple Businesses',
      title: 'Manage Multiple Business, Teams & Financial Records From A Single App'
    },
    {
      image: w_image_4.src,
      head: 'Bank Passbook',
      title: 'Unified Dashboard For All Your Bank Accounts'
    },
    {
      image: w_image_5.src,
      head: 'Download PDF & Excel Report',
      title: 'Easily Download & Share With Others'
    },
  ]

  const benifits = [
    '100% Safe and Secure',
    'Easy User Interface',
    '24x7 Customer Support',
    'Verified By Play Protect'
  ]

  return (
    <HomeLayout>
      <Head>
        <title>CashBook - Digital Khata</title>
        <meta name="description" content="CashBook - Digital Khat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ background: c_section_hero }}
        className="px-4 md:px-10 pt-5 md:pt-20 flex flex-col md:flex-row justify-between space-y-10 md:spacce-y-0 overflow-hidden rounded-b-3xl"
      >
        <div
          className="md:w-1/2 space-y-2"
        >
          <h2
            style={{ color: c_main }}
            className="text-3xl md:text-5xl font-semibold"
          >
            Cash Management App
          </h2>
          <h2
            className="text-gray-600 text-2xl md:text-5xl font-semibold"
          >
            For Business Growth
          </h2>
          <ul
            className="py-5 space-y-2"
          >
            {
              hero_topics.map((topic, i) =>
                <li
                  key={i}
                  className="flex items-center space-x-2 md:text-lg"
                >
                  <TiArrowRightThick className='text-[#4863D4]'/>
                  <span>{topic}</span>
                </li>
              )
            }
          </ul>
          <div
            className="w-full md:w-10/12 p-2 flex  space-x-2 bg-white border-2 rounded-md"
          >
            <select
              className="p-2 md:text-xl"
            >
              <option>BD</option>
            </select>
            <input
              type="phone"
              className="w-full p-2 md:text-lg focus:outline-none"
              placeholder="Enter Phone Number"
            />
            <button
              style={{ background: c_green }}
              className="px-6 text-white rounded-md"
            >
              Login/Register
            </button>
          </div>
          <div
            className="pt-10 space-y-2"
          >
            <p
              className=""
            >
              Get Desktop & Mobile App
            </p>
            <div
              className="flex space-x-2"
            >
              <img src={android.src} />
              <img src={apple.src} />
              <img src={web.src} />
            </div>
          </div>
        </div>
        <div
          className="md:w-1/2 flex md:justify-end"
        >
          <img src={hero_image.src}
            className="md:h-[500px] scale-110"
          />
        </div>
      </div>
      <div
        className="md:w-9/12 mx-5 md:mx-auto py-16 flex flex-col md:flex-row justify-between space-y-10 md:space-y-0"
      >
        {statuses.map((status, i) =>
          <div
            key={i}
            className="flex flex-col justify-center items-center space-y-2"
          >
            <p
              style={{ color: c_main }}
              className="text-3xl font-bold"
            >
              {status.head}
            </p>
            <p
              className="text-2xl text-gray-600"
            >
              {status.title}
            </p>
          </div>
        )}
      </div>
      <div
        style={{ background: c_main }}
        className="px-10 pb-[300px] rounded-3xl"
      >
        <h2
          className="py-5 text-3xl md:text-5xl text-white text-center font-semibold"
        >
          Why CashBook App?
        </h2>

        <div
          className='space-y-5'
        >
          {
            whyTopics.map((topic, i) =>
              <div
                key={i}
                className={`flex flex-col md:flex-row justify-between md:space-x-5 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div
                  className={`md:w-1/2 flex flex-col justify-center text-white space-y-2`}
                >
                  <p
                    className={`text-xl text-center md:text-3xl ${i % 2 === 0 ? '' : ' md:text-right'}`}
                  >
                    {topic.head}
                  </p>
                  <p
                    className={`text-center md:text-xl ${i % 2 === 0 ? '' : 'md:text-right'}`}
                  >
                    {topic.title}
                  </p>
                </div>
                <div
                  className='md:w-1/2 flex justify-center'
                >
                  <img
                    src={topic.image}
                    className='w-3/4 md:w-full'
                  />
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div
        style={{ background: c_section_hero }}
        className='w-10/12 mx-auto -mt-[200px] pt-10 flex flex-col md:flex-row justify-between rounded-3xl'
      >
        <div
          className='md:w-1/2'
        >
          <img
            src={benifit_image.src}
            className='-mt-[90px] h-[250px] md:h-[350px] mx-auto scale-125'
          />
        </div>
        <div
          className='md:w-1/2 mt-[50px] md:mt-0 p-6 md:p-0 space-y-5'
        >
          <h2
            className='text-3xl md:text-5xl font-bold'
          >
            Other Benefits
          </h2>
          <ul
            className='space-y-2 md:text-xl'
          >
            {
              benifits.map((topic, i) =>
                <li
                  key={i}
                >
                  * {topic}
                </li>
              )
            }
          </ul>
          <div
            className='pb-5'
          >
            <img
              src={web.src}
              className='h-[60px]'
            />
          </div>
        </div>
      </div>
      <div
        className='px-10 pt-10'
      >
        <h2
          className='py-5 text-center text-3xl md:text-5xl'
        >
          What People Say About Us?
        </h2>
        <HomeSlider />
      </div>
    </HomeLayout>
  )
}