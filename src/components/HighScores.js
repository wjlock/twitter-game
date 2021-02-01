import React, { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const HighScores = () => {
  const { data, error } = useSWR(
    `${REACT_APP_SERVER_URL}/api/highscores/allhighscores`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (!data) return;
    const sortedData = data?.sort((p1, p2) => p2.points - p1.points);
    console.log(sortedData);
    setSortedData(sortedData);
  }, [data]);

  const tableRender = sortedData.map((array) => {
    return (
      <Tr>
        <Td>{array.userid}</Td>
        <Td>{array.points}</Td>
        <Td>{array.gamemode}</Td>
      </Tr>
    );
  });

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Username</Th>
          <Th>Points</Th>
          <Th>Gamemode</Th>
        </Tr>
      </Thead>
      <Tbody>{tableRender}</Tbody>
    </Table>
  );
};
export default HighScores;
