import { Image, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext, ThemeContextType } from '../context';
import { getScaleSize, useString } from '../constant';
import { FONTS, IMAGES } from '../assets';
import Text from './Text';

export default function RatingsReviewsItem(props: any) {

    const { onPressShowMore, showMore, itemContainer, item } = props;

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    return (
        <View style={[styles(theme).itemContainer, itemContainer]}>
            <View style={styles(theme).flexView}>
                <View style={styles(theme).profileIcon} />
                <View style={{ flex: 1.0 }}>
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._2B2B2B}>
                        {'Reviewer Name'}
                    </Text>
                    <Text size={getScaleSize(14)}
                        font={FONTS.Lato.Medium}
                        color={theme._6D6D6D}>
                        {'2 days ago'}
                    </Text>
                </View>
                <View style={styles(theme).flexView}>
                    <Image source={IMAGES.ic_star} style={styles(theme).starIcon} />
                    <Image source={IMAGES.ic_star} style={styles(theme).starIcon} />
                    <Image source={IMAGES.ic_star} style={styles(theme).starIcon} />
                    <Image source={IMAGES.ic_star_blank} style={styles(theme).starIcon} />
                    <Image source={IMAGES.ic_star_blank} style={styles(theme).starIcon} />
                </View>
            </View>
            <Text
                style={{ marginTop: getScaleSize(16) }}
                size={getScaleSize(14)}
                font={FONTS.Lato.Medium}
                color={theme._131313}
                numberOfLines={showMore ? undefined : 2}>
                {'The service was prompt and professional. I was very pleased with the outcome and would definitely work with them again.'}
            </Text>
            <Text size={getScaleSize(11)}
                font={FONTS.Lato.Regular}
                color={theme._436A00}
                style={{ marginTop: getScaleSize(4) }}
                onPress={onPressShowMore}>
                {showMore ? STRING.show_less : STRING.read_more}
            </Text>
            <View style={styles(theme).likeView}>
                <View style={styles(theme).flexView} >
                    <View style={styles(theme).flexView}>
                        <Image source={IMAGES.ic_thumbsDown} style={styles(theme).starIcon} />
                        <Text
                            style={{ marginLeft: getScaleSize(2) }}
                            size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            color={theme._707D85}>
                            {'###'}
                        </Text>
                    </View>
                    <View style={{ width: getScaleSize(8) }} />
                    <View style={styles(theme).flexView}>
                        <Image source={IMAGES.ic_thumbsUp} style={styles(theme).starIcon} />
                        <Text
                        size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            style={{ marginLeft: getScaleSize(2) }}
                            color={theme._707D85}>
                            {'###'}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderColor: theme._D5D5D5,
        borderRadius: getScaleSize(8),
        padding: getScaleSize(18),
    },
    flexView: {
        flexDirection: 'row',
    },
    profileIcon: {
        width: getScaleSize(40),
        height: getScaleSize(40),
        borderRadius: getScaleSize(40),
        backgroundColor: theme._D5D5D5,
        marginRight: getScaleSize(8),
    },
    starIcon: {
        width: getScaleSize(16),
        height: getScaleSize(16),
    },
    likeView: {
        alignItems: 'flex-end',
        marginTop: getScaleSize(8),
    }
})