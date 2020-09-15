import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../MultiDropDown/_Dropdown.scss";

// MultiDropDown Custom css

const DropDownStyles = {
  wrapperStyle: {
    position: "relative"
  },
  listWrapper: {
    position: "absolute",
    top: "100%",
    minWidth: "150px",
    margin: "0",
    padding: "5px 0px",
    listStyle: "none",
    zIndex: "1000",
    backgroundColor: "white",
    cursor: "pointer"
  },
  subWrapper: {
    position: "absolute",
    top: "0",
    left: "100%",
    minWidth: "150px",
    margin: "0",
    padding: "5px 0px",
    listStyle: "none",
    zIndex: "1000",
    backgroundColor: "white"
  }
};

function MultiDropDown(props) {
  const [state, setState] = useState({
    active: false
  });

  const wrapperRef = useRef(null);

  let { arrow, icon, data, depthLevel, title, className, align } = props;
  const { wrapperStyle, listWrapper, subWrapper } = DropDownStyles;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setState(prev => ({ ...prev, active: false }));
    }
  }

  function toggleDropdown() {
    setState(prev => ({
      ...prev,
      active: !state.active
    }));
  }

  function handleClick(title) {
    if (props.onClick) {
      props.onClick(title);
    }
    props.action(title);
    setState(prev => ({ ...prev, active: false }));
  }

  function getMenuItemTitle(menuItem) {
    return menuItem.title;
  }

  function getMenuItem(menuItem, index, depthLevel) {
    let title = getMenuItemTitle(menuItem, index, depthLevel);
    const { wrapperStyle } = DropDownStyles;
    if (menuItem.submenu && menuItem.submenu.length > 0) {
      return (
        <li
          key={index}
          id={depthLevel}
          className={`menu-list ${menuItem.disable ? "disabled" : ""} `}
          style={wrapperStyle}
        >
          {menuItem.icon ? menuItem.icon : null}
          {title}
          <i class="sub-arrow fa fa-caret-right" aria-hidden="true"></i>

          <MultiDropDown
            data={menuItem.submenu}
            depthLevel={depthLevel + 1}
            submenu={true}
            active={state.active}
            onClick={handleClick}
          />
        </li>
      );
    } else {
      return (
        <li
          key={index}
          id={depthLevel}
          onClick={() => handleClick(title)}
          className={`menu-list ${menuItem.disable ? "disabled" : ""}`}
        >
          {menuItem.icon ? menuItem.icon : null}
          {title}
        </li>
      );
    }
  }

  let options = [];
  data.map((item, index) => {
    options.push(getMenuItem(item, index, depthLevel));
    return null;
  });

  if (props.submenu && props.submenu === true)
    return (
      <ul className="dropdown_list" id={depthLevel} style={subWrapper}>
        {options}
      </ul>
    );
  return (
    <div ref={wrapperRef} className={`drop-down ${className} ${align}`} style={wrapperStyle}>
      <span onClick={toggleDropdown} className="dropdown_toggle">
        {title ? title : null}
        {icon ? icon : null}
        {arrow ? <i className="ml-10 fa fa-chevron-down black" aria-hidden="true"></i> : null}
      </span>
      {state.active ? (
        <ul className="dropdown_list" style={listWrapper}>
          {options}
        </ul>
      ) : null}
    </div>
  );
}

MultiDropDown.propTypes = {
  action: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  depthLevel: PropTypes.number.isRequired
};

MultiDropDown.defaultProps = {
  action: () => {},
  align: "dropright",
  className: "",
  data: [],
  depthLevel: 0,
  title: ""
};

export default MultiDropDown;

// Multi DropDown Array Format

// let data = [
//     {
//       title: "Option 1",
//       icon: <i className="fa fa-user"></i>,
//       submenu: null
//     },
//     {
//       title: "Option 2",
//       icon: <i className="fa fa-ambulance"></i>,
//       submenu: [
//         {
//           title: "Option 2.1",
//           icon: <i className="fa fa-bell"></i>,
//           submenu: [
//             {
//               title: "Option 2.1.1",
//               icon: <i className="fa fa-bicycle"></i>,
//               submenu: null
//             },
//             {
//               title: "Option 2.1.2",
//               icon: <i className="fa fa-book"></i>,
//               submenu: null
//             }
//           ]
//         },
//         {
//           title: "Option 2.2",
//           icon: <i className="fa fa-bar-chart"></i>,
//           submenu: [
//             {
//               title: "Option 2.2.1",
//               icon: <i className="fa fa-car"></i>,
//               submenu: [
//                 {
//                   title: "Option 2.2.1.1",
//                   icon: <i className="fa fa-bug"></i>,
//                   submenu: null
//                 },
//                 {
//                   title: "Option 2.2.1.2",
//                   icon: <i className="fa fa-bed"></i>,
//                   submenu: null
//                 }
//               ]
//             },
//             {
//               title: "Option 2.2.2",
//               icon: <i className="fa fa-bus"></i>,
//               submenu: null
//             }
//           ]
//         }
//       ]
//     }
//   ];
