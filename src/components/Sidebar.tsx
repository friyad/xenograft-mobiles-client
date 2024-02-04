import { BadgeDollarSign, History, KanbanSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="">
      <div className="bg-cusGray-100 border-b border-cusGray-300 px-8 md:p-8">
        <a href="/">
          <h1 className="font-black text-primary uppercase whitespace-nowrap">
            Xeno<span className="text-cusBlack">Graft</span>
          </h1>
          <p className="text-cusBlack/70 font-medium text-2xs 2xl:text-xs 3xl:text-sm mb-5 uppercase whitespace-nowrap">
            Sync, Manage, Thrive
          </p>
        </a>
      </div>

      <ul className="flex flex-col justify-start nav-items-ul mt-2">
        <li>
          <NavLink to="/" unstable_viewTransition>
            <button>
              <KanbanSquare />
              <span>Inventory</span>
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/sale" unstable_viewTransition>
            <button>
              <BadgeDollarSign />
              <span>Sell</span>
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/sale-history" unstable_viewTransition>
            <button>
              <History />
              <span>Sales History</span>
            </button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
