import { Text, View, Image, ImageBackground } from "react-native";
import OverlayBundle from "../types/overlay/OverlayBundle";
import { textColorForBackground } from "../utils/color";

const width = 375;
const borderRadius = 10;
const padding = width * 0.05;
const logoHeight = width * 0.12;

function computedStyles(overlay?: OverlayBundle) {
  return {
    container: {
      backgroundColor:
        overlay?.branding?.primaryBackgroundColor ?? "rgba(0, 0, 0, 0.24)",
      borderRadius: borderRadius,
    },
    cardContainer: {
      flexDirection: "row",
      minHeight: 0.33 * width,
    },
    primaryBodyContainer: {
      flexGrow: 1,
      padding,
      marginLeft: -1 * logoHeight + padding,
      margin: -1,
    },
    secondaryBodyContainer: {
      width: logoHeight,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      backgroundColor:
        (overlay?.branding?.backgroundImageSlice
          ? "rgba(0, 0, 0, 0)"
          : overlay?.branding?.secondaryBackgroundColor) ??
        "rgba(0, 0, 0, 0.24)",
    },
    logoContainer: {
      top: padding,
      left: -1 * logoHeight + padding,
      width: logoHeight,
      height: logoHeight,
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    statusContainer: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderTopRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      height: logoHeight,
      width: logoHeight,
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

function IssuerName({
  overlay,
  language,
  styles,
}: {
  overlay?: OverlayBundle;
  language?: string;
  styles?: any;
}) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={[
          styles.label,
          styles.textContainer,
          {
            lineHeight: 19,
            opacity: 0.8,
            flex: 1,
            flexWrap: "wrap",
          },
        ]}
      >
        {overlay?.metadata?.issuer?.[language ?? "en"]}
      </Text>
    </View>
  );
}

function CredentialName({
  overlay,
  language,
  styles,
}: {
  overlay?: OverlayBundle;
  language?: string;
  styles?: any;
}) {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[
            styles.normal,
            styles.textContainer,
            {
              fontWeight: "bold",
              lineHeight: 24,
              flex: 1,
              flexWrap: "wrap",
            },
          ]}
        >
          {overlay?.metadata?.name[language ?? "en"]}
        </Text>
      </View>
    </View>
  );
}

function CardSecondaryBody({
  overlay,
  styles,
}: {
  overlay?: OverlayBundle;
  styles?: any;
}) {
  return (
    <View style={[styles.secondaryBodyContainer]}>
      {overlay?.branding?.backgroundImageSlice && (
        <ImageBackground
          source={overlay?.branding?.backgroundImageSlice}
          style={{ flexGrow: 1 }}
          imageStyle={{
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
          }}
        >
          {null}
        </ImageBackground>
      )}
    </View>
  );
}

function CardLogo({
  overlay,
  styles,
}: {
  overlay?: OverlayBundle;
  styles?: any;
}) {
  return (
    <View style={[styles.logoContainer]}>
      {overlay?.branding?.logo ? (
        <Image
          source={overlay?.branding?.logo}
          style={{
            resizeMode: "cover",
            width: logoHeight,
            height: logoHeight,
            borderRadius: 8,
          }}
        />
      ) : (
        <Text
          style={[
            styles.normal,
            {
              fontSize: 0.5 * logoHeight,
              fontWeight: "bold",
              alignSelf: "center",
            },
          ]}
        ></Text>
      )}
    </View>
  );
}

function CardPrimaryBody({
  overlay,
  language,
  styles,
}: {
  overlay?: OverlayBundle;
  language?: string;
  styles?: any;
}) {
  return (
    <View style={styles.primaryBodyContainer}>
      <IssuerName overlay={overlay} language={language} styles={styles} />
      <CredentialName overlay={overlay} language={language} styles={styles} />
      {/* <FlatList
          data={[...(displayItems ?? []), primaryField, secondaryField]}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return renderCardAttribute(item as Attribute & Predicate);
          }}
        /> */}
    </View>
  );
}

function CardStatus({
  overlay,
  styles,
}: {
  overlay?: OverlayBundle;
  styles?: any;
}) {
  return <View style={[styles.statusContainer]} />;
}

function Card({
  overlay,
  language,
  styles,
}: {
  overlay?: OverlayBundle;
  language?: string;
  styles?: any;
}) {
  return (
    <View style={styles.cardContainer}>
      <CardSecondaryBody overlay={overlay} styles={styles} />
      <CardLogo overlay={overlay} styles={styles} />
      <CardPrimaryBody overlay={overlay} language={language} styles={styles} />
      <CardStatus overlay={overlay} styles={styles} />
    </View>
  );
}

function CredentialCard10({
  overlay,
  language,
}: {
  overlay?: OverlayBundle;
  language?: string;
}) {
  const styles = computedStyles(overlay);

  return (
    <View style={[styles.container, { width }]}>
      <Card overlay={overlay} language={language} styles={styles} />
    </View>
  );
}

export default CredentialCard10;
