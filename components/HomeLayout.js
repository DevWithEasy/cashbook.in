import React from "react";
import Link from "next/link";
import logo from "../public/cashbook.svg";
import logo_cash from "../public/image/cashbook_round.svg";
import multipleDevices from "../public/image/multipleDevices.webp";
import linkedin from "../public/image/linkedin.png";
import facebook from "../public/image/facebook.png";
import youtube from "../public/image/youtube.png";
import instragram from "../public/image/instagram.png";
import twitter from "../public/image/twitter.png";
import android from "../public/image/Google_Play_Store_badge.svg";
import apple from "../public/image/IOS_App_Store_badge.svg";
import web from "../public/image/Web_App_badge.svg";
import Image from "next/image";

const HomeLayout = ({ children }) => {
    const links = [
        {
            path: "/",
            title: "Home",
        },
        {
            path: "/payments",
            title: "Payments",
        },
        {
            path: "/security",
            title: "Security",
        },
        {
            path: "/abouts",
            title: "About us",
        },
        {
            path: "/blogs",
            title: "Blog",
        },
    ];
    return (
        <div>
            <div className="sticky top-0 px-10 py-4 bg-white flex justify-between items-center border-b z-50">
                <div>
                    <Link href="/">
                        <a>
                            <Image
                                src={logo.src}
                                alt="logo"
                                className=""
                                height={39}
                                width={150}
                            />
                        </a>
                    </Link>
                </div>
                <div className="flex items-center space-x-4 text-base font-medium">
                    {links.map((link, i) => (
                        <Link key={i} href={link.path}>
                            <a className="px-4 py-2">{link.title}</a>
                        </Link>
                    ))}
                    <Link href="/signin">
                        <a className="px-4 py-2 bg-[#4863D4] text-white rounded-md">
                            Login/Register
                        </a>
                    </Link>
                </div>
            </div>
            {children}
            <div className="mt-32 p-10 flex justify-between bg-[#D1D6ED]">
                <div className="w-8/12 flex space-x-5">
                    <div className="px-2 h-[148px] flex justify-center items-center bg-white rounded-xl">
                        <Image
                            src={logo_cash.src}
                            alt="logo"
                            className=""
                            height={149}
                            width={148}
                        />
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl">Download Now</p>
                        <p className="text-2xl text-gray-500">CashBook Is Available On</p>
                        <div className="w-full pt-5 flex space-x-4">
                            <div>
                                <Image
                                    src={android.src}
                                    alt="logo"
                                    className="mx-2"
                                    height={40}
                                    width={136}
                                />
                            </div>
                            <div>
                                <Image
                                    src={apple.src}
                                    alt="logo"
                                    className=""
                                    height={40}
                                    width={135}
                                />
                            </div>
                            <div>
                                <Image
                                    src={web.src}
                                    alt="logo"
                                    className=""
                                    height={40}
                                    width={136}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12">
                    <img src={multipleDevices.src} className="-mt-32" />
                </div>
            </div>
            <div className="p-10 bg-[#2C324B] text-white">
                <div className="flex justify-between space-x-5">
                    <div className="w-3/12 flex flex-col space-y-5">
                        <h2 className="text-lg font-bold">Company</h2>
                        <Link href="">
                            <a>Blogs</a>
                        </Link>
                        <Link href="">
                            <a>About</a>
                        </Link>
                        <div className="flex space-x-5">
                            <a href="">
                                <img src={linkedin.src} className="w-5 h-5" />
                            </a>
                            <a href="">
                                <img src={facebook.src} className="w-5 h-5" />
                            </a>
                            <a href="">
                                <img src={youtube.src} className="w-5 h-5" />
                            </a>
                            <a href="">
                                <img src={instragram.src} className="w-5 h-5" />
                            </a>
                            <a href="">
                                <img src={twitter.src} className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="w-3/12 flex flex-col space-y-5">
                        <h2 className="text-lg font-bold">Legal</h2>
                        <Link href="">
                            <a>Privacy Policies</a>
                        </Link>
                        <Link href="">
                            <a>FAQs</a>
                        </Link>
                        <Link href="">
                            <a>Terms and Conditions</a>
                        </Link>
                        <Link href="">
                            <a>Grievence Redressal Policy</a>
                        </Link>
                        <Link href="">
                            <a>LivQuik Terms & Conditions</a>
                        </Link>
                    </div>
                    <div className="w-3/12 flex flex-col space-y-5">
                        <h2 className="text-lg font-bold">Contact</h2>
                        <p>
                            4th floor, Site Number: 233 22nd cross 16th Main, Sector 3, HSR
                            Layout Bengaluru, Karnataka, 560102
                        </p>
                        <a href="">+8801717642515</a>
                        <a href="">devwitheasy@gmail.com</a>
                    </div>
                    <div className="w-3/12 flex flex-col space-y-5">
                        <h2 className="text-lg font-bold">Certification</h2>
                    </div>
                </div>
                <p className="py-2">©2023, All are reserved.</p>
            </div>
        </div>
    );
};

export default HomeLayout;
