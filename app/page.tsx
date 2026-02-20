import { AdviceProvider } from "@/components/Stepper";
import { Stepper } from "@/components/Stepper";
import { SettingsDrawer } from "@/components/SettingsDrawer";
import { PreviewPanels } from "@/components/PreviewPanels";

export default function Page() {
  return (
    <AdviceProvider>
      <main className="mx-auto max-w-6xl p-4 md:p-8">
       <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
         <div>
           <h1 className="text-2xl font-semibold tracking-tight">Gübre Tavsiye Motoru</h1>
           <p className="text-sm text-neutral-600">
             3 katmanlı (referans → sınırlandırma → ayarlama) mantıkla çalışan demo.
           </p>
         </div>
         <SettingsDrawer />
       </header>

       <div className="grid gap-6 md:grid-cols-5">
         <section className="md:col-span-3">
           <Stepper />
         </section>
         <aside className="md:col-span-2">
           <PreviewPanels />
         </aside>
       </div>
     </main>
    </AdviceProvider>
  );
}
