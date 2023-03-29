import OverlayBundle from "../types/overlay/OverlayBundle";
import { View, Image, ImageBackground, Text } from "react-native";
import { textColorForBackground } from "../utils/color";

const width = 360;
const paddingHorizontal = 24;
const paddingVertical = 16;
const logoHeight = 80;

function computedStyles(overlay?: OverlayBundle) {
  return {
    container: {
      backgroundColor: overlay?.branding?.primaryBackgroundColor,
      display: "flex",
    },
    primaryBodyContainer: {
      paddingHorizontal,
      paddingVertical,
    },
    secondaryBodyContainer: {
      height: 1.5 * logoHeight,
      backgroundColor:
        (overlay?.branding?.backgroundImage
          ? "rgba(0, 0, 0, 0)"
          : overlay?.branding?.secondaryBackgroundColor) ??
        "rgba(0, 0, 0, 0.24)",
    },
    logoContainer: {
      top: -0.5 * logoHeight,
      left: paddingHorizontal,
      marginBottom: -1 * logoHeight,
      width: logoHeight,
      height: logoHeight,
      backgroundColor: "#ffffff",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      color: textColorForBackground(
        overlay?.branding?.primaryBackgroundColor ?? "#000000"
      ),
      flexShrink: 1,
    },

    label: {
      fontSize: 14,
      fontWeight: "bold",
    },
    normal: {
      fontSize: 18,
      fontWeight: "normal",
    },
  };
}

function DetailLogo({
  overlay,
  styles,
}: {
  overlay?: OverlayBundle | undefined;
  styles?: any;
}) {
  return (
    <View style={styles.logoContainer}>
      {
        overlay?.branding?.logo ? (
          <Image
            source={overlay?.branding?.logo}
            style={{
              resizeMode: "cover",
              width: logoHeight,
              height: logoHeight,
              borderRadius: 8,
            }}
          />
        ) : null
        // <Text style={[TextTheme.title, { fontSize: 0.5 * logoHeight }]}>
        //   {(overlay.metaOverlay?.issuerName ?? overlay.metaOverlay?.name ?? "C")
        //     ?.charAt(0)
        //     .toUpperCase()}
        // </Text>
      }
    </View>
  );
}

function DetailSecondaryBody({
  overlay,
  styles,
}: {
  overlay?: OverlayBundle | undefined;
  styles?: any;
}) {
  return (
    <>
      {overlay?.branding?.backgroundImage ? (
        <ImageBackground
          source={overlay?.branding?.backgroundImage}
          imageStyle={{
            resizeMode: "cover",
          }}
        >
          <View style={styles.secondaryBodyContainer} />
        </ImageBackground>
      ) : (
        <View style={styles.secondaryBodyContainer} />
      )}
    </>
  );
}

function DetailPrimaryBody({
  overlay,
  language,
  styles,
}: {
  overlay?: OverlayBundle | undefined;
  language?: string;
  styles?: any;
}) {
  return (
    <View style={styles.primaryBodyContainer}>
      <View>
        <Text
          style={[
            styles.label,
            styles.textContainer,
            {
              paddingLeft: logoHeight + paddingVertical,
              paddingBottom: paddingVertical,
              lineHeight: 19,
              opacity: 0.8,
            },
          ]}
          numberOfLines={1}
        >
          {overlay?.metadata?.issuer?.[language ?? "en"]}
        </Text>
        <Text
          style={[
            styles.normal,
            styles.textContainer,
            {
              lineHeight: 24,
            },
          ]}
        >
          {overlay?.metadata?.name[language ?? "en"]}
        </Text>
      </View>
    </View>
  );
}

function Detail({
  overlay,
  language,
  styles,
}: {
  overlay?: OverlayBundle | undefined;
  language?: string;
  styles?: any;
}) {
  return (
    <View style={styles.container}>
      <DetailSecondaryBody overlay={overlay} styles={styles} />
      <DetailLogo overlay={overlay} styles={styles} />
      <DetailPrimaryBody
        overlay={overlay}
        language={language}
        styles={styles}
      />
    </View>
  );
}

function CredentialDetail10({
  overlay,
  language,
}: {
  overlay?: OverlayBundle;
  language: string;
}) {
  const styles = computedStyles(overlay);

  return (
    <View style={[styles.container, { width }]}>
      <Detail overlay={overlay} language={language} styles={styles} />
    </View>
  );
}

export default CredentialDetail10;
