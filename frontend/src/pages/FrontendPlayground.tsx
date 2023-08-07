/* eslint-disable */
import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Editor } from "@tinymce/tinymce-react";
import "../css/editor.css";
import axios from "axios";
import { Category, Ticket } from "../utils/TicketTypes/Ticket";
import { MouseEventHandler, useCallback, useState } from "react";

export const FrontendPlayground = () => {
  const [tickets, setTickets] = useState<Ticket[]>();
  type Data = Ticket[];
  type SortKeys = keyof Ticket;
  type SortOrder = "ascn" | "desc";

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get(
        "http://localhost:1913/api/ticket/getall",
      );
      setTickets(response.data);
    };
    fetchTickets();
  }, []);

  function sortData({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: Data;
    sortKey: SortKeys;
    reverse: boolean;
  }) {
    if (!sortKey) return tableData;

    if (tickets) {
      const sortedData = tickets.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      });

      if (reverse) {
        return sortedData.reverse();
      }

      return sortedData;
    }

    function SortButton({
      sortOrder,
      columnKey,
      sortKey,
      onClick,
    }: {
      sortOrder: SortOrder;
      columnKey: SortKeys;
      sortKey: SortKeys;
      onClick: MouseEventHandler<HTMLButtonElement>;
    }) {
      return (
        <button
          onClick={onClick}
          className={`${
            sortKey === columnKey && sortOrder === "desc"
              ? "sort-button sort-reverse"
              : "sort-button"
          }`}
        >
          ▲
        </button>
      );
    }

    function SortableTable() {
      const [sortKey, setSortKey] = useState<SortKeys>("ticketNumber");
      const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

      const headers: { key: SortKeys; label: string }[] = [
        { key: "_id", label: "ID" },
        { key: "ticketNumber", label: "Ticket Number" },
        { key: "clientName", label: "Client Name" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
        { key: "subject", label: "Subject" },
      ];

      // const sortedData = useCallback(() => {
      //   if (tickets)
      //     sortData({
      //       tableData: tickets,
      //       sortKey,
      //       reverse: sortOrder === "desc",
      //     }),
      //       [tickets, sortKey, sortOrder];
      // });

        const sortedData = useCallback(
    () => sortData({ tableData: tickets!, sortKey, reverse: sortOrder === "desc" }), [tickets, sortKey, sortOrder]);
      function changeSort(key: SortKeys) {
        setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

        setSortKey(key);
      }

      return (
        <table>
          <thead>
            <tr>
              {headers.map((row) => {
                return (
                  <td key={row.key}>
                    {row.label}{" "}
                    <SortButton
                      columnKey={row.key}
                      onClick={() => changeSort(row.key)}
                      {...{
                        sortOrder,
                        sortKey,
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedData()!.map((person) => {
              return (
                <tr key={person._id}>
                  <td>{person._id}</td>
                  <td>{person.clientName}</td>
                  {/* <td>{person.first_name}</td>
                  <td>{person.last_name}</td>
                  <td>{person.email}</td>
                  <td>{person.gender}</td>
                  <td>{person.ip_address}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
  return <></>;
};
