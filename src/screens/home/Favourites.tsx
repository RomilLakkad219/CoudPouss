import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'

//COMPONENTS
import { FavouritesItem, Header } from '../../components';

//CONSTANTS & ASSETS
import { getScaleSize, useString } from '../../constant';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

export default function Favourites(props: any) {

    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.FavoriteProfessionals}
            />
            <FlatList
                data={['', '', '', '', '', '']}
                keyExtractor={(item: any, index: number) => index.toString()}
                numColumns={2}
                contentContainerStyle={{marginTop: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <FavouritesItem
                            itemContainer={styles(theme).itemContainer}
                        />
                    );
                }}
            />
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
    },
    itemContainer: {
        marginBottom: getScaleSize(14),
    }
})