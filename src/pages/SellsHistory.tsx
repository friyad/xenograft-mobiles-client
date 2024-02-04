import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetSelesHistoryQuery } from "@/redux/features/sell/sellAPI";
import { ISell } from "@/types/globalTypes";
import { checkIsOutOfRange } from "@/utils/smartphoneUtils";
import { addDays, addMonths, format } from "date-fns";
import { useEffect, useState } from "react";

const SellsHistory = () => {
  const { data, isLoading, isSuccess } = useGetSelesHistoryQuery(undefined);
  const [filterBy, setFilterBy] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (item: string) => {
    const today = format(Date.now(), "P");
    const last7Days = format(addDays(Date.now(), -7), "P");
    const lastMonthDate = format(addMonths(Date.now(), -1), "P");
    const lastYearDate = format(addMonths(Date.now(), -1), "P");

    switch (item) {
      case "weekly":
        const filterWeekly = data?.data.filter((i: ISell) =>
          checkIsOutOfRange(last7Days, today, i.saleDate)
        );
        setFilteredData(filterWeekly);
        break;
      case "daily":
        const filterDaily = data?.data.filter(
          (i: ISell) => i.saleDate === today
        );
        setFilteredData(filterDaily);
        break;
      case "monthly":
        const filterMonthly = data?.data.filter((i: ISell) =>
          checkIsOutOfRange(lastMonthDate, today, i.saleDate)
        );
        setFilteredData(filterMonthly);
        break;
      case "yearly":
        const filterYearly = data?.data.filter((i: ISell) =>
          checkIsOutOfRange(lastYearDate, today, i.saleDate)
        );
        setFilteredData(filterYearly);
        break;
      default:
        setFilteredData(data?.data);
        break;
    }
    setFilterBy(item);
  };

  useEffect(() => {
    if (data?.data) {
      setFilteredData(data.data);
    }
  }, [data]);

  return (
    <DashboardLayout title="Sell History">
      <section className="p-7 md:p-4 lg:p-6 3xl:p-8 min-h-screen md:min-h-[80vh]">
        <div className="flex justify-end items-center gap-4">
          <Select value={filterBy} onValueChange={handleFilter}>
            <SelectTrigger className="max-w-[450px] h-12 text-lg">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  className="cursor-pointer text-base py-3"
                  value="all"
                >
                  All
                </SelectItem>
                <SelectItem
                  className="cursor-pointer text-base py-3"
                  value="weekly"
                >
                  Weekly
                </SelectItem>
                <SelectItem
                  className="cursor-pointer text-base py-3"
                  value="daily"
                >
                  Daily
                </SelectItem>
                <SelectItem
                  className="cursor-pointer text-base py-3"
                  value="monthly"
                >
                  Monthly
                </SelectItem>
                <SelectItem
                  className="cursor-pointer text-base py-3"
                  value="yearly"
                >
                  Yearly
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1 mt-14 overflow-auto">
          {isLoading ? (
            // If it is loading....
            [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Skeleton key={item} className="h-24 my-1" />
            ))
          ) : // If it is not loading but don't has any data
          filteredData.length <= 0 ? (
            <div className="min-h-[calc(60vh)] flex flex-col gap-6 justify-center items-center">
              <p>No data found</p>
            </div>
          ) : (
            // if data has
            <table className="w-[600px] sm:w-full">
              <thead>
                <tr className="">
                  <th className="bg-primary rounded-l-lg w-16 lg:w-24 xl:w-36"></th>
                  <th className="bg-primary text-left uppercase text-2xs md:text-xs xl:text-sm 2xl:text-base px-4 py-3 lg:py-5 text-white">
                    Name
                  </th>
                  <th className="bg-primary text-left uppercase text-2xs md:text-xs xl:text-sm 2xl:text-base px-4 py-3 lg:py-5 text-white">
                    Buyer Name
                  </th>
                  <th className="bg-primary text-left uppercase text-2xs md:text-xs xl:text-sm 2xl:text-base px-4 py-3 lg:py-5 text-white">
                    Sales Quantity
                  </th>
                  <th className="bg-primary rounded-r-lg text-left uppercase text-2xs md:text-xs xl:text-sm 2xl:text-base px-4 py-3 lg:py-5 text-white">
                    Date of sale
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {isSuccess &&
                  filteredData.map((item: ISell) => {
                    const { buyerName, totalQuantity, saleDate, product } =
                      item;
                    return (
                      <tr
                        key={product._id}
                        className="even:bg-gray-100 hover:bg-cusGray-300/60"
                      >
                        <td className="p-4 w-16 lg:w-24 xl:w-36">
                          <div className="size-16 lg:size-20 rounded-lg overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <h2 className="text-xs md:text-sm xl:text-base 2xl:text-lg font-semibold max-w-xs">
                            {product.name}
                          </h2>
                        </td>
                        <td className="p-4">
                          <p className="text-xs md:text-sm xl:text-base 2xl:text-lg">
                            {buyerName}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-xs md:text-sm xl:text-base 2xl:text-lg">
                            {totalQuantity}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="text-xs md:text-sm xl:text-base 2xl:text-lg">
                            {format(saleDate, "PPP")}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default SellsHistory;
