import { Container } from "react-bootstrap";
import Header from "../components/Header";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className={styles.main}>
      <Header />
      <Container className="mt-5">{children}</Container>
      <Footer/>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
