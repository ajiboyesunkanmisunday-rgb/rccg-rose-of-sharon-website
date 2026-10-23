export default function MinistriesPage() {
  const ministries = [
    {
      id: "ccw",
      image: "/ccw.jpg",
      title: "Rose of Sharon Choir",
      description:
        "The Rose of Sharon Choir is the music ministry of RCCG Rose of Sharon, dedicated to creating inspiring music with a strong foundation in faith. Our mission is to produce songs that deepen individuals' relationship with Christ and spread a message of hope and joy through music",
    },
    {
      id: "celeb-kids",
      image: "/celebkids.jpg",
      title: "Kids & Teens Ministry",
      description:
        "The Kids & Teens Ministry is the children's and teens' ministry of RCCG Rose of Sharon. Our vision is to see all children celebrating endless life in Christ and training them to disciple others for Christ. We are committed to partnering with you and your child for their progress and joy in the faith",
    },
  ];

  return (
    <section className="mb-16 overflow-hidden md:mb-32">
      {/* Hero */}
      <div
        className="flex h-[500px] items-center justify-center bg-black bg-cover bg-center bg-no-repeat lg:h-[700px]"
        style={{ backgroundImage: "url('/fire.jpg')" }}
      >
        <div className="mx-4 flex w-full max-w-3xl flex-col items-center gap-6">
          <h3 className="rounded-full bg-[#00000078] p-2 text-[10px] font-bold uppercase tracking-wider text-[#FFFFFFCC]">
            🌍 RCCG ROSE OF SHARON
          </h3>
          <h1 className="my-3 max-w-[900px] px-4 text-center font-anton text-[3rem] font-medium uppercase text-white md:px-0 md:text-7xl md:leading-[1.2]">
            Get <span className="text-textRed">involved</span>
          </h1>
          <p className="w-full max-w-2xl text-center text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
            Rose of Sharon ministries are expressions of our mandate as a Church and as a community. We serve God by His Spirit - joyfully.
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
    </section>
  );
}
