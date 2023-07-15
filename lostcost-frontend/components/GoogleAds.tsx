import { View, Platform } from "react-native";
import tw from "tailwind-react-native-classnames";
import { AppOpenAd, BannerAd, TestIds, BannerAdSize, AdEventType } from "react-native-google-mobile-ads";
import { ANDROID_APP_BANNER, ANDROID_APP_OPEN } from "@env";

const adOpenUnitId = __DEV__ ? TestIds.APP_OPEN : ANDROID_APP_OPEN;
const adBannerUnitId = __DEV__ ? TestIds.BANNER : ANDROID_APP_BANNER;

let appOpenAd: AppOpenAd;

if (Platform.OS === "android") {
    appOpenAd = AppOpenAd.createForAdRequest(adOpenUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });
    appOpenAd?.load();
}

const GoogleAds = () => {
    appOpenAd?.addAdEventListener(AdEventType.LOADED, () => {
        appOpenAd?.show();
    });

    return (
        <View style={tw`flex justify-center items-center text-center mt-auto`}>
            <BannerAd
                unitId={adBannerUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
};

export default GoogleAds;
