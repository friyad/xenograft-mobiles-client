import DashboardLayout from "@/layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import PhotoGallery from "../components/inventory/PhotoGallery";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useDeleteSmartphoensMutation,
  useGetSingleSmartphoneQuery,
} from "@/redux/features/smartphone/smartphoneAPI";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const SmartphoneCardDetails = () => {
  const { phoneID } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [deleteSmartphones] = useDeleteSmartphoensMutation();
  const { data: result, isLoading } = useGetSingleSmartphoneQuery(phoneID!, {
    refetchOnMountOrArgChange: false,
  });
  const { data } = result || {};

  const handleDelete = async () => {
    const deleteData = { smartphones: [data._id] };
    const res: any = await deleteSmartphones(deleteData);
    if (res.data.status) {
      navigate("/", { unstable_viewTransition: true });
      toast({
        variant: "success",
        description: res.data.message,
        duration: 2000,
      });
    } else {
      toast({
        variant: "error",
        description: "Failed to delete this smartphone",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <AlertDialog>
        <DashboardLayout title="">
          <div className="p-8">
            <Button
              onClick={() =>
                // @ts-ignore
                navigate(-1, { unstable_viewTransition: true })
              }
              variant="outline"
              size="icon"
              className=""
            >
              <ArrowLeft />
            </Button>

            {!isLoading ? (
              data && data ? (
                <div className="py-6 sm:py-8 lg:py-12">
                  <div className="mx-auto max-w-screen-xl">
                    <div className="grid gap-6 xl:gap-14 lg:grid-cols-2">
                      <PhotoGallery images={data.images} />

                      <div className="flex flex-col">
                        <div>
                          <h1 className="font-bold text-gray-800 mb-2 md:mb-3">
                            {data.name}
                          </h1>

                          <p className="text-sm xl:text-base 2xl:text-lg mb-5">
                            {data.aboutThisPhone}
                          </p>

                          <div>
                            <div className="flex items-end gap-2">
                              <h1 className="font-bold text-gray-800">
                                ${data.price}
                              </h1>
                            </div>
                            <span className="text-xs 2xl:text-sm text-gray-500">
                              incl. VAT plus shipping
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between gap-2 xl:gap-3 w-fit mt-8">
                          <Button
                            onClick={() =>
                              navigate(`/inventory/update/${data._id}`, {
                                unstable_viewTransition: true,
                              })
                            }
                            variant="destructive"
                            size="lg"
                            className="rounded-lg bg-black hover:bg-black uppercase"
                          >
                            Update Info
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(`/inventory/duplicate/${data._id}`, {
                                unstable_viewTransition: true,
                              })
                            }
                            variant="destructive"
                            size="lg"
                            className="rounded-lg bg-primary hover:bg-primary uppercase"
                          >
                            Edit & Duplicate
                          </Button>

                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="lg"
                              className="rounded-lg bg-opacity-80 uppercase"
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-10" />

                  <h1 className=" font-bold text-cusBlack uppercase max-w-screen-xl mx-auto mb-3">
                    Phone Details
                  </h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 max-w-screen-xl mx-auto bg-cusGray-200 xsm:p-3 lg:p-10 rounded-2xl">
                    <Table className="text-sm mxl:text-base 2xl:text-lg">
                      <TableBody>
                        <TableRow>
                          <TableCell>Processor</TableCell>
                          <TableCell>{data.processor}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Brand</TableCell>
                          <TableCell>{data.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Model</TableCell>
                          <TableCell>{data.model}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Operating System</TableCell>
                          <TableCell>{data.opSystem}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Storage Capacity</TableCell>
                          <TableCell>
                            {data.storageCapacityGB
                              .toString()
                              .replaceAll(",", "/")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>RAM</TableCell>
                          <TableCell>
                            {data.ram.toString().replaceAll(",", "/")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Camera</TableCell>
                          <TableCell>
                            {data.camera.toString().replaceAll(",", "/")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Screen Size</TableCell>
                          <TableCell>{data.screenSize}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Table className="text-sm mxl:text-base 2xl:text-lg">
                      <TableBody>
                        <TableRow>
                          <TableCell>Color</TableCell>
                          <TableCell>{data.color}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Release Date:</TableCell>
                          <TableCell>
                            {format(data.releasedDate, "PPP")}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>Cellular Technology</TableCell>
                          <TableCell>{data.cellularTechnology}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Battery</TableCell>
                          <TableCell>{data.battery}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>SIM card</TableCell>
                          <TableCell>{data.simCard}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Charger</TableCell>
                          <TableCell>{data.charger} W</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>USB Type</TableCell>
                          <TableCell>{data.usbType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Mobile Condition</TableCell>
                          <TableCell>{data.condition}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Quantity</TableCell>
                          <TableCell>{data.quantity}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[70vh] flex flex-col justify-center items-center">
                  <p className="text-lg text-cusBlack font-medium">
                    Details Not found
                  </p>

                  <Button
                    onClick={() =>
                      // @ts-ignore
                      navigate(-1, { unstable_viewTransition: true })
                    }
                    variant="outline"
                    size="lg"
                    className="mt-8"
                  >
                    Go Back
                  </Button>
                </div>
              )
            ) : (
              <div className="mx-auto max-w-screen-xl">
                <div className="grid gap-6 xl:gap-14 lg:grid-cols-2">
                  <div className="grid gap-4 lg:grid-cols-5">
                    <div className="order-last flex gap-4 lg:order-none lg:flex-col">
                      {[1, 2, 3].map((thumb) => {
                        return (
                          <Skeleton key={thumb} className="h-[140px] w-full" />
                        );
                      })}
                    </div>
                    <div className="overflow-hidden rounded-2xl lg:col-span-4">
                      <Skeleton className="w-full h-[700px] lg:h-[500px]" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div>
                      <Skeleton className="w-full h-6 lg:h-8 rounded-full" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-5" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-2" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-2" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-2" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-2" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-2" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-5" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-2" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-2" />
                      <Skeleton className="w-full h-2 lg:h-3 rounded-full mt-2" />
                    </div>

                    <div className="flex justify-between gap-2 xl:gap-3 mt-8">
                      <Skeleton className="w-full h-11 lg:h-12 rounded-xl" />
                      <Skeleton className="w-full h-11 lg:h-12 rounded-xl" />
                      <Skeleton className="w-full h-11 lg:h-12 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DashboardLayout>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              phone from inventory and remove the phone data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-none bg-primary"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SmartphoneCardDetails;
