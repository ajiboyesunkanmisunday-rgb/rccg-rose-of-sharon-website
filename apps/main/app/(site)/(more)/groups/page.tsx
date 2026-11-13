"use client";

import { Hero } from "@ros/shared/kit/ui";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link, { A } from "@ros/shared/link";
import { API_BASE } from "@ros/shared/api";


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
    <div>
      <Hero pill="🌍 COMMUNITY" title={<>Church <span className="text-textRed">Groups</span></>} subtitle="Find your community — connect with a group and grow together in faith." bg="/assets/hero-bg.png" />

      {/* Groups grid */}
      <section className="ros:bg-[#000000] ros:px-4 ros:sm:px-[40px] ros:lg:px-[80px] ros:xl:px-[120px] ros:py-[60px] ros:md:py-[84px] ros:flex ros:flex-col ros:gap-[32px] ros:items-center ros:w-full ros:min-h-[400px]">
        <div className="ros:flex ros:items-center ros:gap-[8px]">
          <Link href="/" className="ros:text-[#FFFFFFB3] ros:text-[16px] ros:hover:underline">Home</Link>
          <span className="ros:text-[#A3A1AF]">/</span>
          <span className="ros:text-[#FFFDFD] ros:text-[16px]">Groups</span>
        </div>
        <h2 className="ros-anton ros:uppercase ros:text-[#FFFDFD] ros:text-[28px] ros:md:text-[40px] ros:lg:text-[48px] ros:text-center">Our Groups</h2>

        {loading && (
          <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:lg:grid-cols-3 ros:gap-[24px] ros:w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="ros:h-[220px] ros:rounded-[16px] ros:bg-[#111111] ros:animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="ros:text-[#A3A1AF] ros:text-[18px] ros:text-center">{error}</p>
        )}

        {!loading && !error && groups.length === 0 && (
          <p className="ros:text-[#A3A1AF] ros:text-[18px] ros:text-center">
            No groups found. Please check back soon.
          </p>
        )}

        {!loading && groups.length > 0 && (
          <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:lg:grid-cols-3 ros:gap-[24px] ros:w-full">
            {groups.map((group) => {
              const headName = group.groupHead
                ? `${group.groupHead.firstName ?? ""} ${group.groupHead.lastName ?? ""}`.trim()
                : null;
              return (
                <div
                  key={group.id}
                  className="ros:bg-[#111111] ros:rounded-[16px] ros:flex ros:flex-col ros:gap-[16px] ros:p-[24px] ros:border ros:border-[#FFFFFFB3]/10 ros:hover:border-[#FFFFFFB3]/30 ros:transition-colors"
                >
                  <div className="ros:flex ros:items-center ros:gap-[12px]">
                    <div className="ros:size-[48px] ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:flex-shrink-0">
                      <span className="ros:text-[#FFFDFD] ros:text-[20px] ros:font-bold">
                        {group.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ros:flex-1 ros:min-w-0">
                      <p className="ros:text-[#FFFDFD] ros:text-[18px] ros:font-bold ros:leading-[1.3] ros:truncate">
                        {group.name}
                      </p>
                      {group.totalMembers !== undefined && (
                        <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:font-normal">
                          {group.totalMembers} member{group.totalMembers !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  {group.description && (
                    <p className="ros:text-[#A3A1AF] ros:text-[15px] ros:font-normal ros:leading-[1.6] ros:line-clamp-3">
                      {group.description}
                    </p>
                  )}

                  {headName && (
                    <p className="ros:text-[#FFFFFFB3] ros:text-[13px] ros:font-normal">
                      Led by {headName}
                    </p>
                  )}

                  {group.whatsAppLink && (
                    <A
                      href={group.whatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ros:flex ros:items-center ros:justify-center ros:gap-[8px] ros:mt-auto ros:bg-[#25D366] ros:text-white ros:text-[15px] ros:font-medium ros:px-[16px] ros:py-[10px] ros:rounded-[30px] ros:hover:bg-[#1da851] ros:transition-colors"
                     
                    >
                      <svg className="ros:size-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Join on WhatsApp
                    </A>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
