import { ReactNode } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface DashboardProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ title, children }: DashboardProps) => {
  return (
    <ResizablePanelGroup
      // autoSaveId="persistence"
      direction="horizontal"
      className="bg-cusGray-300 min-h-screen overflow-auto md:overflow-hidden"
    >
      <ResizablePanel
        defaultSize={14}
        minSize={0}
        maxSize={18}
        className="min-w-[180px] xl:min-w-max hidden md:inline-block"
      >
        <div className="bg-cusGray-200 h-full rounded-r-xl xl:rounded-r-3xl overflow-hidden ">
          <Sidebar />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle={true} className="hidden md:flex" />

      <ResizablePanel defaultSize={82} className="">
        <div className="h-full">
          <Navbar title={title} />
          <div className="mt-20 md:mt-5 bg-cusGray-100 md:h-[calc(100vh-84px)] mxl:h-[calc(100vh-100px)] rounded-t-xl xl:rounded-t-3xl shadow-[0px_34px_64px_0px_#b1c8e82e] md:overflow-auto">
            {children}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default DashboardLayout;
