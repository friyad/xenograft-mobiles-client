import Filter from "@/components/inventory/Filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Grid2X2, PlusIcon, Rows3 } from "lucide-react";
import SmartPhoneCard from "@/components/inventory/SmartPhoneCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCardView } from "@/redux/features/smartphone/smartphoneSlice";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cardView } = useAppSelector((state) => state.smartphone);

  return (
    <DashboardLayout>
      <section className="">
        <div className="sticky top-0 bg-cusGray-100 p-8 pb-3 z-40">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-black text-cusBlack uppercase">
              Inventory
            </h1>
          </div>

          <div className="flex justify-between items-center mt-3 gap-8">
            <div className="flex w-11/12 items-center space-x-2">
              <Input
                autoFocus
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
                onClick={() => dispatch(setCardView(true))}
                variant={cardView ? "destructive" : "outline"}
                size="icon"
                className={`h-12 w-14 ${
                  cardView ? "bg-primary hover:bg-primary" : ""
                }`}
              >
                <Grid2X2 className="size-6" />
              </Button>
              <Button
                onClick={() => dispatch(setCardView(false))}
                variant={!cardView ? "destructive" : "outline"}
                size="icon"
                className={`h-12 w-14 ${
                  !cardView ? "bg-primary hover:bg-primary" : ""
                }`}
              >
                <Rows3 className="size-6" />
              </Button>
            </div>

            <Button
              size="lg"
              variant="default"
              onClick={() =>
                navigate("/inventory/add", { unstable_viewTransition: true })
              }
              className="uppercase flex justify-center items-center gap-1 px-5 h-12"
            >
              <PlusIcon className="w-5 h-auto" /> <span>Add Smartphone</span>
            </Button>
          </div>

          <Filter />
        </div>

        <div
          className={`grid gap-6 mt-5 px-8 pb-8 ${
            cardView ? "grid-cols-5" : "grid-cols-2"
          }`}
        >
          {[1, 2, 3, 4, 5].map((item) => {
            return <SmartPhoneCard key={item} cardView={cardView} />;
          })}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Inventory;
