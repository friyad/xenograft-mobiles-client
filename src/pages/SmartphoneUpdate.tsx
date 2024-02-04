import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { smartPhoneFormInputsData } from "@/data/smartphone";
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
import {
  useGetSingleSmartphoneQuery,
  useUpdateSmartphoneMutation,
} from "@/redux/features/smartphone/smartphoneAPI";
import {
  formatePhoneDataForBackend,
  formatePhoneDataForFrontend,
} from "@/utils/smartphoneUtils";
import { useToast } from "@/components/ui/use-toast";

const SmartphoneUpdate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { phoneID } = useParams();
  const {
    data: result,
    isLoading,
    error,
  } = useGetSingleSmartphoneQuery(phoneID!, {
    refetchOnMountOrArgChange: false,
  });
  const { data } = result || {};
  const [updateSmartphone, updateResult] = useUpdateSmartphoneMutation();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<ISmartPhone>({
    resolver: zodResolver(smartPhoneValidation),
    defaultValues: {},
  });

  const handleUpdateSubmit = (phoneData: ISmartPhone) => {
    if (phoneData.images.length < 3) {
      setError("images", new Error("Please upload 3 images"), {
        shouldFocus: true,
      });
    }
    const smartphone = formatePhoneDataForBackend(phoneData);
    const args = {
      id: data._id,
      smartphone,
    };
    updateSmartphone(args);
  };

  useEffect(() => {
    if (!data) return;
    reset(formatePhoneDataForFrontend(data));
  }, [data]);

  useEffect(() => {
    if (updateResult.isSuccess) {
      toast({
        duration: 3000,
        variant: "success",
        description: updateResult?.data?.message,
      });
      setTimeout(() => {
        navigate("/", { unstable_viewTransition: true });
      }, 1000);
    }
    if (updateResult.isError) {
      toast({
        duration: 3000,
        // @ts-ignore
        description: updateResult.error?.message,
        variant: "error",
      });
    }
  }, [updateResult.isSuccess, updateResult.isError]);

  return (
    <DashboardLayout title="">
      {!isLoading ? (
        data && data ? (
          <div className="p-8 pb-20">
            <div className="flex justify-start items-center">
              <Button
                // @ts-ignore
                onClick={() => navigate(-1, { unstable_viewTransition: true })}
                variant="outline"
                size="icon"
                className=""
              >
                <ArrowLeft />
              </Button>

              <h1 className="text-cusBlack font-bold uppercase ml-3 sm:ml-5">
                Update Smartphone
              </h1>
            </div>

            <form onSubmit={handleSubmit(handleUpdateSubmit)}>
              <div className="flex flex-col sm:grid grid-cols-2 sm:grid-cols-4 gap-x-6 lg:gap-x-10 gap-y-5 mt-8 max-w-screen-sm mx-auto smartphoneForm  justify-start items-start">
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
                  <Label
                    htmlFor="update_aboutThisPhone"
                    className="text-gray-500"
                  >
                    About This Phone
                  </Label>
                  <Textarea
                    id="update_aboutThisPhone"
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
                  <Label
                    htmlFor="update_releasedDate"
                    className="text-gray-500"
                  >
                    Release Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal inputEl",
                          !watch().releasedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watch().releasedDate ? (
                          format(watch().releasedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        {...register("releasedDate")}
                        id="update_releasedDate"
                        mode="single"
                        selected={new Date(watch().releasedDate)}
                        onSelect={(e: any) => {
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
                    onValueChange={(e: string) => {
                      setValue("condition", e);
                      clearErrors("condition");
                    }}
                    value={watch()?.condition}
                  >
                    <SelectTrigger className="inputEl">
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

                {smartPhoneFormInputsData.map((inputItem) => {
                  const { id, field, type, name, colSpan } = inputItem;
                  return (
                    <div
                      key={id}
                      className="grid w-full items-center gap-1.5 relative"
                      style={{
                        gridColumn: `span ${colSpan} / span ${colSpan}`,
                      }}
                    >
                      <Label
                        htmlFor={`update_${field}`}
                        className="text-gray-500"
                      >
                        {name}
                      </Label>
                      <Input
                        type={type}
                        id={`update_${field}`}
                        placeholder="Type here..."
                        step="0.01"
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
                  loading={updateResult.isLoading}
                  disabled={updateResult.isLoading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="h-[70vh] w-full flex justify-center items-center">
            <p>
              {
                // @ts-ignore
                error?.data.message
              }
            </p>
          </div>
        )
      ) : (
        <div className="h-[70vh] w-full flex justify-center items-center">
          <div className="mt-1">
            <Loader className="animate-spin size-8" />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SmartphoneUpdate;
