import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import format from 'format-number';
import ChartTitle from '../ChartTitle/ChartTitle';
import { useGlobalStore } from '../../../utils/globalStore';
import { toPrecision } from '@arbitoor/arbitoor-core';
import { getDexListByVol24H } from '../../../utils/analyticServices';
import { dexList } from '../../../utils/dexList';
import { formatDexAdd } from '../../../utils/helpers';

function TopDexByVol() {
  const [topDexByVol, setTopDexByVol] = React.useState<Array<any>>([]);

  async function topDexListFetcher() {
    const data = await getDexListByVol24H();

    let topDexs: any = [];

    for (const dexData of data) {
      const res = dexData.reduce((acc, curr, idx) => {
        if (idx === 0) {
          acc['dexName'] = formatDexAdd(dexList, curr);
        }
        if (idx === 1) {
          acc['volume'] = curr;
        }
        return acc;
      }, {});
      topDexs.push(res);
    }

    const result = topDexs.sort((a, b) => b.volume - a.volume);
    setTopDexByVol(result);
  }

  useEffect(() => {
    topDexListFetcher();
  }, []);

  console.log({ topDexByVol });

  return (
    <React.Fragment>
      <ChartTitle title="Top Pool Providers" />
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha" color="white">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Pool Provider</Th>
              <Th isNumeric>24H Volume</Th>
            </Tr>
          </Thead>
          <Tbody>
            {topDexByVol.map((data, idx) => {
              const formatConfig = format({
                prefix: '$',
              });
              const formattedAmount = formatConfig(
                +toPrecision(data?.volume, 2)
              );
              return (
                <React.Fragment key={idx}>
                  <Tr>
                    <Td>{idx + 1}</Td>
                    <Td>{data?.dexName}</Td>
                    <Td isNumeric>{formattedAmount}</Td>
                  </Tr>
                </React.Fragment>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default TopDexByVol;
