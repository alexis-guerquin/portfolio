import { FileTextIcon, Repeat2Icon, RocketIcon } from "@animateicons/react/lucide";
import LoopingAnimateIcon from "@/components/LoopingAnimateIcon";
import { Locale } from "@/data/site";

const steps = [
  { icon: Repeat2Icon, number: "1.", text: "Échangeons sur votre besoin" },
  { icon: FileTextIcon, number: "2.", text: "Définissons la mission" },
  { icon: RocketIcon, number: "3.", text: "Faisons avancer le projet" },
];

export default function ProcessStrip({ locale }: { locale: Locale }) {
  const localizedSteps = locale === "fr" ? steps : [{ icon: Repeat2Icon, number: "1.", text: "Let's discuss your needs" }, { icon: FileTextIcon, number: "2.", text: "Let's define the project" }, { icon: RocketIcon, number: "3.", text: "Let's move it forward" }];
  return (
    <section className="site-column border-y border-black/[.10] px-5 py-16 sm:py-20">
      <div className="mx-auto grid max-w-[920px] gap-3 sm:grid-cols-3 sm:gap-4">
        {localizedSteps.map(({ icon: Icon, number, text }) => (
          <div key={text} className="process-step group flex min-w-0 items-center gap-3 rounded-[16px] border border-black/[.12] bg-[#f4f4f4] p-2.5 text-sm font-semibold shadow-[0_5px_14px_rgba(0,0,0,.05),0_2px_0_white] sm:p-3 sm:text-base">
            <span className="grid shrink-0 rounded-[12px] border border-black/[.10] bg-[#ececec] p-1 shadow-[0_2px_0_white]" aria-hidden="true">
              <span className="process-icon grid size-12 place-items-center rounded-[9px] border border-black/[.10] bg-white">
                <LoopingAnimateIcon icon={Icon} size={30} duration={1.15} />
              </span>
            </span>
            <span className="min-w-0"><b>{number}</b> {text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
