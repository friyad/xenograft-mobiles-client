import {
  FilterItemsType,
  ISell,
  ISmartPhone,
  ISmartPhone2,
  InitailFilterItemsType,
} from "@/types/globalTypes";
import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { format } from "date-fns";

export const handlePhoneErr = (
  result: any,
  _meta: FetchBaseQueryMeta,
  _arg: ISmartPhone2 | { id: string; smartphone: ISmartPhone2 } | ISell
) => {
  if (result?.data?.message) {
    return {
      status: false,
      message: result.data.message,
    };
  } else if (result?.data?.error?.issues) {
    return {
      status: false,
      name: result.data.error.name,
      message: result.data.error.issues[0].message,
    };
  }
  return {
    status: false,
    message: "Something wrong here! Please try again later",
  };
};

export const formatePhoneDataForBackend = (data: ISmartPhone) => {
  const {
    ram,
    ram2,
    camera,
    camera2,
    storageCapacityGB,
    storageCapacityGB2,
    ...others
  } = data;

  const smartphone = {
    ...others,
    ram: [ram],
    camera: [camera],
    storageCapacityGB: [storageCapacityGB],
    rating: 0,
    sells: 0,
    inStock: data.quantity >= 1,
  };
  if (ram2 > 0) {
    smartphone.ram.push(ram2);
  }
  if (camera2 > 0) {
    smartphone.camera.push(camera2);
  }
  if (storageCapacityGB2 > 0) {
    smartphone.storageCapacityGB.push(storageCapacityGB2);
  }

  return smartphone;
};

export const formatePhoneDataForFrontend = (data: ISmartPhone2) => {
  const { ram, camera, storageCapacityGB, ...others } = data;
  const smartphone = {
    ...others,
    ram: ram[0],
    ram2: ram[1] ? ram[1] : 0,
    camera: camera[0],
    camera2: camera[1] ? camera[1] : 0,
    storageCapacityGB: storageCapacityGB[0],
    storageCapacityGB2: storageCapacityGB[1] ? storageCapacityGB[1] : 0,
  };

  return smartphone;
};

export const getFilterItemsFromData = (datas: ISmartPhone2[]) => {
  // Getting price and releasedDate my .map() and then
  // sorting min - max based on the map returned data
  const sortedPrice = datas
    .map((i) => i.price)
    .sort((a: number, b: number) => b - a);
  const sortedDate = datas
    .map((i) => format(i.releasedDate, "P"))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // These new Set() will keep only unique values
  // that returend from datas.map()
  const uniqueBrands = new Set(datas.map((i) => i.brand));
  const uniqueModels = new Set(datas.map((i) => i.model));
  const uniqueOpSystem = new Set(datas.map((i) => i.opSystem));
  const uniqueStorageCapacity = new Set(
    datas.map((i) => i.storageCapacityGB.toString().replaceAll(",", "/"))
  );
  const uniqueScreenSize = new Set(datas.map((i) => i.screenSize.toString()));
  const uniqueColor = new Set(datas.map((i) => i.color));
  const uniqueBattery = new Set(datas.map((i) => i.battery.toString()));

  return {
    price: {
      min: sortedPrice[sortedPrice.length - 1],
      max: sortedPrice[0],
    },
    releasedDate: {
      min: sortedDate[0],
      max: sortedDate[sortedDate.length - 1],
    },
    brand: [...uniqueBrands],
    model: [...uniqueModels],
    opSystem: [...uniqueOpSystem],
    storageCapacityGB: [...uniqueStorageCapacity],
    screenSize: [...uniqueScreenSize],
    color: [...uniqueColor],
    battery: [...uniqueBattery],
  };
};

export const checkIsOutOfRange = (
  min: string,
  max: string,
  phnDate: string
) => {
  const minTime = new Date(min).getTime();
  const maxTime = new Date(max).getTime();
  const phnTime = new Date(phnDate).getTime();
  return minTime <= phnTime && maxTime >= phnTime;
};

export const getFilteredPhones = (
  phoneDatas: ISmartPhone2[],
  filterItems: FilterItemsType,
  initItems: InitailFilterItemsType
) => {
  // Destructure the Filter Items that is coming from user interaction
  const {
    price,
    releasedDate,
    brand,
    model,
    opSystem,
    storageCapacityGB,
    screenSize,
    color,
    battery,
  } = filterItems;

  // Filter out only these smartphones that is match with all filter options provided by user
  const filteredPhones = phoneDatas.filter((phone) => {
    const phnStorage = phone.storageCapacityGB.toString().replaceAll(",", "/");

    // Filter metrics (Here: if user don't provide any filter options, it will keep
    // previous/initial options and will filter by that)
    const pr = price
      ? phone.price <= price
      : phone.price <= initItems.price.max;

    const rel = releasedDate
      ? checkIsOutOfRange(
          releasedDate?.min,
          releasedDate?.max,
          format(phone.releasedDate, "P")
        )
      : checkIsOutOfRange(
          initItems.releasedDate.min,
          initItems.releasedDate.max,
          format(phone.releasedDate, "P")
        );

    const brnd = brand
      ? brand.includes(phone.brand)
      : initItems.brand.includes(phone.brand);
    const modl = model
      ? model.includes(phone.model)
      : initItems.model.includes(phone.model);
    const ops = opSystem
      ? opSystem.includes(phone.opSystem)
      : initItems.opSystem.includes(phone.opSystem);
    const storage = storageCapacityGB
      ? storageCapacityGB.includes(phnStorage)
      : initItems.storageCapacityGB.includes(phnStorage);
    const scrSize = screenSize
      ? screenSize.includes(phone.screenSize.toString())
      : initItems.screenSize.includes(phone.screenSize.toString());
    const colr = color
      ? color.includes(phone.color)
      : initItems.color.includes(phone.color);
    const bttry = battery
      ? battery.includes(phone.battery.toString())
      : initItems.battery.includes(phone.battery.toString());

    // If every condition is fulfilled then return true
    return (
      pr && rel && brnd && modl && ops && storage && scrSize && colr && bttry
    );
  });

  return filteredPhones;
};
