"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const router = useRouter();
  return (
    <main className="w-full">
      <div className="w-full">
        <div className="relative w-full bg-white">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div
              className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6"
              id="signup"
            >
              <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
                <div className="rounded-full bg-white p-1 px-2">
                  <p className="text-sm font-medium">We&apos; hiring</p>
                </div>
                <p className="text-sm font-medium">Join our team &rarr;</p>
              </div>
              <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
                Buy & Sell your Products
              </h1>
              <p className="mt-8 text-lg text-gray-700">
                A free, open-source platform for buying and selling products
                with ease using the power of blockchain.
              </p>
              <form action="" className="mt-8 flex items-start space-x-2">
                <div className="w-full">
                  <button
                    type="button"
                    className="inline-flex w-1/2 items-center justify-center rounded-md bg-gray-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={() => router.push("/signup")}
                  >
                    Get started <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </form>
            </div>
            <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
              <Image src="/1.jpg" alt="" width={640} height={800} priority={true}></Image>
            </div>
          </div>
        </div>
        <div className="mx-auto my-32 max-w-7xl px-2 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
            <div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-9 w-9 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Secured Payments
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Ensuring Safe and Secure Transactions
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                <svg
                  className="h-9 w-9 text-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Fast & Easy to Load
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Fast & Easy way to interact with our platform
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-9 w-9 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Blockchain
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Using the power of blockchain
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-9 w-9 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Buy & Sell
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Buy and sell your products with a ease of a click
              </p>
            </div>
          </div>
        </div>
        <section className="mx-auto max-w-7xl bg-gray-50 px-2 py-10 md:px-0">
          <div>
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Frequently Asked Questions (FAQs)
              </h2>
            </div>
            <div className="mx-auto mt-8 max-w-3xl space-y-4 md:mt-16">
              <div className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
                >
                  <span className="flex text-lg font-semibold text-black">
                    How do I get started?
                  </span>
                  <a href="#signup">
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  </a>
                </button>
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-gray-500">
                    Click on the up arrow button to get started
                  </p>
                </div>
              </div>
              <div className="cursor-pointer rounded-md border border-gray-400 transition-all duration-200">
                <button
                  type="button"
                  className="flex w-full items-start justify-between px-4 py-5 sm:p-6 md:items-center"
                >
                  <span className="flex text-start text-lg font-semibold text-black">
                    What is the requirements to use the platform?
                  </span>
                  <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">
                    <ChevronUp className="hidden h-5 w-5 text-gray-500 md:block" />
                  </a>
                </button>
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-gray-500">
                    You need an Ethereum wallet to use the platform. You can install Metamask on your browser by clicking on the up arrow.
                  </p>
                </div>
              </div>
            </div>
            <p className="textbase mt-6 text-center text-gray-600">
              Can&apos;t find what you&apos;re looking for?{" "}
              <a
                href="#"
                title=""
                className="font-semibold text-black hover:underline"
              >
                Contact our support
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
