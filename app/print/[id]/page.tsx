import { getSavedAdvice } from "@/lib/storage";
import { PdfButton } from "@/components/PdfButton";

export default function PrintPage({ params }: { params: { id: string } }) {
  const saved = getSavedAdvice(params.id);
  if (!saved) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Kayıt bulunamadı</h1>
        <p className="text-neutral-600">ID: {params.id}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 print:p-0">
      <div className="mb-4 flex items-center justify-between print:hidden">
        <h1 className="text-xl font-semibold">Yazdır / PDF</h1>
        <PdfButton />
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 print:shadow-none print:ring-0">
        <h2 className="text-lg font-semibold">{saved.project.name}</h2>
        <p className="text-sm text-neutral-600">{saved.project.crop} • {saved.project.region}</p>

        <hr className="my-4" />

        <h3 className="font-semibold">Öneri Özeti</h3>
        <ul className="mt-2 list-disc pl-5 text-sm">
          <li>N: {saved.result.N?.doseKgPerDa ?? "-"} kg/da</li>
          <li>P2O5: {saved.result.P2O5?.doseKgPerDa ?? "-"} kg/da</li>
          <li>K2O: {saved.result.K2O?.doseKgPerDa ?? "-"} kg/da</li>
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold">Uygulama Programı</h3>
        <div className="mt-2 text-sm">
          {saved.result.schedule.length === 0 ? (
            <p className="text-neutral-600">Program yok.</p>
          ) : (
            <ol className="list-decimal pl-5">
              {saved.result.schedule.map((s, idx) => (
                <li key={idx}>
                  {s.when}: {s.what} ({s.amount})
                </li>
              ))}
            </ol>
          )}
        </div>

        <hr className="my-4" />

        <h3 className="font-semibold">Açıklanabilirlik</h3>
        <pre className="mt-2 overflow-auto rounded-xl bg-neutral-50 p-3 text-xs ring-1 ring-neutral-200">
{JSON.stringify(saved.result.explain, null, 2)}
        </pre>
      </section>
    </main>
  );
}
