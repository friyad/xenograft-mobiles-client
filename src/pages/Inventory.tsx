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
    <DashboardLayout title="Inventory">
      <section className="">
        <div className="sticky top-0 bg-cusGray-100 p-7 md:p-4 lg:p-6 3xl:p-8 z-40">
          <div className="flex justify-between items-center gap-3 lg:gap-8">
            <div className="flex w-full lg:w-11/12 items-center space-x-2">
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
                className="uppercase"
              >
                Search
              </Button>
            </div>

            <div className="justify-end items-center gap-3 hidden xsm:flex">
              <Button
                onClick={() => dispatch(setCardView(true))}
                variant={cardView ? "destructive" : "outline"}
                size="icon"
                className={`${cardView ? "bg-primary hover:bg-primary" : ""}`}
              >
                <Grid2X2 className="size-5 2xl:size-6" />
              </Button>
              <Button
                onClick={() => dispatch(setCardView(false))}
                variant={!cardView ? "destructive" : "outline"}
                size="icon"
                className={`${!cardView ? "bg-primary hover:bg-primary" : ""}`}
              >
                <Rows3 className="size-5 2xl:size-6" />
              </Button>
            </div>

            <Button
              size="lg"
              variant="default"
              onClick={() =>
                navigate("/inventory/add", { unstable_viewTransition: true })
              }
              className="uppercase flex justify-center items-center gap-1 px-3 lg:px-5"
            >
              <PlusIcon className="size-5" />{" "}
              <span className="hidden lg:inline-block">Add Smartphone</span>
            </Button>
          </div>

          <Filter />
        </div>

        <div
          className={`grid gap-3 2xl:gap-6 px-7 md:px-4 lg:px-6 3xl:px-8 pb-8 ${
            cardView
              ? "grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 min-[2200px]:grid-cols-6"
              : "grid-cols-1 xl:grid-cols-2"
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
