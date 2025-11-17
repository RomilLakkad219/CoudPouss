import { FlatList, Image, StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Header, RatingsReviewsItem, Text } from '../../components';
import { ThemeContext, ThemeContextType } from '../../context';
import { getScaleSize, useString } from '../../constant';
import { FONTS, IMAGES } from '../../assets';

export default function RatingsReviews(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const [showMore, setShowMore] = useState(false);

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.ratings_reviews}
            />
            <View style={styles(theme).mainContainer}>
                <Text
                    style={{ marginVertical: getScaleSize(16) }}
                    size={getScaleSize(22)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._2B2B2B}>
                    {STRING.recent_works_reviews}
                </Text>
                <FlatList
                    data={['', '']}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item: any, index: number) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                           <RatingsReviewsItem
                           itemContainer={{ marginBottom: getScaleSize(24) }}
                           onPressShowMore={() => {
                            setShowMore(!showMore);
                           }}
                           showMore={showMore}
                           />
                        )
                    }}
                />
            </View>
        </View >
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: theme.white,
    },
    mainContainer: {
        flex: 1.0,
        marginHorizontal: getScaleSize(24),
    },
  
})