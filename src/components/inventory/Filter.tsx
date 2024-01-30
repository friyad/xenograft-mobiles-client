import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Filter = () => {
  const filterData = [
    "Price",
    "Date",
    "Brand",
    "Model",
    "OS",
    "Storage",
    "Screen Size",
    "More 1",
    "More 2",
    "More 3",
  ];

  return (
    <div className="mt-4 flex justify-start items-center gap-3">
      {filterData.map((item) => {
        return (
          <Popover key={item} onOpenChange={(e: any) => console.log(e)}>
            <PopoverTrigger asChild>
              <Button size="md" variant="outline" className="uppercase">
                {item}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Dimensions: {item}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
};

export default Filter;
