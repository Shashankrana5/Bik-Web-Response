import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

import { Card, Typography, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Ticket } from "../utils/TicketTypes/Ticket";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { host_ip } from "..";

type TicketField =
  | "ticketNumber"
  | "client"
  | "subject"
  | "category"
  | "status"
  | "assignedTo";

const TABLE_HEAD = [
  "Ticket Number",
  "Client",
  "Subject",
  "Category",
  "Status",
  "Assigned To",
];
const mapping: { [key: string]: TicketField } = {
  "Ticket NumberTICK": "ticketNumber",
  Client: "client",
  Subject: "subject",
  Category: "category",
  Status: "status",
  "Assigned To": "assignedTo",
};

function SortableTable() {
  const [tickets, setTickets] = useState<Ticket[] | null>();
  const [order, setOrder] = useState<string[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get(
        `http://${host_ip}:1913/api/ticket/getall`,
      );
      setTickets(response.data);
    };
    fetchTickets();
  }, []);
  useEffect(() => {
    if (tickets) {
    }
  }, [tickets]);

  const sortTickets = (key: TicketField) => {
    if (tickets) {
      if (order && order[0] === key) {
        if (order[1] === "reverse") {
          setTickets(
            JSON.parse(
              JSON.stringify(
                tickets.sort((a: Ticket, b: Ticket) =>
                  a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0,
                ),
              ),
            ),
          );
          setOrder([key, "not reverse"]);
        } else {
          setTickets(
            JSON.parse(
              JSON.stringify(
                tickets.sort((a: Ticket, b: Ticket) =>
                  a[key] > b[key] ? 0 : b[key] > a[key] ? -1 : 0,
                ),
              ),
            ).reverse(),
          );
          setOrder([key, "reverse"]);
        }
      } else {
        setTickets(
          JSON.parse(
            JSON.stringify(
              tickets.sort((a: Ticket, b: Ticket) =>
                a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0,
              ),
            ),
          ),
        );
        setOrder([key, "not reverse"]);
      }
    }
  };

  const sortByCategory = () => {
    if (tickets) {
      if (order && order[0] === "category") {
        if (order[1] === "reverse") {
          setTickets(
            JSON.parse(
              JSON.stringify(
                tickets.sort((a: Ticket, b: Ticket) =>
                  a.category.category > b.category.category
                    ? 1
                    : b.category.category > a.category.category
                    ? -1
                    : 0,
                ),
              ),
            ),
          );
          setOrder(["category", "not reverse"]);
        } else {
          setTickets(
            JSON.parse(
              JSON.stringify(
                tickets.sort((a: Ticket, b: Ticket) =>
                  a.category.category > b.category.category
                    ? 0
                    : b.category.category > a.category.category
                    ? -1
                    : 0,
                ),
              ),
            ).reverse(),
          );
          setOrder(["category", "reverse"]);
        }
      } else {
        setTickets(
          JSON.parse(
            JSON.stringify(
              tickets.sort((a: Ticket, b: Ticket) =>
                a.category.category > b.category.category
                  ? 1
                  : b.category.category > a.category.category
                  ? -1
                  : 0,
              ),
            ),
          ),
        );
        setOrder(["category", "not reverse"]);
      }
    }
  };

  const handleDoubleClick = (ticketNumber: string) => {
    navigate(`/ticket/${ticketNumber}`);
  };
  return (
    <div id="sortable-table-main" className="p-6">
      <Card className="h-full w-full p-6 shadow-lg">
        {/* <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
          </div>
        </div>
      </CardHeader> */}
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    onClick={() => {
                      if (head === "Category") {
                        sortByCategory();
                      } else if (head === "Client") {
                        sortTickets("client");
                      } else sortTickets(mapping[head]);
                    }}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map(
                  (
                    {
                      ticketNumber,
                      clientName,
                      email,
                      subject,
                      category,
                      status,
                      assignedTo,
                    },
                    index,
                  ) => {
                    const isLast = index === tickets?.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr
                        id={"row" + index}
                        key={ticketNumber}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-gray-100"
                        // onClick={(e) => console.log(ticketNumber)}
                        onDoubleClick={() => handleDoubleClick(ticketNumber)}
                      >
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {ticketNumber}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {clientName}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            {/* <Typography variant="small" color="blue-gray" className="font-normal">
                        {subject}
                      </Typography> */}
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {subject}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {category.category}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {status}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {assignedTo.fullName}
                          </Typography>
                        </td>
                      </tr>
                    );
                  },
                )}
            </tbody>
          </table>
        </CardBody>
        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
      </Card>
    </div>
  );
}

export default SortableTable;
