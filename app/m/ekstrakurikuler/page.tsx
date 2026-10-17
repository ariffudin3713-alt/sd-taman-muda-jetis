import type { Metadata } from "next";
import Link from "next/link";
import { MobileShell } from "@/components/mobile/mobile-shell";
import { MobileHero, MobileSectionHeading } from "@/components/mobile/mobile-ui";
import { ClockIcon } from "@/components/icons";
import { mobilePageMetadata } from "@/lib/mobile-meta";
import { EXTRACURRICULAR, EXTRACURRICULAR_TONES, SCHOOL } from "@/lib/school";

export const metadata: Metadata = mobilePageMetadata({
  title: "Ekstrakurikuler",
  description:
    "Daftar kegiatan ekstrakurikuler SD Taman Muda Jetis: Pramuka, Paskibra, PMR, Tahfidz, olahraga, klub komputer, dan seni.",
  path: "/ekstrakurikuler",
});

/** Kelompokkan kegiatan per kategori, urut sesuai kemunculan pertama. */
type ExtracurricularItem = (typeof EXTRACURRICULAR)[number];

function groupByCategory() {
  const groups = new Map<string, ExtracurricularItem[]>();
  for (const item of EXTRACURRICULAR) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }
  return [...groups.entries()];
}

export default function MobileEkstrakurikulerPage() {
  const groups = groupByCategory();

  return (
    <MobileShell active="ekstrakurikuler">
      <MobileHero
        eyebrow="Pengembangan diri"
        title="Ekstrakurikuler"
        description="Wadah bagi siswa menemukan minat, bakat, dan tumbuh di luar kelas."
      />

      <div className="space-y-6 px-4 py-6">
        {groups.map(([category, items]) => (
          <section key={category}>
            <MobileSectionHeading title={category} />
            <div className="space-y-2.5">
              {items.map((item) => (
                <article
                  key={item.name}
                  className="rounded-2xl border border-primary-100 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-bold leading-snug text-primary-900">
                      {item.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${EXTRACURRICULAR_TONES[item.category]}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                  <p className="mt-3 flex items-center gap-2 rounded-xl bg-primary-50 px-3 py-2.5 text-xs font-medium text-primary-800">
                    <ClockIcon className="h-4 w-4 shrink-0" />
                    {item.schedule}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <p className="pt-2 text-center text-xs leading-relaxed text-ink-soft">
          Jadwal dapat berubah sewaktu-waktu. Hubungi{" "}
          <a href={SCHOOL.phoneHref} className="font-semibold text-primary-700 underline underline-offset-2">
            {SCHOOL.phone}
          </a>
        </p>
      </div>

      <section className="mx-4 mb-6 rounded-3xl border border-primary-100 bg-white p-5 text-center">
        <h2 className="font-display text-lg font-bold text-primary-900">Tertarik bergabung?</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Pendaftaran ekstrakurikuler dibuka pada awal tahun ajaran. Hubungi wali kelas untuk
          informasi lebih lanjut.
        </p>
        <Link
          href="/kontak"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary-700 px-4 py-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          Hubungi sekolah
        </Link>
      </section>
    </MobileShell>
  );
}
