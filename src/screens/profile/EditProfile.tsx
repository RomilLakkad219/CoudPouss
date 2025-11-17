import React, { useContext, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';

//ASSETS
import { FONTS, IMAGES } from '../../assets';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT
import { getScaleSize, useString } from '../../constant';

//COMPONENT
import {
    Header,
    Input,
    Text,
    Button,
} from '../../components';

//PACKAGES

export default function EditProfile(props: any) {
    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);

    const [bio, setBio] = useState('With a passion for home improvement, I have dedicated over 8 years to perfecting my craft. My expertise spans from intricate plumbing tasks to seamless TV installations. I pride myself on delivering quality service with a personal touch, ensuring every client feels valued and satisfied.');
    const [bioError, setBioError] = useState('');
    const [experienceSpecialities, setExperienceSpecialities] = useState('Hi, I’m Bessie — with over 6 years of experience in expert TV mounting and reliable plumbing solutions. I specialize in mounting TVs, shelves, mirrors with precision and care Mounting Expert You Can Trust Over 6 of experience in securely mounting TVs, shelves, mirrors, artwork, and more Reliable & On-Time I value your time and ready to get the job done right the first time Clean Work, Solid Results Every project is done with attention to detail, safety, and durability Respect for Your Space I treat your home like it’s my own. Friendly, professional, and focused on delivering quality you’ll love. Client Satisfaction First I’m proud of my 5-star service and happy clients ');
    const [experienceSpecialitiesError, setExperienceSpecialitiesError] = useState('');
    const [achievements, setAchievements] = useState('Bessie Cooper has successfully completed over 150 projects, showcasing her expertise in TV mounting and plumbing. Her dedication to quality and customer satisfaction has earned her numerous accolades, including the "Best Service Provider" award in 2022. Clients consistently praise her attention to detail and professionalism, making her a top choice for home improvement services.')
    const [achievementsError, setAchievementsError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const [showCountryCode, setShowCountryCode] = useState(false);

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.edit_profile}
            />
            <ScrollView
                style={styles(theme).scrolledContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles(theme).profileContainer} />
                <Text
                    size={getScaleSize(16)}
                    font={FONTS.Lato.SemiBold}
                    align="center"
                    color={theme._2C6587}
                    style={{ marginBottom: getScaleSize(24) }}>
                    {STRING.edit_picture_or_avatar}
                </Text>
                <Text
                    size={getScaleSize(18)}
                    font={FONTS.Lato.Medium}
                    color={theme._2C6587}
                    style={{ marginBottom: getScaleSize(16) }}>
                    {STRING.personal_information}
                </Text>
                <View style={styles(theme).mainContainer}>
                    <Input
                        placeholder={STRING.enter_name}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.full_name}
                        inputColor={true}
                        value={name}
                        continerStyle={{ marginBottom: getScaleSize(20) }}
                        onChangeText={text => {
                            setName(text);
                            setNameError('');
                        }}
                        isError={nameError}
                    />
                    <Input
                        placeholder={STRING.enter_email}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.e_mail_id}
                        inputColor={true}
                        continerStyle={{ marginBottom: getScaleSize(20) }}
                        value={email}
                        onChangeText={text => {
                            setEmail(text);
                            setEmailError('');
                        }}
                        isError={emailError}
                    />
                    <Input
                        placeholder={STRING.enter_mobile_number}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.mobile_number}
                        inputColor={true}
                        keyboardType="numeric"
                        continerStyle={{ marginBottom: getScaleSize(20) }}
                        value={mobileNumber}
                        maxLength={10}
                        countryCode={'+91'}
                        onPressCountryCode={() => {
                            setShowCountryCode(true);
                        }}
                        onChangeText={text => {
                            setMobileNumber(text);
                            setMobileNumberError('');
                        }}
                        isError={mobileNumberError}
                    />
                    <Input
                        placeholder={STRING.enter_address}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.address}
                        inputColor={true}
                        value={address}
                        multiline={true}
                        inputContainer={{ height: getScaleSize(90), textAlignVertical: 'top' }}
                        continerStyle={{}}
                        onChangeText={text => {
                            setAddress(text);
                            setAddressError('');
                        }}
                        isError={addressError}
                    />
                </View>
                <Text
                    size={getScaleSize(18)}
                    font={FONTS.Lato.Medium}
                    color={theme._2C6587}
                    style={{ marginBottom: getScaleSize(16) }}>
                    {STRING.public_profile_details}
                </Text>
                <View style={styles(theme).mainContainer}>
                    <Input
                        placeholder={STRING.enter_name}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.Bio}
                        inputColor={true}
                        value={bio}
                        inputContainer={{ height: getScaleSize(200), textAlignVertical: 'top' }}
                        multiline={true}
                        continerStyle={{ marginBottom: getScaleSize(20) }}
                        onChangeText={text => {
                            setBio(text);
                            setBioError('');
                        }}
                        isError={bioError}
                    />
                    <Input
                        inputTitle={STRING.ExperienceSpecialities}
                        inputColor={true}
                        value={experienceSpecialities}
                        inputContainer={{ height: getScaleSize(200), textAlignVertical: 'top' }}
                        multiline={true}
                        continerStyle={{ marginBottom: getScaleSize(20) }}
                        onChangeText={text => {
                            setExperienceSpecialities(text);
                            setExperienceSpecialitiesError('');
                        }}
                        isError={experienceSpecialitiesError}
                    />
                    <Input
                        inputTitle={STRING.Achievements}
                        inputColor={true}
                        value={achievements}
                        inputContainer={{ height: getScaleSize(200), textAlignVertical: 'top' }}
                        multiline={true}
                        continerStyle={{ marginBottom: getScaleSize(20) }}
                        onChangeText={text => {
                            setAchievements(text);
                            setAchievementsError('');
                        }}
                        isError={achievementsError}
                    />
                    <Text
                        size={getScaleSize(17)}
                        font={FONTS.Lato.Medium}
                        color={theme._858686}>
                        {STRING.upload_images_of_past_works}
                    </Text>
                    <View style={styles(theme).imageUploadContent}>
                        <TouchableOpacity
                            style={[styles(theme).uploadButton, { marginRight: getScaleSize(9) }]}
                            activeOpacity={1}
                            onPress={() => { }}>
                            <Image
                                style={styles(theme).attachmentIcon}
                                source={IMAGES.upload_attachment}
                            />
                            <Text
                                style={{ marginTop: getScaleSize(8) }}
                                size={getScaleSize(15)}
                                font={FONTS.Lato.Regular}
                                color={theme._818285}>
                                {STRING.upload_from_device}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles(theme).uploadButton, { marginLeft: getScaleSize(9) }]}
                            activeOpacity={1}
                            onPress={() => { }}>
                            <Image
                                style={styles(theme).attachmentIcon}
                                source={IMAGES.upload_attachment}
                            />
                            <Text
                                style={{ marginTop: getScaleSize(8) }}
                                size={getScaleSize(15)}
                                font={FONTS.Lato.Regular}
                                color={theme._818285}>
                                {STRING.upload_from_device}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Button
                title={STRING.update}
                style={styles(theme).updateButton}
                onPress={() => {
                    props.navigation.goBack();
                 }}
            />
            <SafeAreaView />
        </View>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.white },
        scrolledContainer: {
            marginHorizontal: getScaleSize(24),
        },
        profileContainer: {
            width: getScaleSize(126),
            height: getScaleSize(126),
            backgroundColor: theme._F0EFF0,
            borderRadius: getScaleSize(126),
            alignSelf: 'center',
            marginBottom: getScaleSize(12),
        },
        mainContainer: {
            marginBottom: getScaleSize(24),
            borderWidth: 1,
            borderColor: theme._E6E6E6,
            borderRadius: getScaleSize(12),
            padding: getScaleSize(24),
        },
        imageUploadContent: {
            marginTop: getScaleSize(12),
            flexDirection: 'row',
        },
        uploadButton: {
            flex: 1.0,
            borderWidth: 1,
            borderColor: theme._818285,
            borderStyle: 'dashed',
            borderRadius: getScaleSize(8),
            justifyContent: 'center',
            alignItems: 'center',
            height: getScaleSize(160),
        },
        attachmentIcon: {
            height: getScaleSize(40),
            width: getScaleSize(40),
            alignSelf: 'center',
        },
        updateButton: {
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(24),
        }
    });
