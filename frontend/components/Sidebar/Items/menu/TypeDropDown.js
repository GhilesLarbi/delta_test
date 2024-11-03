import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";

function TypeDropDown({ item, setOpened, index, opened }) {
  const router = useRouter();

  const splited = router.asPath.split("/");
  const splitedHref = item.path ? item.path.split("/") : null;
  const isCurrentPath = item.path ? splited[1] === splitedHref[1] : null;

  function changeSetOpenedState() {
    if (opened == index + 1) {
      setOpened(false);
      return;
    }
    setOpened(index + 1);
  }

  let Icon = item.icon.Icon;
  return (
    <div className="relative mb-2">
      <div
        onClick={changeSetOpenedState}
        className={`${
          !(opened == index + 1)
          ? " bg-white hover:bg-violet-300 rounded-b-[10px] rounded-[10px]  "
          : "bg-[#401C8F] hover:bg-purple-700  lg:rounded-b-[0px] rounded-b-[10px] rounded-[10px]"
        }
        flex items-center gap-2 px-4 py-4`}
        style={{
          cursor: "pointer",
          position: "relative",
        }}
      >
        <Icon
          size={item.icon.size}
          color={opened == index + 1 ? "#fff" : "#555"}
        />
        <span
          className="lg:flex hidden"
          style={{
            color: opened == index + 1 ? "#fff" : "#555",
            fontSize: 16,
          }}
        >
          {item.label}
        </span>
        <FaChevronDown
          className="lg:flex hidden"
          style={{
            position: "absolute",
            right: 20,
            color: opened == index + 1 ? "#fff" : "#555",
            transform:
              opened == index + 1 ? "rotate( 180deg ) " : "rotate( 0deg ) ",
            transition:
              "transform 0.3s ease, color 0.3s ease, background-color 0.3s ease",
          }}
        />
      </div>
      {opened == index + 1 && (
        <div
          className=" lg:relative absolute lg:shadow-none shadow-sm lg:left-0 left-[75px] z-[9999] lg:w-[100%] w-[230px] bg-white lg:rounded-t-[0px] rounded-t-[10px] rounded-b-[10px] overflow-hidden"
        >
          {item &&
            item.children &&
            item.children[0] &&
            item.children.map((child, index) => {
              let ICON = child.icon.Icon;
              const splitedHrefChild = child.path
                ? child.path.split("/")
                : null;

              const isCurrentPathChild = child.path
                ? splited[1] === splitedHrefChild[1]
                : null;

              return (
                <Link key={index} href={child.path}>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-violet-300`}
                  >
                    <ICON
                      size={child.icon.size}
                      color={
                        isCurrentPathChild ? "#7c3aed" : "#555"
                      }
                    />
                    <span
                      style={{
                        color: isCurrentPathChild
                          ? "#7c3aed"
                          : "#222",
                      }}
                    >
                      {child.label}
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default TypeDropDown;
