import { Sidebar, TextInput } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiUsers,
} from "react-icons/hi";
import { useEffect, useState } from "react";

export default function Component() {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <>
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <form className="pb-3 md:hidden">
              <TextInput
                icon={HiSearch}
                type="search"
                placeholder="Search"
                required
                size={32}
              />
            </form>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="/"
                  icon={HiChartPie}
                  className={
                    "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                  }
                >
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                  <Sidebar.Item href={route("furniture.index")}>
                    All Furnitures
                  </Sidebar.Item>
                  <Sidebar.Item href="#">Sales</Sidebar.Item>
                  <Sidebar.Item href="#">Refunds</Sidebar.Item>
                  <Sidebar.Item href="#">Shipping</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item
                  href="/e-commerce/products"
                  icon={HiShoppingBag}
                  className={
                    "/e-commerce/products" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Products
                </Sidebar.Item>
                <Sidebar.Item
                  href="/users/list"
                  icon={HiUsers}
                  className={
                    "/users/list" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Users list
                </Sidebar.Item>
                <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                  Sign in
                </Sidebar.Item>
                <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                  Sign up
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="https://github.com/themesberg/flowbite-react/"
                  icon={HiClipboard}
                >
                  Docs
                </Sidebar.Item>
                <Sidebar.Item
                  href="https://flowbite-react.com/"
                  icon={HiCollection}
                >
                  Components
                </Sidebar.Item>
                <Sidebar.Item
                  href="https://github.com/themesberg/flowbite-react/issues"
                  icon={HiInformationCircle}
                >
                  Help
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
