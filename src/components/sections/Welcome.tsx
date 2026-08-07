import Link from "next/link";

export default function Welcome() {
  return (
    <section className="bg-[#100E1A] px-25 py-21 flex flex-col items-center gap-8 text-center">
      <div className="max-w-[1240px] flex flex-col items-center gap-8">
        <h2 className="text-white text-[48px] font-bold leading-tight">
          Welcome to RCCG Rose of Sharon
        </h2>

        <p className="text-white text-[25px] font-medium leading-tight">
          We believe in the power of God's Word to change lives and value the practical application
          of His Word to make a difference in who we are and what we do.
        </p>

        <p className="text-[#A3A1AF] text-[20px] italic font-normal leading-[30px] max-w-[1240px]">
          Our commitment to the practical application of God's Word is rooted in the belief that true
          transformation occurs when faith is put into action. It is not enough to simply hear the Word;
          we must be doers of the Word, actively engaging with its principles and precepts in our daily
          lives.
          <br />
          In doing so, we become living testimonies of God's grace and power, demonstrating His love
          and truth to a world in desperate need of both.
        </p>

        <Link
          href="#testimony"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] shadow-[19px_19px_40px_rgba(0,0,0,0.10)] hover:bg-[#0000a0] transition-colors"
        >
          Share Your Experience
        </Link>
      </div>
    </section>
  );
}
