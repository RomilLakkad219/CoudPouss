import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeContext, ThemeContextType } from '../context/ThemeProvider';
import { Text } from '../components';
import { getScaleSize, useString } from '../constant';
import { FONTS } from '../assets';

const WebViewScreen = (props: any) => {

    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);
    const url = props.route.params?.url ?? '';

    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <View style={styles(theme).center}>
                <Text
                    size={getScaleSize(16)}
                    font={FONTS.Lato.Medium}
                    color={theme._818285}>
                    Unable to load document.
                </Text>

                <TouchableOpacity
                    onPress={() => setHasError(false)}
                    style={styles(theme).retryBtn}
                >
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.Medium}
                        color={theme._818285}>
                        {'Retry'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={styles(theme).backText}
                >
                    <Text
                        size={getScaleSize(16)}
                        font={FONTS.Lato.Medium}
                        color={theme._818285}>
                        {'GoBack'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: url }}
                javaScriptEnabled
                startInLoadingState
                onError={(e) => {
                    console.log('WebView error:', e.nativeEvent);
                    setHasError(true);
                  }}
                  
                  onHttpError={(e) => {
                    console.log('HTTP error:', e.nativeEvent.statusCode);
                    setHasError(true);
                  }}
            />
        </View>
    );
};

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        backText:{

        },
        retryBtn:{

        },
    });

export default WebViewScreen;


