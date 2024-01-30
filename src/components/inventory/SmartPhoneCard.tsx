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

const SmartPhoneCard = () => {
  return (
    <Card className="shadow-2xl shadow-cusBlack/10 hover:shadow-sm transition-all duration-200 group hover:-translate-y-1">
      <CardHeader className="cursor-pointer relative overflow-hidden">
        <img
          src="https://static-01.daraz.com.bd/p/8f5341e8106e7070aaaec56be0a2647e.jpg_300x0q75.webp"
          alt=""
          className=""
        />
      </CardHeader>

      <CardContent className="border-t">
        <h3 className="text-lg font-semibold text-cusBlack">{data.name}</h3>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-cusBlack mt-2">
            ${data.price}
          </h3>
          <h3 className="text-base font-medium text-cusBlack mt-2">
            {data.model}
          </h3>
        </div>

        <div className="flex flex-wrap justify-start items-center gap-2 mt-3">
          <div className="bg-cusGray-300/50 px-3 rounded-full">
            <span className="text-sm -translate-y-0.5 inline-block text-cusBlack/80">
              {data.screenSize} in
            </span>
          </div>
          <div className="bg-cusGray-300/50 px-3 rounded-full">
            <span className="text-sm -translate-y-0.5 inline-block text-cusBlack/80">
              {data.cellularTechnology}
            </span>
          </div>
          <div className="bg-cusGray-300/50 px-3 rounded-full">
            <span className="text-sm -translate-y-0.5 inline-block text-cusBlack/80">
              {data.storageCapacityGB.toString().replaceAll(",", "/")} GB
            </span>
          </div>
          <div className="bg-cusGray-300/50 px-3 rounded-full">
            <span className="text-sm -translate-y-0.5 inline-block text-cusBlack/80">
              {data.ram.toString().replaceAll(",", "/")} GB
            </span>
          </div>
          <div className="bg-cusGray-300/50 px-3 rounded-full">
            <span className="text-sm -translate-y-0.5 inline-block text-cusBlack/80">
              {data.battery} mAh
            </span>
          </div>
          <div className="bg-cusGray-300/50 px-3 rounded-full">
            <span className="text-sm -translate-y-0.5 inline-block text-cusBlack/80">
              {data.camera.toString().replaceAll(",", "/")} MP
            </span>
          </div>
          <div className="bg-cusGray-300/50 px-3 rounded-full">
            <span className="text-sm -translate-y-0.5 inline-block text-cusBlack/80">
              {data.charger} W
            </span>
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
        <Button variant="destructive" className="w-full rounded bg-opacity-80">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SmartPhoneCard;
