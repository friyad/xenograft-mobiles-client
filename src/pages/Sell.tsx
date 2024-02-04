import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SetStateAction, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useGetSmartphonesQuery } from "@/redux/features/smartphone/smartphoneAPI";
import { ISmartPhone2 } from "@/types/globalTypes";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog } from "@/components/ui/dialog";
import SellNowForm from "@/components/sell/SellNowForm";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSmartphonesQuery(undefined);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [sellNowOpen, setSellNowOpen] = useState(false);
  const [phoneData, setPhoneData] = useState(null);

  return (
    <>
      <Dialog open={sellNowOpen} onOpenChange={setSellNowOpen}>
        <DashboardLayout title="Sell">
          <section className="p-7 md:p-4 lg:p-6 3xl:p-8 min-h-screen md:min-h-[80vh]">
            <div className="flex justify-end items-center">
              <Button
                onClick={() =>
                  navigate("/sale-history", {
                    unstable_viewTransition: true,
                  })
                }
                variant="outline"
                size="lg"
              >
                View Seles History
              </Button>
            </div>

            <div className="flex justify-center items-center mt-5 h-[40vh]">
              <div className="grid gap-6 2xl:gap-8 3xl:gap-10 max-w-sm mxl:max-w-md 3xl:max-w-lg w-full">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div className="grid gap-1">
                      <Label>Select a Smartphone</Label>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between !h-12 xl:!h-14 2xl:!h-16 3xl:!h-20"
                      >
                        {value
                          ? data?.data &&
                            data.data.find(
                              (phone: ISmartPhone2) => phone._id === value
                            )?.name
                          : "Select smartphones..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="xsm:w-[384px] mxl:w-[448px] 3xl:w-[512px] max-h-[400px] overflow-auto p-0">
                    <Command>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {!isLoading
                          ? data &&
                            data.data.map((phone: ISmartPhone2) => (
                              <CommandItem
                                key={phone._id}
                                value={phone._id}
                                onSelect={(
                                  currentValue: SetStateAction<string>
                                ) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                                className="py-3 px-0 cursor-pointer"
                              >
                                <Check
                                  className={cn(
                                    "mx-2 size-4",
                                    value === phone._id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex justify-between items-center gap-5">
                                  <div className="w-8 xl:w-10 border">
                                    <img src={phone.images[0]} alt="" />
                                  </div>

                                  <div>
                                    <h3 className="text-sm xl:text-base font-semibold text-cusBlack">
                                      {phone.name}
                                    </h3>
                                    <div className="flex flex-wrap justify-start items-center gap-2 mt-1 xl:mt-3 text-2xs xl:text-xs 2xl:text-sm text-cusBlack/80">
                                      <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                                        <span>${phone.price}</span>
                                      </div>
                                      <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                                        <span>Quantity: {phone.quantity}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CommandItem>
                            ))
                          : [1, 2, 3, 4, 5].map((item) => {
                              return (
                                <CommandItem
                                  key={item}
                                  className="p-1 cursor-pointer"
                                >
                                  <Skeleton className="w-full h-12 md:h-14 mxl:h-16 3xl:h-20" />
                                </CommandItem>
                              );
                            })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={() => {
                    if (value !== "") {
                      setSellNowOpen(true);
                      setPhoneData(
                        data?.data.find((i: ISmartPhone2) => i._id === value)
                      );
                    }
                  }}
                  variant="default"
                  size="lg"
                >
                  Sell
                </Button>
              </div>
            </div>
          </section>
        </DashboardLayout>

        {phoneData && (
          <SellNowForm phone={phoneData} setSellNowOpen={setSellNowOpen} />
        )}
      </Dialog>
    </>
  );
};

export default Sell;
