import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISmartPhone2 } from "@/types/globalTypes";
import { memo, useEffect } from "react";
import { z } from "zod";
import { useSellNowMutation } from "@/redux/features/sell/sellAPI";
import { useToast } from "../ui/use-toast";

interface SetNowValues {
  buyerName: string;
  totalQuantity: number;
  saleDate: string;
}

interface SellNowFormProps {
  phone: ISmartPhone2;
  setSellNowOpen: Function;
}

const SellNowForm = ({ phone, setSellNowOpen }: SellNowFormProps) => {
  const sellNowValidation = z
    .object({
      buyerName: z
        .string()
        .min(2, "Must be at least 2 characters")
        .max(80, "Can't be more than 100 characters")
        .trim(),
      totalQuantity: z.coerce
        .number()
        .min(1)
        .max(
          phone.quantity,
          `Quantity cannot exceed the available products: ${phone.quantity}`
        ),
      saleDate: z.string(),
    })
    .required();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm<SetNowValues>({
    resolver: zodResolver(sellNowValidation),
  });
  const { toast } = useToast();
  const [sellNow, result] = useSellNowMutation();
  const { isLoading, isSuccess, isError, data, error } = result;

  const handleSelNowSubmit = (data: SetNowValues) => {
    const { _id, ...others } = phone;
    const sellNowArgs = {
      ...data,
      product: { prevID: _id, ...others },
    };
    sellNow(sellNowArgs);
  };

  useEffect(() => {
    if (isSuccess) {
      reset({});
      setSellNowOpen(false);
      toast({
        itemID: "sign",
        duration: 4000,
        variant: "success",
        description: data?.message,
      });
    }
    if (isError) {
      toast({
        duration: 3000,
        // @ts-ignore
        description: error?.message,
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sell Now</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleSelNowSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-1">
            <Label htmlFor="buyerName" className="">
              Buyer Name
            </Label>
            <Input id="buyerName" {...register("buyerName")} className="" />
            {errors.buyerName && (
              <p className="text-red-500 text-xs mxl:text-sm">
                {errors.buyerName.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="totalQuantity" className="">
              Quantity
            </Label>
            <Input
              type="number"
              id="totalQuantity"
              {...register("totalQuantity")}
              className=""
            />
            {errors.totalQuantity && (
              <p className="text-red-500 text-xs mxl:text-sm">
                {errors.totalQuantity.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="saleDate" className="">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  size="lg"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch().saleDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch().saleDate ? (
                    format(watch().saleDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  {...register("saleDate")}
                  id="saleDate"
                  mode="single"
                  selected={new Date(watch().saleDate)}
                  onSelect={(e: any) => {
                    setValue("saleDate", format(e, "P"));
                    clearErrors("saleDate");
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.saleDate && (
              <p className="text-red-500 text-xs mxl:text-sm">
                {errors.saleDate.message}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
          >
            Sell Now
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default memo(SellNowForm);
