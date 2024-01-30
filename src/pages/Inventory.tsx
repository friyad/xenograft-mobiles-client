import Filter from "@/components/inventory/Filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Grid2X2, PlusIcon, Rows3 } from "lucide-react";
import SmartPhoneCard from "@/components/inventory/SmartPhoneCard";

const Inventory = () => {
  return (
    <DashboardLayout>
      <section className="">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-cusBlack uppercase">
            Inventory
          </h1>
        </div>

        <div className="flex justify-between items-center mt-3 gap-8">
          <div className="flex w-11/12 items-center space-x-2">
            <Input
              type="text"
              placeholder="Search..."
              className="transition-none border-2 border-slate-200 focus-visible:ring-0"
            />
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="uppercase h-12"
            >
              Search
            </Button>
          </div>

          <div className="flex justify-end items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-14 bg-transparent"
            >
              <Grid2X2 className="size-6" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-14 bg-primary hover:bg-primary border-cusBlack hover:border-primary"
            >
              <Rows3 className="size-6" />
            </Button>
          </div>

          <Button
            size="lg"
            variant="default"
            className="uppercase flex justify-center items-center gap-1 px-5 h-12"
          >
            <PlusIcon className="w-5 h-auto" /> <span>Add Smartphone</span>
          </Button>
        </div>

        <Filter />

        <div className="grid grid-cols-5 gap-6 mt-8">
          {[1, 2, 3, 4, 5].map((item) => {
            return <SmartPhoneCard key={item} />;
          })}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Inventory;
