import DashboardLayout from "@/layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import PhotoGallery from "../components/inventory/PhotoGallery";
import { data } from "../components/inventory/SmartPhoneCard";
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

const SmartphoneCardDetails = () => {
  const { phoneID } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {};

  return (
    <>
      <AlertDialog>
        <DashboardLayout>
          <div className="p-8">
            <Button
              onClick={() =>
                navigate("/inventory", { unstable_viewTransition: true })
              }
              variant="outline"
              size="icon"
              className="size-12 rounded-full"
            >
              <ArrowLeft />
            </Button>

            <div className="pb-6 sm:pb-8 lg:pb-12">
              <div className="mx-auto max-w-screen-xl px-4 md:px-0">
                <div className="grid gap-14 md:grid-cols-2">
                  <PhotoGallery />

                  <div className="flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl mb-2 md:mb-3">
                        {data.name}
                      </h2>

                      <p className="text-lg mb-5">{data.aboutThisPhone}</p>

                      <div>
                        <div className="flex items-end gap-2">
                          <span className="text-xl font-bold text-gray-800 md:text-3xl">
                            ${data.price}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          incl. VAT plus shipping
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between gap-3 w-fit mt-8">
                      <Button
                        onClick={() =>
                          navigate("/inventory/update/13312", {
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
                          navigate(`/inventory/duplicate/24312312`, {
                            unstable_viewTransition: true,
                          })
                        }
                        variant="destructive"
                        size="lg"
                        className="rounded-lg bg-primary hover:bg-primary uppercase"
                      >
                        Duplicate & Edit
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

              <h2 className="text-xl font-bold text-cusBlack lg:text-2xl uppercase max-w-screen-xl mx-auto mb-3">
                Phone Details
              </h2>
              <div className="grid grid-cols-2 gap-8 max-w-screen-xl mx-auto bg-cusGray-200 p-10 rounded-2xl">
                <Table className="text-lg">
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
                        {data.storageCapacityGB.toString().replaceAll(",", "/")}
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
                <Table className="text-lg">
                  <TableBody>
                    <TableRow>
                      <TableCell>Color</TableCell>
                      <TableCell>{data.color}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Release Date:</TableCell>
                      <TableCell>{data.releasedDate.toDateString()}</TableCell>
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
