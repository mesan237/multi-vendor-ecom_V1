import {
  ChevronDownIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const SidebarAccordion = ({ title, links, number, handleOpen, open }) => {
  return (
    <>
      <Accordion
        open={open === number}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 dark:text-white transition-transform ${
              open === number ? "rotate-180" : ""
            }`}
          />
        }
      >
        <ListItem
          className="p-0 dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white"
          selected={open === number}
        >
          <AccordionHeader
            onClick={() => handleOpen(number)}
            className="border-b-0 p-3"
          >
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5 dark:text-white" />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="mr-auto font-normal dark:text-white"
            >
              {title}
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            {links?.map(({ path, pathName }, index) => (
              <ListItem
                key={index}
                className="dark:hover:bg-[rgb(55,65,81)] dark:hover:text-white"
              >
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link href={path}>{pathName}</Link>
              </ListItem>
            ))}
          </List>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default SidebarAccordion;
