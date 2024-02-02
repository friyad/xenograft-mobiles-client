import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl mxl:text-3xl 3xl:text-4xl text-center font-black text-primary">
              Xeno<span className="text-cusBlack">Graft</span>
            </h1>

            <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl mt-8">
              Page not found
            </h1>
            <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>
            <Button
              onClick={() =>
                // @ts-ignore
                navigate(-1, { unstable_viewTransition: true })
              }
              variant="outline"
              size="lg"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
