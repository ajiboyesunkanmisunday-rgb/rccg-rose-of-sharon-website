"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_BASE } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

interface GroupItem {
  id: string;
  name: string;
  description?: string;
  groupHead?: { firstName?: string; lastName?: string };
  totalMembers?: number;
  whatsAppLink?: string;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<GroupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/groups/all`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load groups");
        return r.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.content ?? [];
        setGroups(list);
      })
      .catch(() => setError("Unable to load groups at this time. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.75)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[860px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[16px] items-center text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Community</p>
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[72px] font-medium leading-tight w-full" style={vs}>Church Groups</h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[20px] font-normal leading-[1.5] md:leading-[32px]" style={vs}>
            Find your community — connect with a group and grow together in faith.
          </p>
        </div>
      </section>

      {/* Groups grid */}
      <section className="bg-[#100E1A] px-4 sm:px-[40px] lg:px-[80px] xl:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[32px] items-center w-full min-h-[400px]">
        <div className="flex items-center gap-[8px]">
          <Link href="/" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>Home</Link>
          <span className="text-[#A3A1AF]">/</span>
          <span className="text-[#FFFDFD] text-[16px]" style={vs}>Groups</span>
        </div>
        <h2 className="text-[#FFFDFD] text-[28px] md:text-[40px] lg:text-[48px] font-bold text-center" style={vs}>Our Groups</h2>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[220px] rounded-[16px] bg-[#1a1826] animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-[#A3A1AF] text-[18px] text-center" style={vs}>{error}</p>
        )}

        {!loading && !error && groups.length === 0 && (
          <p className="text-[#A3A1AF] text-[18px] text-center" style={vs}>
            No groups found. Please check back soon.
          </p>
        )}

        {!loading && groups.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
            {groups.map((group) => {
              const headName = group.groupHead
                ? `${group.groupHead.firstName ?? ""} ${group.groupHead.lastName ?? ""}`.trim()
                : null;
              return (
                <div
                  key={group.id}
                  className="bg-[#1a1826] rounded-[16px] flex flex-col gap-[16px] p-[24px] border border-[#B5B5F3]/10 hover:border-[#B5B5F3]/30 transition-colors"
                >
                  <div className="flex items-center gap-[12px]">
                    <div className="size-[48px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#FFFDFD] text-[20px] font-bold" style={vs}>
                        {group.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#FFFDFD] text-[18px] font-bold leading-[1.3] truncate" style={vs}>
                        {group.name}
                      </p>
                      {group.totalMembers !== undefined && (
                        <p className="text-[#A3A1AF] text-[13px] font-normal" style={vs}>
                          {group.totalMembers} member{group.totalMembers !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  {group.description && (
                    <p className="text-[#A3A1AF] text-[15px] font-normal leading-[1.6] line-clamp-3" style={vs}>
                      {group.description}
                    </p>
                  )}

                  {headName && (
                    <p className="text-[#B5B5F3] text-[13px] font-normal" style={vs}>
                      Led by {headName}
                    </p>
                  )}

                  {group.whatsAppLink && (
                    <a
                      href={group.whatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-[8px] mt-auto bg-[#25D366] text-white text-[15px] font-medium px-[16px] py-[10px] rounded-[30px] hover:bg-[#1da851] transition-colors"
                      style={vs}
                    >
                      <svg className="size-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Join on WhatsApp
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
