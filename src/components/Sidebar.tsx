import { BadgeDollarSign, History, KanbanSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="">
      <div className="bg-cusGray-100 border-b border-cusGray-300 p-8">
        <a href="/">
          <h1 className="text-2xl mxl:text-3xl 3xl:text-3xl font-black text-primary uppercase">
            Xeno<span className="text-cusBlack">Graft</span>
          </h1>
          <p className="text-cusBlack/70 font-medium text-sm mb-5 uppercase">
            Sync, Manage, Thrive
          </p>
        </a>
      </div>

      <ul className="flex flex-col justify-start nav-items-ul mt-2">
        <li>
          <NavLink to="/">
            <button>
              <KanbanSquare />
              <span>Inventory</span>
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/sale">
            <button>
              <BadgeDollarSign />
              <span>Sale</span>
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/sale-history">
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
