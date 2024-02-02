import { useLazyGetMeQuery } from "@/redux/features/auth/authAPI";
import { handleGetMeCall } from "@/utils/authUtils";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export function checkAuth<P>(WrappedComponent: React.ComponentType<P & any>) {
  return (props: P) => {
    const [getMe, result] = useLazyGetMeQuery();

    useEffect(() => {
      handleGetMeCall(getMe);
    }, []);

    return (
      <>
        {result.isLoading && (
          <div className="fixed inset-0 z-[9999999] bg-white flex justify-center items-center gap-1">
            <div className="mt-1">
              <Loader className="animate-spin size-8" />
            </div>
            <h1 className="text-2xl mxl:text-3xl 3xl:text-4xl text-center font-black text-primary">
              Xeno<span className="text-cusBlack">Graft</span>
            </h1>
          </div>
        )}
        <WrappedComponent {...props} />
      </>
    );
  };
}
