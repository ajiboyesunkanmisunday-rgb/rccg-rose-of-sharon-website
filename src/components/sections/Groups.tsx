const groups = ["MEN", "WOMEN", "YOUTH"];

function GroupCard() {
  return (
    <div className="flex-1 h-[308px] px-4 py-8 bg-[#100E1A]/35 flex flex-col justify-between items-center">
      <div className="text-center">
        <span className="text-[#FFFDFD] text-[39px] font-semibold">Let&apos;s Tailor</span>
        {" "}
        <span className="font-playfair text-[#9B96FE] text-[36px] italic font-bold leading-[46.8px]">
          Your Experience.
        </span>
      </div>
      <p className="text-[#FFFDFD] text-base font-normal leading-6 text-center">
        Join the church groups and see what God can do through you
      </p>
      <div className="flex gap-3 w-full">
        {groups.map((group, i) => (
          <button
            key={group}
            className={`flex-1 py-3 rounded-[24px] text-base font-medium transition-colors hover:opacity-80 border-2 ${
              i === 1
                ? "border-[#9B96FE] text-[#9B96FE]"
                : "border-[#FFFDFD] text-[#FFFDFD]"
            }`}
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Groups() {
  return (
    <section
      id="groups"
      className="flex"
      style={{
        backgroundImage: "url('/groups-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <GroupCard />
      <GroupCard />
      <GroupCard />
    </section>
  );
}
