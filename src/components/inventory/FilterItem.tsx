import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  handleApply,
  setItemOpenOnChange,
} from "@/redux/features/smartphone/filter/filterSlice";
import { cn } from "@/lib/utils";

interface FiterItemProps {
  name: string;
  property: string;
  classNames?: string;
  children: ReactNode;
}

const FilterItem = ({
  name,
  property,
  classNames,
  children,
}: FiterItemProps) => {
  const dispatch = useAppDispatch();
  const { smartphoneDatas, openedFilterItem, filterItems } = useAppSelector(
    (state) => state.filters
  );

  return (
    <Popover open={name === openedFilterItem}>
      <PopoverTrigger
        onClick={() => dispatch(setItemOpenOnChange(name))}
        asChild
      >
        <Button
          size="md"
          variant="outline"
          className={`${
            filterItems[property]
              ? "bg-primary/10 text-primary border-primary font-bold hover:bg-primary/10"
              : ""
          }`}
        >
          {name}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        onPointerDownOutside={() => {
          dispatch(setItemOpenOnChange(null));
          dispatch(handleApply());
        }}
        className={cn(
          "min-w-[350px] max-h-[350px] overflow-auto shadow-[0px_20px_40px_#00000020]",
          classNames
        )}
        align="end"
      >
        {smartphoneDatas ? children : <Skeleton className="w-full h-44" />}
      </PopoverContent>
    </Popover>
  );
};

export default FilterItem;
