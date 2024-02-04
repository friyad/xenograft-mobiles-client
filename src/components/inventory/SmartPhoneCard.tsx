import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ISmartPhone2 } from "@/types/globalTypes";
import { CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIdForDelete } from "@/redux/features/smartphone/smartphoneSlice";

interface SmartPhoneCardProps {
  cardView: boolean;
  data: ISmartPhone2;
  setDeletePhoneID: Function;
}

const SmartPhoneCard = ({
  cardView,
  data,
  setDeletePhoneID,
}: SmartPhoneCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bulkIdsForDelete } = useAppSelector((state) => state.smartphone);

  return (
    <>
      {cardView ? (
        // ------------------------ Grid View ------------------------
        <Card className="shadow-2xl shadow-cusBlack/10 hover:shadow-sm transition-all duration-200 group flex flex-col justify-between">
          <div
            onClick={() => dispatch(setIdForDelete(data._id!))}
            className="relative cursor-pointer"
          >
            <CardHeader className="overflow-hidden aspect-square mx-auto">
              <img
                src={data.images[0]}
                alt=""
                className="group-hover:scale-[1.019] transition-transform duration-300"
              />
            </CardHeader>

            {bulkIdsForDelete.includes(data._id!) ? (
              <div className="absolute inset-0 top-0 bg-white/80 z-20 flex justify-center items-center">
                <CheckCircle
                  strokeWidth="3"
                  className="size-9 xl:size-11 2xl:size-12 3xl:size-14 text-primary"
                />
              </div>
            ) : (
              <div className="absolute inset-0 top-0 z-20 bg-white/10 invisible group-hover:visible">
                {/* <Circle className="m-5 size-8 text-primary" strokeWidth="5" /> */}
              </div>
            )}
          </div>

          <CardContent className="border-t">
            <Link to={`/inventory/${data._id}`} unstable_viewTransition>
              <h3 className="text-sm xl:text-base 2xl:text-lg font-semibold text-cusBlack cursor-pointer group-hover:text-primary">
                {data.name}
              </h3>
            </Link>
            <div className="flex justify-between items-center">
              <h3 className="text-base xl:text-lg 2xl:text-xl font-bold text-cusBlack mt-2">
                ${data.price}
              </h3>
              <h3 className="text-xs xl:text-sm 2xl:text-base font-medium text-cusBlack mt-2">
                {data.model}
              </h3>
            </div>

            <div className="flex flex-wrap justify-start items-center gap-2 mt-3 text-2xs xl:text-xs 2xl:text-sm text-cusBlack/80">
              <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                <span>{data.screenSize} in</span>
              </div>
              <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                <span>{data.cellularTechnology}</span>
              </div>
              <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                <span>
                  {data.storageCapacityGB.toString().replaceAll(",", "/")} GB
                </span>
              </div>
              <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                <span>{data.ram.toString().replaceAll(",", "/")} GB</span>
              </div>
              <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                <span>{data.battery} mAh</span>
              </div>
              <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                <span>{data.camera.toString().replaceAll(",", "/")} MP</span>
              </div>
              <div className="bg-cusGray-300/50 px-1 xl:px-2 2xl:px-3 py-0.5 rounded-full">
                <span>{data.charger} W</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between gap-1 sm:gap-3">
            <Button
              onClick={() => setDeletePhoneID(data._id!)}
              variant="destructive"
              className="w-full rounded"
            >
              Delete
            </Button>
            <Button
              onClick={() =>
                navigate(`/inventory/${data._id}`, {
                  unstable_viewTransition: true,
                })
              }
              variant="destructive"
              className="w-full rounded bg-primary hover:bg-primary"
            >
              View
            </Button>
          </CardFooter>
        </Card>
      ) : (
        // ------------------------ List View ------------------------
        <Card className="shadow-md shadow-cusBlack/10 hover:shadow-sm transition-all duration-200 group flex">
          <div
            onClick={() => dispatch(setIdForDelete(data._id!))}
            className="relative cursor-pointer"
          >
            <CardHeader className="cursor-pointer relative overflow-hidden size-[200px] 2xl:size-[250px]">
              <img
                src={data.images[0]}
                alt=""
                className="group-hover:scale-[1.019] transition-transform duration-300"
              />
            </CardHeader>

            {bulkIdsForDelete.includes(data._id!) ? (
              <div className="absolute inset-0 top-0 bg-white/80 z-20 flex justify-center items-center">
                <CheckCircle
                  strokeWidth="3"
                  className="size-9 xl:size-11 2xl:size-12 3xl:size-14 text-primary"
                />
              </div>
            ) : (
              <div className="absolute inset-0 top-0 z-20 bg-white/10 invisible group-hover:visible">
                {/* <Circle className="m-5 size-8 text-primary" strokeWidth="5" /> */}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between border-l flex-1">
            <CardContent className="">
              <Link to={`/inventory/${data._id}`} unstable_viewTransition>
                <h3 className="text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-semibold text-cusBlack cursor-pointer group-hover:text-primary">
                  {data.name}
                </h3>
              </Link>
              <div className="flex justify-between items-center">
                <h3 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-cusBlack mt-2">
                  ${data.price}
                </h3>
                <h3 className="text-xs xl:text-sm 2xl:text-base 3xl:text-lg font-medium text-cusBlack mt-2">
                  {data.model}
                </h3>
              </div>

              <div className="flex flex-wrap justify-start items-center gap-3 mt-4 text-2xs xl:text-xs 2xl:text-sm 3xl:text-base text-cusBlack/80">
                <div className="bg-cusGray-300/50 px-2 xl:px-3 2xl:px-4 py-0.5 rounded-full">
                  <span>{data.screenSize} in</span>
                </div>
                <div className="bg-cusGray-300/50 px-2 xl:px-3 2xl:px-4 py-0.5 rounded-full">
                  <span>{data.cellularTechnology}</span>
                </div>
                <div className="bg-cusGray-300/50 px-2 xl:px-3 2xl:px-4 py-0.5 rounded-full">
                  <span>
                    {data.storageCapacityGB.toString().replaceAll(",", "/")} GB
                  </span>
                </div>
                <div className="bg-cusGray-300/50 px-2 xl:px-3 2xl:px-4 py-0.5 rounded-full">
                  <span>{data.ram.toString().replaceAll(",", "/")} GB</span>
                </div>
                <div className="bg-cusGray-300/50 px-2 xl:px-3 2xl:px-4 py-0.5 rounded-full">
                  <span>{data.battery} mAh</span>
                </div>
                <div className="bg-cusGray-300/50 px-2 xl:px-3 2xl:px-4 py-0.5 rounded-full">
                  <span>{data.camera.toString().replaceAll(",", "/")} MP</span>
                </div>
                <div className="bg-cusGray-300/50 px-2 xl:px-3 2xl:px-4 py-0.5 rounded-full">
                  <span>{data.charger} W</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between gap-1 sm:gap-3 w-fit ml-auto">
              <Button
                onClick={() =>
                  navigate(`/inventory/${data._id}`, {
                    unstable_viewTransition: true,
                  })
                }
                variant="destructive"
                className="w-full rounded bg-primary hover:bg-primary"
              >
                View
              </Button>
              <Button
                onClick={() => setDeletePhoneID(data._id!)}
                variant="destructive"
                className="w-full rounded"
              >
                Delete
              </Button>
            </CardFooter>
          </div>
        </Card>
      )}
    </>
  );
};

export default SmartPhoneCard;
