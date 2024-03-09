import Head from "next/head";
import Header from "../components/Header";
import HomeLayout from "../components/HomeLayout";

export default function About() {
    return (
        <HomeLayout>
            <div className="relative flex justify-center bg-gray-300 min-h-screen pt-16 pb-4">
                <Head>
                    <title>Cashbook App About</title>
                    <meta name="description" content="Cashbook app About" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <div className="mx-4 p-4 md:w-8/12 bg-gray-100 rounded-md space-y-3">
                    
                </div>
            </div>
        </HomeLayout>

    )
}