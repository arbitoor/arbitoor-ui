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
  NumberInput,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import format from 'format-number';
import { getTokensDataByVol24H } from '../../../utils/analyticServices';
import { formatTokenAdd, formatVol } from '../../../utils/helpers';
import ChartTitle from '../ChartTitle/ChartTitle';
import { useGlobalStore } from '../../../utils/globalStore';
import { toPrecision } from '@arbitoor/arbitoor-core';

function TopTokensByVol() {
  const [topTokensByVol, setTopTokensByVol] = React.useState<Array<any>>([]);
  const tokenListDB = useGlobalStore((state) => state.tokenListDB);

  async function topTokensDataFetcher() {
    const result = await getTokensDataByVol24H();

    let topTokens: any = [];
    for (const tx of result) {
      const result: any = tx.reduce((acc, curr, idx) => {
        if (idx === 0) {
          acc['tokenAddress'] = formatTokenAdd(tokenListDB, curr);
        }
        if (idx === 1) {
          acc['volume'] = formatVol(+curr, tokenListDB, acc.tokenAddress);
        }
        return acc;
      }, {});
      topTokens.push(result);
    }
    const data = topTokens.sort((a, b) => b.volume - a.volume);
    setTopTokensByVol(data);
  }

  useEffect(() => {
    topTokensDataFetcher();
  }, []);

  return (
    <React.Fragment>
      <ChartTitle title="Top Tokens" />
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha" color="white">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Token</Th>
              <Th>24H Volume</Th>
            </Tr>
          </Thead>
          <Tbody>
            {topTokensByVol.map((data, idx) => {
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
                    <Td>{data?.tokenAddress}</Td>
                    <Td>{formattedAmount}</Td>
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

export default TopTokensByVol;
