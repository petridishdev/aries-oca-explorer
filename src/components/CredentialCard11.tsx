import { Text, View } from "react-native";

const width = 375;
const borderRadius = 10;
const padding = width * 0.05;
const logoHeight = width * 0.12;

const styles = {
  cardContainer: {},
};

function CardSecondaryBody() {
  return null;
}

function CardLogo() {
  return null;
}

function CardPrimaryBody() {
  return null;
}

function CardStatus() {
  return null;
}

function Card() {
  return (
    <View style={styles.cardContainer}>
      <CardSecondaryBody />
      <CardLogo />
      <CardPrimaryBody />
      <CardStatus />
    </View>
  );
}

function CredentialCard11() {
  return (
    <>
      <Text>This is a credential card with branding version 1.1</Text>
      <Card />
    </>
  );
}

export default CredentialCard11;
