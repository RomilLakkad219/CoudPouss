import { FlatList, Image, ScrollView, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native'
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

export default function Notifications(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    function renderActionView(item: any) {
        if (item.type === 'request') {
            return (
                <View style={styles(theme).actionContainer}>
                    <TouchableOpacity style={styles(theme).themeButtonContainer}>
                        <Text size={getScaleSize(14)} font={FONTS.Lato.Regular} color={theme._F2F2F2}>
                            {"Accept"}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles(theme).separator} />
                    <TouchableOpacity style={styles(theme).secondaryButtonContainer}>
                        <Text size={getScaleSize(14)} font={FONTS.Lato.Regular} color={theme._6D6D6D}>
                            {"Decline"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else if (item.type === 'status') {
            return (
                <View style={styles(theme).actionContainer}>
                    <TouchableOpacity style={styles(theme).themeButtonContainer}>
                        <Text size={getScaleSize(14)} font={FONTS.Lato.Regular} color={theme._F2F2F2}>
                            {"Check Task Status"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return <View />;
    }

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.notifications}
            />
            <View style={styles(theme).container}>
                <FlatList
                    data={[{
                        title: 'Your service has started.',
                        date: 'Friday 2:22 PM',
                        time: '3 hours ago',
                        message: 'The provider has proposed a revised budget of €620 for your service.',
                        type: 'request'
                    }, {
                        title: 'New Budget Request',
                        date: 'Friday 2:22 PM',
                        time: '4 hours ago',
                        message: 'The provider has proposed a revised budget of €620 for your service.',
                        type: 'request'
                    }, {
                        title: '',
                        date: 'Friday 2:22 PM',
                        time: '5 hours ago',
                        message: 'Expert Bessie Cooper has arrived at your location and is requesting your approval to manually initiate the service.',
                        type: 'request'
                    }, {
                        title: '',
                        date: 'Friday 2:22 PM',
                        time: '5 hours ago',
                        message: 'Expert Bessie Cooper has arrived at your location and is requesting your approval to manually initiate the service.',
                        type: 'status'
                    }]}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item: any, index: number) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles(theme).itemContainer}>
                                <Image style={styles(theme).itemImage} />
                                <View style={styles(theme).itemDetailContainer}>
                                    {item.title &&
                                        <Text size={getScaleSize(16)} font={FONTS.Lato.Bold} color={theme._424242}>
                                            {item.title}
                                        </Text>
                                    }
                                    <Text
                                        style={{ marginTop: getScaleSize(4) }}
                                        size={getScaleSize(16)} font={FONTS.Lato.Medium} color={theme._595959}>
                                        {item.message}
                                    </Text>
                                    <View style={styles(theme).itemDateTimeContainer}>
                                        <Text size={getScaleSize(12)} font={FONTS.Lato.Regular} color={theme._818285}>
                                            {item.date}
                                        </Text>
                                        <Text size={getScaleSize(12)} font={FONTS.Lato.Regular} color={theme._818285}>
                                            {item.time}
                                        </Text>
                                    </View>
                                    {renderActionView(item)}
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
    itemContainer: {
        paddingVertical: getScaleSize(16),
        paddingHorizontal: getScaleSize(22),
        flexDirection: 'row',
    },
    itemImage: {
        width: getScaleSize(48),
        height: getScaleSize(48),
        borderRadius: getScaleSize(24),
        backgroundColor: theme._D5D5D5,
    },
    itemDetailContainer: {
        flex: 1.0,
        marginLeft: getScaleSize(16),
        marginRight: getScaleSize(22),
    },
    itemDateTimeContainer: {
        flex: 1.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: getScaleSize(4),
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: getScaleSize(16),
    },
    themeButtonContainer: {
        backgroundColor: theme._2C6587,
        paddingHorizontal: getScaleSize(10),
        paddingVertical: getScaleSize(8),
        borderRadius: getScaleSize(10),
    },
    secondaryButtonContainer: {
        borderWidth: 1,
        borderColor: '#ACADAD',
        paddingHorizontal: getScaleSize(10),
        paddingVertical: getScaleSize(8),
        borderRadius: getScaleSize(10),
    },
    separator: {
        width: getScaleSize(12),
    }
})