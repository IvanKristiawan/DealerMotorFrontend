import { useState, useEffect, useRef, useContext } from "react";
import Dropdown from "./Dropdown";
import { AuthContext } from "../contexts/AuthContext";

import { Link } from "react-router-dom";

const MenuItems = ({ items, depthLevel }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.submenu ? (
        <>
          {user && (
            <>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={dropdown ? "true" : "false"}
                onClick={() => setDropdown((prev) => !prev)}
                style={{
                  color: "white",
                  backgroundColor: "black"
                }}
              >
                {window.innerWidth < 960 && depthLevel === 0 ? (
                  items.title
                ) : (
                  <Link to={items.url} style={{ backgroundColor: "black" }}>
                    {items.title}
                  </Link>
                )}

                {depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel >
                    0 && window.innerWidth > 960 ? (
                  <span>&raquo;</span>
                ) : (
                  <span className="arrow" />
                )}
              </button>
              <Dropdown
                depthLevel={depthLevel}
                submenus={items.submenu}
                dropdown={dropdown}
              />
            </>
          )}
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link style={{ color: "black" }} to={items.url}>
          {items.title}
        </Link>
      )}
    </li>
  );
};

export default MenuItems;
