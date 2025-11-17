import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//COMPONENTS
import { Header, Text } from '../../components';

//CONSTANT
import { getScaleSize, useString } from '../../constant';
import { FONTS } from '../../assets';

export default function WithdrawHistory(props: any) {
    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const DATA = [
        {
            id: 1,
            amount: '€100.00',
            status: 'Completed',
            date: 'Requested on 20 January',
        },
        {
            id: 1,
            amount: '€120.00',
            status: 'Pending',
            date: 'Requested on 20 January',
        },
        {
            id: 1,
            amount: '€1030.00',
            status: 'Completed',
            date: 'Requested on 20 January',
        }, 
        {
            id: 1,
            amount: '€100.00',
            status: 'Completed',
            date: 'Requested on 20 January',
        },
        {
            id: 1,
            amount: '€120.00',
            status: 'Pending',
            date: 'Requested on 20 January',
        },
        {
            id: 1,
            amount: '€1030.00',
            status: 'Completed',
            date: 'Requested on 20 January',
        },
    ]

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.withdraw_history}
            />
            <FlatList
                data={DATA}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{marginVertical: getScaleSize(24)}}
                keyExtractor={(item: any, index: number) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles(theme).itemContainer}>
                            <View>
                                <Text
                                    size={getScaleSize(16)}
                                    font={FONTS.Lato.Medium}
                                    color={theme._2B2B2B}
                                    style={{ marginBottom: getScaleSize(6) }}>
                                    {item.amount}
                                </Text>
                                <Text
                                    size={getScaleSize(14)}
                                    font={FONTS.Lato.Medium}
                                    color={theme._818285}>
                                    {item.date}
                                </Text>
                            </View>
                            <Text
                                size={getScaleSize(12)}
                                font={FONTS.Lato.Medium}
                                color={item.status === 'Completed' ? theme._00B500 : theme._FFBB4E}>
                                {item.status}
                            </Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: theme.white,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: getScaleSize(24),
        marginBottom: getScaleSize(24),
    }
})