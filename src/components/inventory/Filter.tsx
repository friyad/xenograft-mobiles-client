import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import FilterItem from "./FilterItem";
import { Slider } from "../ui/slider";
import {
  clearFilter,
  handleApply,
  handleValueChanges,
} from "@/redux/features/smartphone/filter/filterSlice";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { X } from "lucide-react";

// Making this array to easily run a loop and show all filter items (except objects)
const filterArrayItems = [
  { id: 1, name: "Brand", property: "brand", unitName: "" },
  { id: 2, name: "Model", property: "model", unitName: "" },
  { id: 3, name: "OS", property: "opSystem", unitName: "" },
  { id: 4, name: "Storage", property: "storageCapacityGB", unitName: "GB" },
  { id: 5, name: "Screen Size", property: "screenSize", unitName: "Inches" },
  { id: 6, name: "Color", property: "color", unitName: "" },
  { id: 7, name: "Battery", property: "battery", unitName: "mAh" },
];

const Filter = () => {
  const dispatch = useAppDispatch();
  const { initailFilterItems, filterItems } = useAppSelector(
    (state) => state.filters
  );
  const { price, releasedDate } = initailFilterItems;
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(releasedDate.min),
    to: new Date(releasedDate.max),
  });
  const isFilterExist = new Set(Object.values(filterItems)).size > 1;

  // Handle Set value of dynamic items that are generating by loop
  const handleSetValue = (property: string, item: string) => {
    if (filterItems[property]) {
      //@ts-ignore
      if (!filterItems[property].includes(item)) {
        dispatch(
          handleValueChanges({
            property: property,
            //@ts-ignore
            value: [...filterItems[property], item],
          })
        );
      } else {
        const withoutThisItme = [...filterItems[property]].filter(
          (i) => i !== item
        );
        dispatch(
          handleValueChanges({
            property: property,
            value: [...withoutThisItme],
          })
        );
      }
    } else {
      dispatch(
        handleValueChanges({
          property: property,
          value: [item],
        })
      );
    }
  };

  useEffect(() => {
    setDate({
      from: new Date(releasedDate.min),
      to: new Date(releasedDate.max),
    });
  }, [releasedDate]);

  return (
    <div className="mt-4 flex justify-start items-center gap-2 lg:gap-3 flex-wrap">
      {/* ------------Price------------ */}
      <FilterItem name="Price" property="price">
        <div className="p-3 grid gap-3">
          <div className="flex justify-between items-center">
            <p className="text-base uppercase text-cusBlack">
              Min: ${price.min}
            </p>
            <p className="text-base uppercase text-cusBlack">
              max: ${price.max}
            </p>
          </div>

          <Slider
            defaultValue={[filterItems.price ? filterItems.price : price.max]}
            max={price.max}
            min={price.min}
            step={1}
            onValueChange={(value) =>
              dispatch(
                handleValueChanges({ property: "price", value: value[0] })
              )
            }
            className="my-0"
          />
          <p className="text-xl font-bold text-cusBlack">
            ${filterItems.price ? filterItems.price : price.max}
          </p>

          <Button
            onClick={() => dispatch(handleApply())}
            variant="destructive"
            className="ml-auto bg-primary hover:bg-primary"
          >
            Apply
          </Button>
        </div>
      </FilterItem>

      {/* ------------Date------------ */}
      <FilterItem
        name="Date"
        property="releasedDate"
        classNames="max-w-fit max-h-fit w-fit"
      >
        <div className="p-3 grid gap-3">
          {releasedDate && date && (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => {
                setDate(range);
                dispatch(
                  handleValueChanges({
                    property: "releasedDate",
                    value: {
                      min: format(range?.from!, "P"),
                      max: format(range?.to!, "P"),
                    },
                  })
                );
              }}
              numberOfMonths={2}
            />
          )}

          <div className="flex justify-end items-center gap-3">
            <Button
              onClick={() => {
                dispatch(
                  clearFilter({ isAll: false, property: "releasedDate" })
                );
                dispatch(handleApply());
              }}
              variant="outline"
              className=""
            >
              Clear
            </Button>

            <Button
              onClick={() => dispatch(handleApply())}
              variant="destructive"
              className="bg-primary hover:bg-primary"
            >
              Apply
            </Button>
          </div>
        </div>
      </FilterItem>

      {filterArrayItems.map((item) => {
        const { id, name, property, unitName } = item;
        return (
          <FilterItem key={id} name={name} property={property}>
            <div className="p-1 grid">
              <p className="text-lg text-cusBlack font-bold">
                {name} {unitName && `(${unitName})`}
              </p>
              <div className="mt-4 flex flex-wrap justify-start items-start gap-2">
                {
                  // @ts-ignore
                  initailFilterItems[property].map((item) => {
                    return (
                      <Button
                        key={item}
                        onClick={() => handleSetValue(property, item)}
                        variant="outline"
                        size="default"
                        className={`transition-none ${
                          //@ts-ignore Set this items as active if the property is include in filter items
                          filterItems[property]?.includes(item)
                            ? "bg-primary/20 text-primary font-semibold border-primary hover:bg-primary/20"
                            : ""
                        }`}
                      >
                        {item}
                      </Button>
                    );
                  })
                }
              </div>
              <Button
                onClick={() => dispatch(handleApply())}
                variant="destructive"
                className="ml-auto mt-5 bg-primary hover:bg-primary"
              >
                Apply
              </Button>
            </div>
          </FilterItem>
        );
      })}
      {isFilterExist && (
        <Button
          onClick={() => {
            dispatch(clearFilter({ isAll: true, property: "" }));
            dispatch(handleApply());
          }}
          size="md"
          variant="destructive"
          className="uppercase !px-6"
        >
          <X className="size-5 mr-1" />
          <span>Clear</span>
        </Button>
      )}
    </div>
  );
};

export default Filter;
