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
}

const DashboardLayout = ({ children }: DashboardProps) => {
  return (
    <ResizablePanelGroup
      // autoSaveId="persistence"
      direction="horizontal"
      className="bg-cusGray-300 min-h-screen overflow-hidden "
    >
      <ResizablePanel defaultSize={14} minSize={12} maxSize={18}>
        <div className="bg-cusGray-200 h-full rounded-r-3xl overflow-hidden">
          <Sidebar />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle={true} />

      <ResizablePanel defaultSize={82}>
        <div className="h-full">
          <Navbar />
          <div className="mt-5 bg-cusGray-100 h-[calc(100%-100px)] rounded-t-3xl p-8 shadow-[0px_34px_64px_0px_#b1c8e82e]">
            {children}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default DashboardLayout;
