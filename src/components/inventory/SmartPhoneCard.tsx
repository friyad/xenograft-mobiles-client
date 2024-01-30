import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const data = {
  name: "Samsung Galaxy S20 Ultra", //
  price: 999.99, //
  quantity: 50,
  images: ["image1.jpg", "image2.jpg"], //
  releasedDate: new Date("2024-02-01"),
  brand: "Samsung",
  model: "S20 Ultra", //
  opSystem: "Android",
  storageCapacityGB: [128, 256], //
  ram: [12, 16], //
  processor:
    "Octa-core (1x3.3 GHz Cortex-X4 & 5x3.2 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)",
  screenSize: 6.78, //
  color: "Mystic Black",
  cellularTechnology: "4G", //
  battery: 5000, //
  simCard: "Nano",
  camera: [50, 12], //
  charger: 65,
  usbType: "USB Type-C",
  aboutThisPhone: "High-end smartphone with advanced camera features.",
  condition: "New",
  rating: 4.8,
  sells: 20,
  inStock: true,
};

interface SmartPhoneCardProps {
  cardView: boolean;
}

const SmartPhoneCard = ({ cardView }: SmartPhoneCardProps) => {
  return (
    <>
      {cardView ? (
        // ------------------------ Grid View ------------------------
        <Card className="shadow-2xl shadow-cusBlack/10 hover:shadow-sm transition-all duration-200 group">
          <CardHeader className="cursor-pointer relative overflow-hidden">
            <img
              src="https://static-01.daraz.com.bd/p/8f5341e8106e7070aaaec56be0a2647e.jpg_300x0q75.webp"
              alt=""
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </CardHeader>

          <CardContent className="border-t">
            <h3 className="text-lg font-semibold text-cusBlack cursor-pointer group-hover:text-primary">
              {data.name}
            </h3>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-cusBlack mt-2">
                ${data.price}
              </h3>
              <h3 className="text-base font-medium text-cusBlack mt-2">
                {data.model}
              </h3>
            </div>

            <div className="flex flex-wrap justify-start items-center gap-2 mt-3 text-sm text-cusBlack/80">
              <div className="bg-cusGray-300/50 px-3 rounded-full">
                <span>{data.screenSize} in</span>
              </div>
              <div className="bg-cusGray-300/50 px-3 rounded-full">
                <span>{data.cellularTechnology}</span>
              </div>
              <div className="bg-cusGray-300/50 px-3 rounded-full">
                <span>
                  {data.storageCapacityGB.toString().replaceAll(",", "/")} GB
                </span>
              </div>
              <div className="bg-cusGray-300/50 px-3 rounded-full">
                <span>{data.ram.toString().replaceAll(",", "/")} GB</span>
              </div>
              <div className="bg-cusGray-300/50 px-3 rounded-full">
                <span>{data.battery} mAh</span>
              </div>
              <div className="bg-cusGray-300/50 px-3 rounded-full">
                <span>{data.camera.toString().replaceAll(",", "/")} MP</span>
              </div>
              <div className="bg-cusGray-300/50 px-3 rounded-full">
                <span>{data.charger} W</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between gap-3">
            <Button
              variant="destructive"
              className="w-full rounded bg-primary hover:bg-primary"
            >
              Duplicate & Edit
            </Button>
            <Button
              variant="destructive"
              className="w-full rounded bg-opacity-80"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ) : (
        // ------------------------ List View ------------------------
        <Card className="shadow-md shadow-cusBlack/10 hover:shadow-sm transition-all duration-200 group flex">
          <CardHeader className="cursor-pointer relative overflow-hidden size-[250px]">
            <img
              src="https://static-01.daraz.com.bd/p/8f5341e8106e7070aaaec56be0a2647e.jpg_300x0q75.webp"
              alt=""
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </CardHeader>

          <div className="flex flex-col justify-between border-l flex-1">
            <CardContent className="">
              <h3 className="text-xl font-semibold text-cusBlack cursor-pointer group-hover:text-primary">
                {data.name}
              </h3>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-cusBlack mt-2">
                  ${data.price}
                </h3>
                <h3 className="text-lg font-medium text-cusBlack mt-2">
                  {data.model}
                </h3>
              </div>

              <div className="flex flex-wrap justify-start items-center gap-3 mt-4 text-base text-cusBlack/80">
                <div className="bg-cusGray-300/50 px-4 rounded-full">
                  <span>{data.screenSize} in</span>
                </div>
                <div className="bg-cusGray-300/50 px-4 rounded-full">
                  <span>{data.cellularTechnology}</span>
                </div>
                <div className="bg-cusGray-300/50 px-4 rounded-full">
                  <span>
                    {data.storageCapacityGB.toString().replaceAll(",", "/")} GB
                  </span>
                </div>
                <div className="bg-cusGray-300/50 px-4 rounded-full">
                  <span>{data.ram.toString().replaceAll(",", "/")} GB</span>
                </div>
                <div className="bg-cusGray-300/50 px-4 rounded-full">
                  <span>{data.battery} mAh</span>
                </div>
                <div className="bg-cusGray-300/50 px-4 rounded-full">
                  <span>{data.camera.toString().replaceAll(",", "/")} MP</span>
                </div>
                <div className="bg-cusGray-300/50 px-4 rounded-full">
                  <span>{data.charger} W</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between gap-3 w-fit ml-auto">
              <Button
                variant="destructive"
                className="w-full rounded bg-primary hover:bg-primary"
              >
                Duplicate & Edit
              </Button>
              <Button
                variant="destructive"
                className="w-full rounded bg-opacity-80"
              >
                Delete
              </Button>
            </CardFooter>
          </div>
        </Card>
      )}
    </>
  );
};

export default SmartPhoneCard;
