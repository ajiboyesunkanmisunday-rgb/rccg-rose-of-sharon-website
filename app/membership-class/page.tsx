"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MembershipClassPage() {
  return (
    <div className="bg-[#F5F5EF]">
      {/* Black header */}
      <div className="flex min-h-[200px] items-center justify-center bg-black p-4">
        <div className="text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-anton text-3xl uppercase md:text-4xl"
            
          >
            Welcome to Rose of Sharon{" "}
            <span className="text-textRed">Membership classes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-3 max-w-xl text-gray-300"
          >
            Our Membership Classes get you up to speed with accurate scripture-based teachings designed to create a strong bedrock for your spiritual growth
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/membership-class/new"
              className="rounded-[20px] border border-white bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-black hover:bg-transparent hover:text-white"
            >
              NEW ENROLMENT
            </Link>
            <Link
              href="/membership-class/completed"
              className="rounded-[20px] border border-[#FFFFFF29] bg-[#FFFFFF29] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:bg-white hover:text-black"
            >
              COMPLETED CLASS
            </Link>
          </motion.div>
        </div>
      </div>

      {/* OUR CLASSES section */}
      <div className="mx-auto max-w-xl bg-[#F5F5EF] py-12 md:max-w-full md:py-16">
        <h6 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-center text-xs font-bold tracking-widest text-[#00000099]">
          🌍 COMMUNITY
        </h6>
        <h2 className="my-1.5 text-center text-2xl font-bold leading-10 tracking-widest md:my-3 md:text-[32px]">
          OUR CLASSES
        </h2>
        <p className="text-center font-medium text-[#000000B2] md:text-lg">
          Enrol in one of our membership classes
        </p>

        <div className="space-y-12 md:space-y-24">
          {/* New Enrollment */}
          <div className="mx-auto mt-8 flex max-w-6xl flex-col-reverse gap-4 bg-white p-4 md:mt-12 md:grid md:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="flex max-w-sm flex-col items-center gap-3 px-4">
                <h6 className="text-center text-sm font-bold tracking-widest text-[#00000099]">
                  MEMBERSHIP CLASS
                </h6>
                <h2 className="text-center font-anton text-3xl md:text-6xl">
                  NEW{" "}
                  <span className="block font-anton text-3xl text-textRed md:text-6xl">
                    ENROLLMENT
                  </span>
                </h2>
                <p className="my-2 max-w-[345px] text-center text-sm text-[#000000B2] md:text-base">
                  Sign up for the next batch of our Membership Class
                </p>
                <Link
                  href="/membership-class/new"
                  className="rounded-[20px] border border-black bg-transparent px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-black hover:bg-black hover:text-white"
                >
                  enrol now
                </Link>
              </div>
            </div>
            <Image
              src="/assets/gallery-1.png"
              alt=""
              width={6720}
              height={4480}
              className="max-h-[400px] object-contain"
            />
          </div>

          {/* Make Up Classes */}
          <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 bg-white p-4 md:mt-12 md:grid-cols-2">
            <div
              className="bg-cover bg-top bg-no-repeat py-32 sm:py-40 md:py-48"
              style={{ backgroundImage: "url('/assets/gallery-7.png')" }}
            />
            <div className="flex items-center justify-center">
              <div className="flex max-w-sm flex-col items-center gap-3 px-4">
                <h6 className="text-center text-sm font-bold tracking-widest text-[#00000099]">
                  MEMBERSHIP CLASS
                </h6>
                <h2 className="text-center font-anton text-3xl md:text-6xl">
                  MAKE UP{" "}
                  <span className="block font-anton text-3xl text-textRed md:text-6xl">
                    CLASSES
                  </span>
                </h2>
                <p className="my-2 max-w-[345px] text-center text-sm text-[#000000B2] md:text-base">
                  Missed a Class? Catch up here.
                </p>
                <Link
                  href="/membership-class/makeup"
                  className="rounded-[20px] border border-black bg-transparent px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-black hover:bg-black hover:text-white"
                >
                  Catch Up
                </Link>
              </div>
            </div>
          </div>

          {/* Completed Classes */}
          <div className="mx-auto mt-8 flex max-w-6xl grid-cols-1 flex-col-reverse gap-4 bg-white p-4 md:mt-12 md:grid md:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="flex max-w-sm flex-col items-center gap-3 px-4">
                <h6 className="text-center text-sm font-bold tracking-widest text-[#00000099]">
                  MEMBERSHIP CLASS
                </h6>
                <h2 className="text-center font-anton text-3xl md:text-6xl">
                  COMPLETED{" "}
                  <span className="block font-anton text-3xl text-textRed md:text-6xl">
                    CLASSES
                  </span>
                </h2>
                <p className="my-2 max-w-[345px] text-center text-sm text-[#000000B2] md:text-base">
                  Completed all Classes? Register to get your certificate
                </p>
                <Link
                  href="/membership-class/completed"
                  className="rounded-[20px] border border-black bg-transparent px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-black hover:bg-black hover:text-white"
                >
                  Claim your Certificate
                </Link>
              </div>
            </div>
            <Image
              src="/assets/gallery-3.png"
              alt=""
              width={3000}
              height={2000}
              className="max-h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
