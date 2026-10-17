import type { Metadata } from "next";
import Link from "next/link";
import { MobileShell } from "@/components/mobile/mobile-shell";
import { MobileHero, MobileSectionHeading } from "@/components/mobile/mobile-ui";
import { FacilityIcon } from "@/components/icons";
import { mobilePageMetadata } from "@/lib/mobile-meta";
import { FACILITIES, HISTORY, MISSIONS, PPDB, SCHOOL, VISION } from "@/lib/school";

export const metadata: Metadata = mobilePageMetadata({
  title: "Profil Sekolah",
  description:
    "Sejarah, visi, misi, dan fasilitas SD Taman Muda Jetis, Jetis, Yogyakarta.",
  path: "/profil",
});

const FACTS = [
  { label: "Tahun berdiri", value: "1995" },
  { label: "Akreditasi", value: "A" },
  { label: "NPSN", value: SCHOOL.npsn },
  { label: "Ekstrakurikuler", value: "8" },
];

export default function MobileProfilPage() {
  return (
    <MobileShell active="profil">
      <MobileHero
        eyebrow="Tentang kami"
        title="Profil Sekolah"
        description={`Mengenal lebih dekat sejarah, visi, misi, dan fasilitas pendidikan kami. ${SCHOOL.tagline}`}
      />

      {/* ---------------- Visi ---------------- */}
      <section className="px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary-800 p-5 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-300">
              Visi
            </p>
            <h2 className="mt-1.5 font-display text-lg font-bold">Visi Sekolah</h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-100">{VISION}</p>
          </div>
        </div>
      </section>

      {/* ---------------- Misi ---------------- */}
      <section className="px-4 pb-6">
        <MobileSectionHeading eyebrow="Misi" title="Misi sekolah" />
        <ul className="space-y-2.5">
          {MISSIONS.map((mission) => (
            <li
              key={mission}
              className="flex gap-3 rounded-2xl border border-primary-100 bg-white p-4"
            >
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-400" />
              <span className="text-sm leading-relaxed text-ink-soft">{mission}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Sejarah ---------------- */}
      <section className="bg-white px-4 py-6">
        <MobileSectionHeading eyebrow="Sejarah" title="Sejarah singkat" />
        <p className="border-l-4 border-primary-600 pl-4 text-sm leading-relaxed text-ink-soft">
          {HISTORY}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-2.5">
          {FACTS.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-primary-100 bg-mist p-4">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                {fact.label}
              </dt>
              <dd className="mt-1 font-display text-xl font-extrabold text-primary-800">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------- Fasilitas ---------------- */}
      <section className="px-4 py-6">
        <MobileSectionHeading eyebrow="Sarana" title="Fasilitas sekolah" />
        <div className="space-y-2.5">
          {FACILITIES.map((facility) => (
            <div
              key={facility.name}
              className="flex items-center gap-3.5 rounded-2xl border border-primary-100 bg-white p-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <FacilityIcon name={facility.icon} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-bold text-primary-900">
                  {facility.name}
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      {PPDB.isOpen && (
        <section className="mx-4 mb-6 rounded-3xl bg-gradient-to-br from-primary-800 to-primary-700 p-5 text-center">
          <h2 className="font-display text-lg font-bold text-white">Tertarik mendaftar?</h2>
          <p className="mt-2 text-sm leading-relaxed text-primary-100">
            Lihat alur, syarat, dan jadwal pendaftaran siswa baru {PPDB.period}.
          </p>
          <Link
            href="/ppdb"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent-400 px-4 py-3 text-sm font-semibold text-primary-950 active:scale-[0.98]"
          >
            Cek syarat pendaftaran
          </Link>
        </section>
      )}
    </MobileShell>
  );
}
