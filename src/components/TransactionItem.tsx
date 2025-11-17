import { Image, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../context'
import { getScaleSize, useString } from '../constant'
import Text from './Text';
import { FONTS } from '../assets';

export default function TransactionItem(props: any) {
    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();
    const { item, itemContainer } = props;
    return (
        <View style={[styles(theme).transactionItem, itemContainer]}>
            <Image style={styles(theme).transactionItemImage} />
            <View style={styles(theme).transactionItemDetails}>
                <Text size={getScaleSize(19)} font={FONTS.Lato.Medium} color={theme._2B2B2B}>
                    {item.name}
                </Text>
                <Text size={getScaleSize(16)} font={FONTS.Lato.SemiBold} color={theme._818285}>
                    {item.date}
                </Text>
            </View>
            <View style={styles(theme).transactionStatusContainer}>
                <Text size={getScaleSize(16)} font={FONTS.Lato.SemiBold} color={theme._787878}>
                    {item.amount}
                </Text>
                <Text size={getScaleSize(16)} font={FONTS.Lato.SemiBold} color={theme._4CAF50}>
                    {item.status}
                </Text>
            </View>
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionItemImage: {
        width: getScaleSize(48),
        height: getScaleSize(48),
        borderRadius: getScaleSize(24),
        backgroundColor: theme._D5D5D5,
    },
    transactionItemDetails: {
        flex: 1.0,
        marginHorizontal: getScaleSize(12),
    },
    transactionStatusContainer: {
        alignItems: 'flex-end',
    }
})