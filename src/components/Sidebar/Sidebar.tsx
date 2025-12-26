import { FC, useEffect } from "react";
import pontesLogo from "../../assets/img/pontes-branca.png";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBarsStaggered,
  faBox,
  faCog,
  faHome,
  faTags,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobal } from "../../providers/GlobalProvider";
import { useSidebar } from "../../providers/SidebarProvider";
import { Link } from "react-router-dom";

interface SidebarProps {}

export const iconsMap: any = {
  faHome: faHome,
  faUser: faUser,
  faCog: faCog,
  faBox: faBox,
  faTags: faTags,
};

const Sidebar: FC<SidebarProps> = () => {
  const { setIsOpenMenu, isOpenMenu } = useGlobal();
  const { menu } = useSidebar();

  const onClickMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <a href="index.html" className="logo">
            <img
              src={pontesLogo}
              alt="Logo cardapio"
              className="navbar-brand logo-cardapio"
            />
          </a>
          <div className="nav-toggle">
            <a onClick={onClickMenu}>
              <FontAwesomeIcon
                color="#fff"
                icon={!isOpenMenu ? faBars : faBarsStaggered}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            {menu.length > 0 ? (
              <>
                {menu?.map((x: any, key: number) =>
                  x?.subItems ? (
                    <li className="nav-item" key={key}>
                      <a data-bs-toggle="collapse" href={`#${x?.label}`}>
                        <FontAwesomeIcon
                          className="me-2"
                          icon={iconsMap[x?.icon]}
                        />
                        <p>{x?.label}</p>
                        <span className="caret"></span>
                      </a>
                      <div className="collapse" id={x?.label}>
                        <ul className="nav nav-collapse">
                          {x?.subItems.map((sub: any) => (
                            <li>
                              <Link to={x?.path + sub?.path}>
                                <span className="sub-item">{sub?.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item active">
                        <Link to={x?.path}>
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon
                              className="me-2"
                              icon={iconsMap[x?.icon]}
                            />

                            <p>{x?.label}</p>
                          </div>
                        </Link>
                      </li>
                    </>
                  )
                )}
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
