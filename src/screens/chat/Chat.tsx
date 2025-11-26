import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  FlatList,
} from 'react-native';

//ASSETS
import {FONTS, IMAGES} from '../../assets';

//CONTEXT
import {ThemeContext, ThemeContextType, AuthContext} from '../../context';

//CONSTANT
import {getScaleSize, useString} from '../../constant';

//COMPONENT
import {SearchComponent, Text} from '../../components';

//PACKAGES
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '..';
import {ChatThread, subscribeToThreads} from '../../services/chat';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export default function Chat(props: any) {
  const STRING = useString();
  const {theme} = useContext<any>(ThemeContext);
  const {user} = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [threads, setThreads] = useState<ChatThread[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(theme.white);
        StatusBar.setBarStyle('dark-content');
      }
    }, [theme.white]),
  );

  useEffect(() => {
    if (!user?.user_id) {
      setThreads([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = subscribeToThreads(
      user.user_id,
      results => {
        setThreads(results);
        setIsLoading(false);
      },
      error => {
        console.log('Failed to subscribe to chats', error);
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, [user?.user_id]);

  const filteredThreads = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return threads;
    }

    return threads.filter(thread => {
      const peer = getPeerMeta(thread, user?.user_id);
      return peer.name.toLowerCase().includes(query);
    });
  }, [threads, searchQuery, user?.user_id]);

  const renderThread = ({item}: {item: ChatThread}) => {
    const peer = getPeerMeta(item, user?.user_id);
    return (
      <TouchableOpacity
        style={styles(theme).itemContainer}
        activeOpacity={0.85}
        onPress={() => {
          props.navigation.navigate(SCREENS.ChatDetails.identifier, {
            threadId: item.id,
            peerUser: {
              user_id: peer.id,
              name: peer.name,
              email: peer.email,
              avatarUrl: peer.avatarUrl,
            },
          });
        }}>
        <Image
          style={styles(theme).userImage}
          source={
            peer.avatarUrl ? {uri: peer.avatarUrl} : IMAGES.user_placeholder
          }
        />
        <View style={styles(theme).threadContent}>
          <Text
            size={getScaleSize(16)}
            font={FONTS.Lato.Medium}
            color={theme._2B2B2B}>
            {peer.name || STRING.unknown_user}
          </Text>
          <Text
            numberOfLines={1}
            size={getScaleSize(12)}
            font={FONTS.Lato.Regular}
            color={theme._ACADAD}>
            {item.lastMessage || STRING.no_messages_yet}
          </Text>
        </View>
        <View style={styles(theme).threadMeta}>
          <Text
            size={getScaleSize(10)}
            font={FONTS.Lato.Regular}
            color={theme._ACADAD}>
            {formatTimestamp(item.updatedAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.white}
        translucent={false}
      />
      <Text
        size={getScaleSize(24)}
        font={FONTS.Lato.Bold}
        color={theme.primary}
        style={{
          marginTop: getScaleSize(8),
          marginHorizontal: getScaleSize(22),
        }}>
        {STRING.Chat}
      </Text>
      <View style={styles(theme).scrolledContainer}>
        <SearchComponent value={searchQuery} onChangeText={setSearchQuery} />
        {isLoading ? (
          <View style={styles(theme).loaderContainer}>
            <ActivityIndicator size="small" color={theme.primary} />
          </View>
        ) : filteredThreads.length ? (
          <FlatList
            data={filteredThreads}
            keyExtractor={item => item.id}
            renderItem={renderThread}
            contentContainerStyle={{paddingBottom: getScaleSize(24)}}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles(theme).emptyState}>
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.Medium}
              color={theme._ACADAD}
              align="center">
              {STRING.no_conversations_found}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const getPeerMeta = (thread: ChatThread, currentUserId?: string) => {
  const peerId =
    thread.participantIds.find(
      participantId => participantId !== currentUserId,
    ) ??
    thread.participantIds[0] ??
    '';

  const peerMeta = thread.participantsMeta?.[peerId] ?? {};

  return {
    id: peerId,
    name: peerMeta?.name || 'User',
    email: peerMeta?.email || '',
    avatarUrl: peerMeta?.avatarUrl || '',
  };
};

const formatTimestamp = (
  timestamp?: FirebaseFirestoreTypes.Timestamp | null,
) => {
  if (!timestamp) {
    return '';
  }

  const date = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp as any);
  const now = new Date();

  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isSameDay) {
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }

  return date.toLocaleDateString();
};

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.white},
    scrolledContainer: {
      marginHorizontal: getScaleSize(22),
      marginTop: getScaleSize(24),
      flex: 1.0,
    },
    userImage: {
      height: getScaleSize(60),
      width: getScaleSize(60),
      borderRadius: getScaleSize(30),
    },
    itemContainer: {
      marginTop: getScaleSize(24),
      flexDirection: 'row',
    },
    threadContent: {
      alignSelf: 'center',
      marginLeft: getScaleSize(12),
      flex: 1.0,
    },
    threadMeta: {
      alignItems: 'flex-end',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: getScaleSize(24),
    },
  });
