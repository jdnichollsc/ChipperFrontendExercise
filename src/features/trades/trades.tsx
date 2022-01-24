import React, {useMemo} from 'react';
import {Button, View, StyleSheet, Text, FlatList} from 'react-native';
import {fetchTradeHistory, useTrades} from './state';
import {useAppDispatch} from '../../store';

export const Trades = () => {
  const dispatch = useAppDispatch();
  const trades = useTrades();
  const tradesSorted = useMemo(() => {
    const arr = trades ? [...trades] : [];
    return arr.sort(
      (tradeA, tradeB) => Number(tradeB.price) - Number(tradeA.price),
    );
  }, [trades]);

  return (
    <View style={styles.container}>
      <Button
        color="#8413F5"
        title="Fetch Trades"
        onPress={() => dispatch(fetchTradeHistory())}
        accessibilityLabel="Fetch Trades"
      />
      <FlatList
        horizontal={false}
        data={tradesSorted}
        key={'trades'}
        style={styles.listContainer}
        renderItem={({item}) => (
          <View key={item.trade_id} style={styles.listItem}>
            <View style={styles.column}>
              <View>
                <Text>Trade Price</Text>
                <Text>{item.price}</Text>
              </View>
              <View>
                <Text>Time</Text>
                <Text>{item.time}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View>
                <Text>Trade Size</Text>
                <Text>{item.size}</Text>
              </View>
              <View>
                <Text>Trade Side</Text>
                <Text>{item.side}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
});
