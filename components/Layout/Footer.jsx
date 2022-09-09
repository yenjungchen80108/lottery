import { Text, TextLink } from '../Text';
import styles from './Layout.module.css';
import Wrapper from './Wrapper';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <Text color="accents-7">
          <TextLink href="https://github.com/yenjungchen80108" color="link">
            Emily Chen
          </TextLink>
        </Text>
      </Wrapper>
    </footer>
  );
};

export default Footer;