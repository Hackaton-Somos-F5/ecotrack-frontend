import Header from "../header/Header";
import WasteCard from "../waste/WasteCard";
import ServiceSection from "../service-section/ServiceSection";
import NextPickupCard from "../pickup/NextPickupCard";
import BottomControls from "../btn-control/BottomControls";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col my-8">
      <div className="flex-1 p-4 my-8">

        <Header />
        <div className="grid grid-cols-2 gap-3 my-8 space-x-8 px-8 mx-8">
            <WasteCard code="ORGANIC" percentage={45} />
            <WasteCard code="PLASTIC" percentage={92} />
            <WasteCard code="PAPER" percentage={40} />
            <WasteCard code="GLASS" percentage={50} />
            <WasteCard code="WASTE" percentage={75} />
            <WasteCard code="HAZARD" percentage={20} />
        </div>

        <ServiceSection />
        <div className="mt-4">
          <NextPickupCard />
        </div>
      </div>
    </div>
  );
}
