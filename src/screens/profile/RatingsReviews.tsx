import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

//ASSETS
import { FONTS } from '../../assets';

//API
import { API } from '../../api';

//COMPONENTS
import { Header, ProgressView, RatingsReviewsItem, Text } from '../../components';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANTS
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

export default function RatingsReviews(props: any) {

    const { theme } = useContext<any>(ThemeContext);
    const STRING = useString();

    const [showMore, setShowMore] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getRatingReviews()
    }, [])

    async function getRatingReviews() {

        try {

            setLoading(true)
            const result = await API.Instance.get(API.API_ROUTES.ratingAndReviews);
            setLoading(false)

            console.log('RATING REVIEWS RES', JSON.stringify(result))

            if (result?.status) {

            }
            else {

            }

        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        }

    }

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
            {isLoading && <ProgressView />}
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