import { Image, ScrollView, SectionList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context'

//COMPONENTS
import { Header } from '../../components';

//COMPONENTS
import { Text } from '../../components';

//CONSTANT
import { getScaleSize, useString } from '../../constant';
import { FONTS, IMAGES } from '../../assets';

export default function Transactions(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.transactions}
            />
            <View style={styles(theme).headerStyle}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {["Status", "Payment Method", "Date"].map((item, index) => {
                        return (
                            <View style={styles(theme).filterView}>
                                <Text size={getScaleSize(14)} font={FONTS.Lato.Medium} color={theme._2B2B2B}>
                                    {item}
                                </Text>
                                <Image source={IMAGES.ic_down} style={styles(theme).downIcon} />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={styles(theme).mainContainer}>
                <SectionList
                    sections={[
                        {
                            title: { month: "September", year: "2025", total: "€2,500.89" },
                            data: [{
                                name: 'Jane Cooper',
                                date: '20 Jan, 22:44',
                                amount: '€49.89',
                                status: 'Success',
                                paymentMethod: 'Credit Card',
                            }, {
                                name: 'Jane Cooper',
                                date: '20 Jan, 22:44',
                                amount: '€49.89',
                                status: 'Success',
                                paymentMethod: 'Credit Card',
                            }, {
                                name: 'Jane Cooper',
                                date: '20 Jan, 22:44',
                                amount: '€49.89',
                                status: 'Success',
                                paymentMethod: 'Credit Card',
                            }, {
                                name: 'Jane Cooper',
                                date: '20 Jan, 22:44',
                                amount: '€49.89',
                                status: 'Success',
                                paymentMethod: 'Credit Card',
                            }, {
                                name: 'Jane Cooper',
                                date: '20 Jan, 22:44',
                                amount: '€49.89',
                                status: 'Success',
                                paymentMethod: 'Credit Card',
                            }]
                        },
                        {
                            title: { month: "September", year: "2025", total: "€2,500.89" },
                            data: [{
                                name: 'Jane Cooper',
                                date: '20 Jan, 22:44',
                                amount: '€49.89',
                                status: 'Success',
                                paymentMethod: 'Credit Card',
                            }]
                        },
                        {
                            title: { month: "September", year: "2025", total: "€2,500.89" },
                            data: [{
                                name: 'Jane Cooper',
                                date: '20 Jan, 22:44',
                                amount: '€49.89',
                                status: 'Success',
                                paymentMethod: 'Credit Card',
                            }]
                        }
                    ]}
                    renderSectionHeader={({ section }) => {
                        return (
                            <View style={styles(theme).sectionHeaderContainer}>
                                <View style={styles(theme).dateContainer}>
                                    <Text size={getScaleSize(16)} font={FONTS.Lato.Medium} color={'#2C6587'}>
                                        {section.title.year}
                                    </Text>
                                    <Text size={getScaleSize(24)} font={FONTS.Lato.Bold} color={'#2C6587'}>
                                        {section.title.month}
                                    </Text>
                                </View>
                                <Text size={getScaleSize(24)} font={FONTS.Lato.Bold} color={'#2C6587'}>
                                    {section.title.total}
                                </Text>
                            </View>
                        )
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles(theme).transactionItem}>
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
                                    <Text size={getScaleSize(16)} font={FONTS.Lato.SemiBold} color={'#787878'}>
                                        {item.amount}
                                    </Text> 
                                    <Text size={getScaleSize(16)} font={FONTS.Lato.SemiBold} color={'#4CAF50'}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: theme.white,
    },
    headerStyle: {
        flexDirection: 'row',
        paddingLeft: getScaleSize(10),
        paddingRight: getScaleSize(22),
        marginTop: getScaleSize(11),
        marginBottom: getScaleSize(16),
    },
    filterView: {
        borderRadius: getScaleSize(4),
        borderWidth: 1,
        borderColor: '#DCDDDD',
        paddingHorizontal: getScaleSize(16),
        paddingVertical: getScaleSize(10),
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: getScaleSize(12),
    },
    downIcon: {
        width: getScaleSize(18),
        height: getScaleSize(18),
        marginLeft: getScaleSize(10),
    },
    mainContainer: {
        flex: 1.0,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EAF0F3",
        paddingVertical: getScaleSize(13),
        paddingHorizontal: getScaleSize(22),
        marginTop: getScaleSize(6),
    },
    dateContainer: {
        flex: 1.0
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: getScaleSize(16),
        paddingHorizontal: getScaleSize(22),
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