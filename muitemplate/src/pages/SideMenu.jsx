/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useState } from "react";
import cn from "classnames";
import "./menu.css";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const paragraph =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet natus sint provident vel ab reprehenderit cum soluta, suscipit facere nisi sed earum repellendus fuga debitis, nam molestiae minima voluptates possimus.";

  const data = [
    {
      title: "Pricing plans",
      paragraph,
    },
    {
      title: "How to apply",
      paragraph,
    },
    {
      title: "Purchasing process",
      paragraph,
    },
    {
      title: "Usage guides",
      paragraph,
    },
  ];
  return (
    <div className={"wrapper"}>
      <ul className={"accordionList"}>
        {data.map((item) => {
          return (
            <li className={"accordionListItem"} key={item.title}>
              <AccordionItem {...item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const AccordionItem = ({ paragraph: content, title }) => {
  const [state, setState] = useState({
    isOpened: false,
  });

  return (
    <div
      className={cn("accordionItem", state.isOpened && "opened")}
      onClick={() =>
        setState((c) => ({
          isOpened: !c.isOpened,
        }))
      }
    >
      <div className={"lineItem"}>
        <h3 className={"title"}>{title}</h3>
        <span className={"icon"} />
      </div>
      <div className={` ${state.isOpened ? "inner-isopen" : "inner"}`}>
        <div className={` ${state.isOpened ? "content-isopen" : "content"}`}>
          <p className={"paragraph"}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
