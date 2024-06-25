import React, { useEffect, useState } from "react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import SidebarAccordion from "./SidebarAccordion";

export function Sidebar({ user }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="relative m-[10rem]">
      <Card className="fixed bottom-0 left-0 z-50 h-[calc(100vh-4.92rem)] w-full max-w-[20rem] p-4 shadow-none dark:bg-components-dark border-t rounded-none border-gray-300 dark:border-gray-700">
        {/* <div className="mb-2 p-4 dark:text-white">4.91
        <Typography variant="h5" color="blue-gray" className="dark:text-white">
          Sidebar
        </Typography>
      </div> */}
        {user?.role === "admin" && (
          <List className="dark:text-white">
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 dark:text-white transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                className="p-0 dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white"
                selected={open === 1}
              >
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5 dark:text-white" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal dark:text-white "
                  >
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1 ">
                <List className="p-0 dark:text-white">
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5 " />
                    </ListItemPrefix>
                    <Link href={route("admin.dashboard")}>Analytics</Link>
                  </ListItem>
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>

            <SidebarAccordion
              title="Product"
              number={2}
              handleOpen={handleOpen}
              open={open}
              links={[
                {
                  path: route("all.products"),
                  pathName: "All products",
                },
                {
                  path: route("add.products"),
                  pathName: "Add Product",
                },
              ]}
            />

            <SidebarAccordion
              title="Categories"
              number={3}
              handleOpen={handleOpen}
              open={open}
              links={[
                {
                  path: route("all.categories"),
                  pathName: "All Categories",
                },
                {
                  path: route("add.categories"),
                  pathName: "Add Category",
                },
              ]}
            />

            {/* Manage users */}

            <SidebarAccordion
              title="Users"
              number={4}
              handleOpen={handleOpen}
              open={open}
              links={[
                {
                  path: route("all.vendors"),
                  pathName: "All Vendors",
                },
                {
                  path: route("all.customers"),
                  pathName: "Add customers",
                },
              ]}
            />

            <SidebarAccordion
              title="Attributes"
              handleOpen={handleOpen}
              open={open}
              number={5}
              links={[
                {
                  path: route("all.attributes"),
                  pathName: "All Attributes",
                },
                {
                  path: route("all.customers"),
                  pathName: "Add Attributes",
                },
              ]}
            />

            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        )}
        {/* vendor  sidebar*/}
        {/* vendor sidebar */}

        {user?.role === "vendor" && (
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 dark:text-white transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                className="p-0 dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white"
                selected={open === 1}
              >
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5 dark:text-white" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal dark:text-white "
                  >
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1 ">
                <List className="p-0 dark:text-white">
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5 " />
                    </ListItemPrefix>
                    <Link href={route("admin.dashboard")}>Analytics</Link>
                  </ListItem>
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 dark:text-white transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                className="p-0 dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white"
                selected={open === 2}
              >
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5 dark:text-white" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal dark:text-white"
                  >
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 dark:text-white">
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <Link href={route("furniture.index")}>Products</Link>
                  </ListItem>
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <Link href={route("furniture.index")}>Add Products</Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 dark:text-white transition-transform ${
                    open === 3 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                className="p-0 dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white"
                selected={open === 2}
              >
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5 dark:text-white" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal dark:text-white"
                  >
                    Categories
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem className="dark:text-white dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <Link href={route("all.categories")}>All Categories</Link>
                  </ListItem>
                  <ListItem className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <Link href={route("add.categories")}>Add Category</Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        )}
      </Card>
    </div>
  );
}

export default Sidebar;
