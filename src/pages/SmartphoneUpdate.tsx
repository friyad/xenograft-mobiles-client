import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ISmartPhone } from "@/types/globalTypes";
import { smartPhoneValidation } from "@/validations/inventoryValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { smartPhoneUpdateFormData } from "@/data/smartphone";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PhonePhotoUpload from "@/components/inventory/PhonePhotoUpload";

const defaultValuesaa = {
  name: "",
  price: 0,
  quantity: 0,
  images: [""],
  releasedDate: "",
  brand: "",
  model: "",
  opSystem: "",
  storageCapacityGB: 0,
  storageCapacityGB2: 0,
  ram: 0,
  ram2: 0,
  processor: "",
  screenSize: 0,
  color: "",
  cellularTechnology: "",
  battery: 0,
  simCard: "",
  camera: 0,
  camera2: 0,
  charger: 0,
  usbType: "",
  aboutThisPhone: "",
  condition: "New",
  rating: 0,
  sells: 0,
  inStock: true,
};

const SmartphoneUpdate = () => {
  const { phoneID } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    setError,
    formState: { errors, defaultValues },
  } = useForm<ISmartPhone>({
    resolver: zodResolver(smartPhoneValidation),
    // defaultValues: defaultValues,
  });

  const handleUpdateSubmit = (data: ISmartPhone) => {
    if (data.images.length < 3) {
      setError("images", new Error("Please upload 3 images"), {
        shouldFocus: true,
      });
    }

    console.log(data);
  };

  return (
    <DashboardLayout>
      <div className="p-8 pb-20">
        <div className="flex justify-start items-center">
          <Button
            // @ts-ignore
            onClick={() => navigate(-1, { unstable_viewTransition: true })}
            variant="outline"
            size="icon"
            className="size-12 rounded-full"
          >
            <ArrowLeft />
          </Button>

          <h2 className="text-3xl text-cusBlack font-bold uppercase ml-8">
            Update Smartphone
          </h2>
        </div>

        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <div className="grid grid-cols-4 gap-x-10 gap-y-5 mt-8 max-w-screen-sm mx-auto updateInfoForm justify-start items-start">
            <div className="grid w-full items-center gap-1.5 col-span-4">
              <Label className="text-gray-500">Images</Label>
              <PhonePhotoUpload
                setValue={setValue}
                clearErrors={clearErrors}
                images={watch().images}
              />
              {errors.images && (
                <p className="text-red-500 text-xs mxl:text-sm">
                  {errors.images.message}
                </p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5 col-span-4">
              <Label htmlFor="update_aboutThisPhone" className="text-gray-500">
                About This Phone
              </Label>
              <Textarea
                {...register("aboutThisPhone")}
                placeholder="Type here..."
              />
              {errors.aboutThisPhone && (
                <p className="text-red-500 text-xs mxl:text-sm">
                  {errors.aboutThisPhone.message}
                </p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5 col-span-2">
              <Label htmlFor="update_releasedDate" className="text-gray-500">
                Release Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal inputEl",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    {...register("releasedDate")}
                    id="update_releasedDate"
                    mode="single"
                    selected={date}
                    onSelect={(e: any) => {
                      setDate(e);
                      setValue("releasedDate", format(e, "P"));
                      clearErrors("releasedDate");
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.releasedDate && (
                <p className="text-red-500 text-xs mxl:text-sm">
                  {errors.releasedDate.message}
                </p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5 col-span-2">
              <Label htmlFor="update_condition" className="text-gray-500">
                Phone Condition
              </Label>
              <Select
                defaultValue={defaultValues?.condition}
                onValueChange={(e: string) => {
                  setValue("condition", e);
                  clearErrors("condition");
                }}
              >
                <SelectTrigger className="h-14 text-lg">
                  <SelectValue placeholder="Select your phone condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Phone Conditon</SelectLabel>
                    <SelectItem className="text-lg" value="New">
                      New
                    </SelectItem>
                    <SelectItem className="text-lg" value="Used">
                      Used
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.condition && (
                <p className="text-red-500 text-xs mxl:text-sm">
                  {errors.condition.message}
                </p>
              )}
            </div>

            {smartPhoneUpdateFormData.map((inputItem) => {
              const { id, field, type, name, colSpan } = inputItem;
              return (
                <div
                  key={id}
                  className="grid w-full items-center gap-1.5 col-span-2 relative"
                  style={{
                    gridColumn: `span ${colSpan} / span ${colSpan}`,
                  }}
                >
                  <Label htmlFor={`update_${field}`} className="text-gray-500">
                    {name}
                  </Label>
                  <Input
                    type={type}
                    id={`update_${field}`}
                    placeholder="Type here..."
                    onKeyDown={(evt) => {
                      if (type === "number") {
                        ["e", "E", "+", "-"].includes(evt.key) &&
                          evt.preventDefault();
                      }
                    }}
                    // @ts-ignore
                    {...register(field)}
                  />

                  {
                    // @ts-ignore
                    errors[field] && (
                      <p className="text-red-500 text-xs mxl:text-sm ">
                        {
                          // @ts-ignore
                          errors[field].message
                        }
                      </p>
                    )
                  }
                </div>
              );
            })}

            <Button
              variant="default"
              size="lg"
              className="w-full col-span-4 mt-4"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default SmartphoneUpdate;
