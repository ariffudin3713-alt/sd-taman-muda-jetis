import type { Metadata } from "next";
import { MobileShell } from "@/components/mobile/mobile-shell";
import { MobileHero, MobileSectionHeading } from "@/components/mobile/mobile-ui";
import { SPMBForm } from "@/components/spmb-form";
import { CheckIcon, ClockIcon } from "@/components/icons";
import { mobilePageMetadata } from "@/lib/mobile-meta";
import { SPMB, SPMB_REQUIREMENTS, SPMB_SCHEDULE, SPMB_STEPS, SCHOOL } from "@/lib/school";

export const metadata: Metadata = mobilePageMetadata({
  title: "SPMB",
  description:
    "Informasi alur, syarat, dan jadwal pendaftaran peserta didik baru SD Taman Muda Jetis.",
  path: "/spmb",
});

export default function MobileSpmbPage() {
  return (
    <MobileShell active="spmb">
      <MobileHero
        eyebrow={SPMB.period}
        title="Penerimaan Peserta Didik Baru"
        description="Lihat alur, syarat, dan jadwal pendaftaran siswa baru."
      >
        {SPMB.isOpen && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-accent-300 ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Pendaftaran sedang dibuka
          </p>
        )}
      </MobileHero>

      {/* ---------------- Alur ---------------- */}
      <section className="px-4 py-6">
        <MobileSectionHeading eyebrow="Alur" title="Tahapan pendaftaran" />
        <ol className="relative space-y-4 border-l-2 border-dashed border-primary-200 pl-6">
          {SPMB_STEPS.map((item) => (
            <li key={item.step} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.15rem] flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 font-display text-sm font-bold text-white"
              >
                {item.step}
              </span>
              <div className="rounded-2xl border border-primary-100 bg-white p-4">
                <h3 className="font-display text-sm font-bold text-primary-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- Jadwal ---------------- */}
      <section className="bg-white px-4 py-6">
        <MobileSectionHeading eyebrow="Jadwal" title="Jadwal SPMB" />
        <dl className="space-y-2.5">
          {SPMB_SCHEDULE.map((row) => (
            <div
              key={row.stage}
              className="rounded-2xl border border-primary-100 bg-mist p-4"
            >
              <dt className="flex items-center gap-2 text-sm font-semibold text-primary-900">
                <ClockIcon className="h-4 w-4 shrink-0 text-primary-600" />
                {row.stage}
              </dt>
              <dd className="mt-1 pl-6 text-sm text-ink-soft">{row.date}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 rounded-2xl border border-primary-100 bg-primary-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            Kuota {SPMB.quota.toLocaleString("id-ID")} peserta
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {SPMB.contactNote} Untuk pendaftaran langsung, hubungi{" "}
            <a
              href={SCHOOL.phoneHref}
              className="font-semibold text-primary-700 underline underline-offset-2"
            >
              {SCHOOL.phone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---------------- Syarat ---------------- */}
      <section className="px-4 py-6">
        <MobileSectionHeading eyebrow="Persyaratan" title="Berkas yang dibutuhkan" />
        <ul className="space-y-2.5">
          {SPMB_REQUIREMENTS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-primary-100 bg-white p-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-sm leading-relaxed text-ink-soft">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Formulir ---------------- */}
      <section className="bg-white px-4 py-6">
        <MobileSectionHeading eyebrow="Formulir" title="Kirim data minat pendaftaran" />
        <p className="mb-4 text-sm leading-relaxed text-ink-soft">
          Pendaftaran tetap dilakukan langsung di sekolah. Formulir ini membantu panitia
          menyiapkan data calon siswa.
        </p>
        <SPMBForm />
      </section>
    </MobileShell>
  );
}
