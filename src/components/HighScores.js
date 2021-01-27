import React, { useState, useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

const sampleData = [
    {
        userid: "Billy Smith",
        points: 600,
        gamemode: "Rounds"
    },
    {
        userid: "Henry",
        points: 800,
        gamemode: "Rounds"
    },
    {
        userid: "Roger Jacobson",
        points: 900,
        gamemode: "Rounds"
    }
]

let sortedData = sampleData.sort(function (p1, p2) {
    return p2.points - p1.points;
  });
console.log(sortedData)

const HighScores = () => {

    function tableDataRender(array) {
        for (let i = 0; i < array.length; i++) {
            return (
                <Tr>
                    <Td>{array[i].userid}</Td>
                    <Td>{array[i].points}</Td>
                    <Td>{array[i].gamemode}</Td>
                </Tr>
            )
        }
        
    }


    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Username</Th>
                    <Th>Points</Th>
                    <Th>Gamemode</Th>
                </Tr>
            </Thead>
            <Tbody>
                {tableDataRender(sortedData)}
            </Tbody>
        </Table>
        

      )
}
export default HighScores