import { Text, View, Image, ImageBackground, FlatList } from "react-native";
import OverlayBundle from "../types/overlay/OverlayBundle";
import { textColorForBackground } from "../utils/color";
import startCase from "lodash.startcase";

const width = 360;
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
    attributeContainer: {
      marginTop: 15,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
    },
    labelSubtitle: {
      fontSize: 14,
      fontWeight: "normal",
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

function AttributeLabel({ label, styles }: { label: string; styles?: any }) {
  return (
    <Text
      style={[
        styles.labelSubtitle,
        styles.textContainer,
        {
          lineHeight: 19,
          opacity: 0.8,
        },
      ]}
    >
      {label}
    </Text>
  );
}

function AttributeValue({ value, styles }: { value?: string; styles?: any }) {
  return (
    <Text
      style={[
        styles.normal,
        styles.textContainer,
        {
          lineHeight: 24,
        },
      ]}
    >
      {value}
    </Text>
  );
}

function Attribute({
  overlay,
  language,
  attribute,
  styles,
}: {
  overlay?: OverlayBundle;
  language?: string;
  attribute: string;
  styles?: any;
}) {
  const label =
    overlay?.displayAttribute(attribute)?.label?.[language ?? "en"] ??
    startCase(attribute);

  return (
    <View style={[styles.textContainer, styles.attributeContainer]}>
      <AttributeLabel label={label} styles={styles}></AttributeLabel>
      <AttributeValue value={"•".repeat(10)} styles={styles} />
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
  const displayAttributes = [];
  const { primaryAttribute, secondaryAttribute } = overlay?.branding ?? {};
  if (primaryAttribute) {
    displayAttributes.push(primaryAttribute);
  }
  if (secondaryAttribute) {
    displayAttributes.push(secondaryAttribute);
  }

  return (
    <View style={styles.primaryBodyContainer}>
      <IssuerName overlay={overlay} language={language} styles={styles} />
      <CredentialName overlay={overlay} language={language} styles={styles} />
      {displayAttributes.map((attribute) => (
        <Attribute
          key={attribute}
          overlay={overlay}
          language={language}
          attribute={attribute}
          styles={styles}
        />
      ))}
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
