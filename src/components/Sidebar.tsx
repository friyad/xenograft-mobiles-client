import { BadgeDollarSign, History, KanbanSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="">
      <div className="bg-cusGray-100 border-b border-cusGray-300 p-6">
        <a href="/">
          <h1 className="text-2xl mxl:text-3xl 3xl:text-3xl font-black text-primary">
            Xeno<span className="text-cusBlack">Graft</span>
          </h1>
          <p className="text-cusBlack font-medium text-sm mb-8">
            Sync, Manage, Thrive
          </p>
        </a>
      </div>

      <ul className="flex flex-col justify-start nav-items-ul">
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
