import Filter from "@/components/inventory/Filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Grid2X2, PlusIcon, Rows3 } from "lucide-react";
import SmartPhoneCard from "@/components/inventory/SmartPhoneCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCardView } from "@/redux/features/smartphone/smartphoneSlice";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSmartphoensMutation,
  useGetSmartphonesQuery,
} from "@/redux/features/smartphone/smartphoneAPI";
import { ISmartPhone2 } from "@/types/globalTypes";
import SmartphoneSkeleton from "@/components/inventory/SmartphoneSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import DeleteSection from "@/components/inventory/DeleteSection";
import { getFilterItemsFromData } from "@/utils/smartphoneUtils";
import {
  handleSearch,
  setFilterInit,
} from "@/redux/features/smartphone/filter/filterSlice";

const Inventory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteSmartphones] = useDeleteSmartphoensMutation();
  const { data, isLoading } = useGetSmartphonesQuery(undefined);
  const [deletePhoneID, setDeletePhoneID] = useState<string>("");
  const { cardView } = useAppSelector((state) => state.smartphone);
  const { filteredSmartPhones } = useAppSelector((state) => state.filters);

  const handleDelete = async () => {
    if (!deletePhoneID) return;
    const deleteData = { smartphones: [deletePhoneID] };
    const res: any = await deleteSmartphones(deleteData);
    if (res.data.status) {
      toast({
        variant: "success",
        description: res.data.message,
        duration: 2000,
      });
      setDeletePhoneID("");
    } else {
      toast({
        variant: "error",
        description: "Failed to delete this smartphone",
        duration: 2000,
      });
      setDeletePhoneID("");
    }
  };

  useEffect(() => {
    if (data?.data) {
      // Getting initial filter states from the smartphones data after fetching
      const filterData = getFilterItemsFromData(data?.data);
      dispatch(
        setFilterInit({
          items: filterData,
          phones: [...data?.data],
        })
      );
    }
  }, [isLoading]);

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
                onChange={(e) => dispatch(handleSearch(e.target.value))}
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
              <DeleteSection />
            </div>

            <div className="xsm:hidden">
              <DeleteSection />
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

        <AlertDialog open={deletePhoneID ? true : false}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                phone from inventory and remove the phone data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeletePhoneID("")}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-none bg-primary"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>

          <div
            className={`grid gap-3 2xl:gap-6 px-7 md:px-4 lg:px-6 3xl:px-8 pb-8 ${
              cardView
                ? "grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 min-[2200px]:grid-cols-6"
                : "grid-cols-1 xl:grid-cols-2"
            }`}
          >
            {isLoading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <SmartphoneSkeleton key={item} cardView={cardView} />
              ))
            ) : filteredSmartPhones ? (
              filteredSmartPhones.length <= 0 ? (
                <div
                  className={`min-h-[calc(60vh)] flex flex-col gap-6 justify-center items-center ${
                    cardView
                      ? "col-span-1 xsm:col-span-2 lg:col-span-3 xl:col-span-4 3xl:col-span-5 min-[2200px]:col-span-6"
                      : "col-span-1 xl:col-span-2"
                  }`}
                >
                  <p>No data found</p>
                  <Button
                    size="icon"
                    variant="default"
                    onClick={() =>
                      navigate("/inventory/add", {
                        unstable_viewTransition: true,
                      })
                    }
                    className="uppercase flex justify-center items-center"
                  >
                    <PlusIcon className="size-4 2xl:size-5 3xl:size-6" />
                  </Button>
                </div>
              ) : (
                filteredSmartPhones.map((item: ISmartPhone2) => {
                  return (
                    <SmartPhoneCard
                      key={item._id}
                      cardView={cardView}
                      data={item}
                      setDeletePhoneID={setDeletePhoneID}
                    />
                  );
                })
              )
            ) : null}
          </div>
        </AlertDialog>
      </section>
    </DashboardLayout>
  );
};

export default Inventory;
