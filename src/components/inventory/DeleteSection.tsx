import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";
import { useDeleteSmartphoensMutation } from "@/redux/features/smartphone/smartphoneAPI";
import { clearIdsForDelete } from "@/redux/features/smartphone/smartphoneSlice";

const DeleteSection = () => {
  const { bulkIdsForDelete } = useAppSelector((state) => state.smartphone);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [deleteSmartphones] = useDeleteSmartphoensMutation();

  const handleBulkDelete = async () => {
    const deleteData = { smartphones: [...bulkIdsForDelete] };
    const res: any = await deleteSmartphones(deleteData);
    if (res.data.status) {
      toast({
        variant: "success",
        description: res.data.message,
        duration: 2000,
      });
      dispatch(clearIdsForDelete());
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
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-red-100 hover:bg-red-200 border-red-300 relative"
          >
            <Trash className="size-5 2xl:size-6 text-red-600" />
            <Badge
              variant="destructive"
              className="absolute text-2xs lg:text-xs -top-3 -right-1 lg:-right-4 px-1 py-px lg:px-2 lg:py-px"
            >
              {bulkIdsForDelete.length}
            </Badge>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bulkIdsForDelete.length >= 1 ? (
                <>Are you sure?</>
              ) : (
                <>Please select a smartphone to delete</>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bulkIdsForDelete.length >= 1 ? (
                <>
                  This action cannot be undone. This will permanently delete
                  your{" "}
                  <strong className="text-primary">
                    {bulkIdsForDelete.length}
                  </strong>{" "}
                  phone from inventory and remove the phone data from our
                  servers.
                </>
              ) : (
                <>You have to select at least 1 phone to delete</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              {bulkIdsForDelete.length >= 1 ? "Cancel" : "Go To Select"}
            </AlertDialogCancel>
            {bulkIdsForDelete.length >= 1 && (
              <AlertDialogAction
                onClick={handleBulkDelete}
                className="bg-none bg-primary"
              >
                Continue
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSection;
