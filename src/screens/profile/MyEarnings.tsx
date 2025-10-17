import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../../context'
import { Button, Header, Text, TransactionItem } from '../../components'
import { getScaleSize, useString } from '../../constant'
import { FONTS, IMAGES } from '../../assets'
import { SCREENS } from '..'

export default function MyEarnings(props: any) {
    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const DATA = [
        {
            name: 'Jane Cooper',
            date: '20 Jan, 22:44',
            amount: '€49.89',
            status: 'Success',
            paymentMethod: 'Credit Card',
        },
        {
            name: 'Jane Cooper',
            date: '20 Jan, 22:44',
            amount: '€49.89',
            status: 'Success',
            paymentMethod: 'Credit Card',
        },
        {
            name: 'Jane Cooper',
            date: '20 Jan, 22:44',
            amount: '€49.89',
            status: 'Success',
            paymentMethod: 'Credit Card',
        },
        {
            name: 'Jane Cooper',
            date: '20 Jan, 22:44',
            amount: '€49.89',
            status: 'Success',
            paymentMethod: 'Credit Card',
        },
        {
            name: 'Jane Cooper',
            date: '20 Jan, 22:44',
            amount: '€49.89',
            status: 'Success',
            paymentMethod: 'Credit Card',
        }
    ]

    const itemData = [
        { id: 1, title: 'Transaction Overview', onPress: SCREENS.Transactions.identifier },
        { id: 2, title: 'Account Information', onPress: SCREENS.BankDetails.identifier },
        { id: 3, title: 'History of Withdrawals', onPress: SCREENS.WithdrawHistory.identifier },
    ]

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.my_earnings}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(17)}
                        font={FONTS.Lato.Medium}
                        align='center'
                        color={theme._0E1B2780}>
                        {STRING.available_balance}
                    </Text>
                    <Text
                        style={{ marginVertical: getScaleSize(16) }}
                        size={getScaleSize(37)}
                        font={FONTS.Lato.ExtraBold}
                        align='center'
                        color={theme._0E1B27}>
                        {'€53,278.22 USD'}
                    </Text>
                    <View style={styles(theme).flexView}>
                        <Image source={IMAGES.ic_increase} style={styles(theme).increaseImage} />
                        <Text
                            size={getScaleSize(16)}
                            font={FONTS.Lato.Medium}
                            color={theme._4CAF50}>
                            {'+0.59% increase from last month'}
                        </Text>
                    </View>
                    <View style={styles(theme).chartContainer} />
                    <Text
                        size={getScaleSize(20)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._323232}
                        style={{ marginBottom: getScaleSize(24) }}>
                        {STRING.latest_transactions}
                    </Text>
                    {DATA.map((item, index) => (
                        <TransactionItem
                            itemContainer={{ marginBottom: getScaleSize(16)}}
                            key={index} item={item} />
                    ))}
                    <View>
                        {itemData.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles(theme).itemContainer}
                                    onPress={() => { props.navigation.navigate(item.onPress) }}>
                                    <Text
                                        size={getScaleSize(16)}
                                        font={FONTS.Lato.Medium}
                                        color={theme._2C6587}>
                                        {item.title}
                                    </Text>
                                    <Image source={IMAGES.ic_right} style={styles(theme).rightIcon} />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <Button
                style={{ marginHorizontal: getScaleSize(24), marginVertical: getScaleSize(24) }}
                title={STRING.request_withdrawal}
                onPress={() => { 
                    props.navigation.navigate(SCREENS.MoneyWithdrawal.identifier);
                }} />
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white
    },
    mainContainer: {
        marginTop: getScaleSize(30),
        marginHorizontal: getScaleSize(24),
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    increaseImage: {
        width: getScaleSize(19),
        height: getScaleSize(19),
        marginRight: getScaleSize(6),
    },
    chartContainer: {
        height: getScaleSize(200),
        borderWidth: 1,
        borderColor: theme._DCDDDD,
        borderRadius: getScaleSize(12),
        marginVertical: getScaleSize(30),
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: theme._E6E6E6,
        borderRadius: getScaleSize(12),
        padding: getScaleSize(16),
        marginVertical: getScaleSize(8),
    },
    rightIcon: {
        width: getScaleSize(24),
        height: getScaleSize(24),
        marginLeft: getScaleSize(12),
        tintColor: theme._2C6587,
        
    }
})