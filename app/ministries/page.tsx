export default function MinistriesPage() {
  const ministries = [
    {
      id: "ccw",
      image: "/assets/gallery-3.png",
      title: "Rose of Sharon Choir",
      description:
        "The Rose of Sharon Choir is the music ministry of RCCG Rose of Sharon, dedicated to leading the congregation into the presence of God through worship and praise. Our mission is to deepen every believer's relationship with Christ and to spread a message of hope and joy through music",
    },
    {
      id: "celeb-kids",
      image: "/assets/gallery-4.png",
      title: "Youth & Children Ministry",
      description:
        "The Youth & Children Ministry of RCCG Rose of Sharon exists to see every child and young person celebrating endless life in Christ and trained to disciple others for Christ. We are committed to partnering with you and your child for their progress and joy in the faith",
    },
  ];

  return (
    <section className="mb-16 overflow-hidden md:mb-32">
      {/* Hero */}
      <div
        className="flex h-[500px] items-center justify-center bg-black bg-cover bg-center bg-no-repeat lg:h-[700px]"
        style={{ backgroundImage: "url('/assets/groups-bg.png')" }}
      >
        <div className="mx-4 flex w-full max-w-3xl flex-col items-center gap-6">
          <h3 className="rounded-full bg-[#00000078] p-2 text-[10px] font-bold uppercase tracking-wider text-[#FFFFFFCC]">
            🌍 RCCG ROSE OF SHARON
          </h3>
          <h1 className="my-3 max-w-[900px] px-4 text-center font-anton text-[3rem] font-medium uppercase text-white md:px-0 md:text-7xl md:leading-[1.2]">
            Get <span className="text-textRed">involved</span>
          </h1>
          <p className="w-full max-w-2xl text-center text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
            The ministries of Rose of Sharon are expressions of our mandate as a Church and as a community. We serve God by His grace - joyfully.
          </p>
        </div>
      </div>

      {/* Ministry cards */}
      <div id="ministries" className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 md:py-28 md:pb-12 lg:grid-cols-3">
        {ministries.map((ministry, i) => (
          <div key={i} id={ministry.id} className="flex w-full flex-col gap-3 rounded-lg">
            <div
              className="h-[300px] w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${ministry.image}')` }}
            />
            <h1 className="text-lg font-bold underline-offset-8">{ministry.title}</h1>
            <p className="text-[#00000099]">{ministry.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center pb-8">
        <a
          href="/groups"
          className="rounded-[20px] border border-black bg-transparent px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white"
        >
          See all church groups
        </a>
      </div>
    </section>
  );
}
