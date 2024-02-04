export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface ISmartPhone {
  name: string;
  price: number;
  quantity: number;
  images: string[];
  releasedDate: string;
  brand: string; // Sumsung
  model: string; // s20 Ultra
  opSystem: string; // android / ios
  storageCapacityGB: number; // 128 GB
  storageCapacityGB2: number; // 128 GB
  ram: number; // 12 / 16 GB
  ram2: number; // 12 / 16 GB
  processor: string; // Octa-core (1x3.3 GHz Cortex-X4 & 5x3.2 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)
  screenSize: number; // 6.78 inches
  color: string;
  cellularTechnology: string; // 3G or 4G
  battery: number; // mAh
  simCard: string; // eSIM  Micro  Nano  Standard
  camera: number; // 50 MP, 12 MP
  camera2: number; // 50 MP, 12 MP
  charger: number; // 65W
  usbType: string; // USB Type-C
  aboutThisPhone: string;
  condition: string;

  rating?: number;
  sells?: number; // How many times this phone sold
  inStock: boolean;
}

export interface ISmartPhone2 {
  _id?: string;
  prevID?: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  releasedDate: string;
  brand: string; // Sumsung
  model: string; // s20 Ultra
  opSystem: string; // android / ios
  storageCapacityGB: number[]; // 128 GB
  ram: number[]; // 12 / 16 GB
  processor: string; // Octa-core (1x3.3 GHz Cortex-X4 & 5x3.2 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)
  screenSize: number; // 6.78 inches
  color: string;
  cellularTechnology: string; // 3G or 4G
  battery: number; // mAh
  simCard: string; // eSIM  Micro  Nano  Standard
  camera: number[]; // 50 MP, 12 MP
  charger: number; // 65W
  usbType: string; // USB Type-C
  aboutThisPhone: string;
  condition: string;

  rating: number;
  sells: number; // How many times this phone sold
  inStock: boolean;
}
export interface ISell {
  totalQuantity: number;
  buyerName: string;
  saleDate: string;
  product: ISmartPhone2;
}

export interface IInputItem {
  id: number;
  field: string;
  type: string;
  name: string;
  colSpan: number;
}

export interface UpdateSpArg {
  id: string;
  smartphone: ISmartPhone2;
}

export interface InitailFilterItemsType {
  price: {
    min: number;
    max: number;
  };
  releasedDate: {
    min: string;
    max: string;
  };
  brand: string[];
  model: string[];
  opSystem: string[];
  storageCapacityGB: string[];
  screenSize: string[];
  color: string[];
  battery: string[];
}

export interface FilterItemsType {
  price: number | null;
  releasedDate: { min: string; max: string } | null;
  brand: string[] | null;
  model: string[] | null;
  opSystem: string[] | null;
  storageCapacityGB: string[] | null;
  screenSize: string[] | null;
  color: string[] | null;
  battery: string[] | null;
  [key: string]:
    | string[]
    | string
    | { min: string; max: string }
    | number
    | null;
}
