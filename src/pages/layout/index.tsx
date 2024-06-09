import { Col, Flex, Row, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import ShapeButton from "../../components/ShapeButton";
import styles from "./layout.module.scss";
import { shuffle } from "lodash";

const defaultShapes = [
  { className: styles.square },
  { className: styles.rectangle },
  { className: styles.circle },
  { className: styles.oval },
  { className: styles.parallelogram },
  { className: styles.trapezoid },
];

const LayoutPage = () => {
  const { t } = useTranslation();
  const { Text } = Typography;

  const titleStyle: React.CSSProperties = {
    fontSize: "32px",
  };

  const movePositionButtonStyle: React.CSSProperties = {
    width: "650px",
  };

  const containerStyle: React.CSSProperties = {
    padding: "40px 0",
    maxWidth: "1440px",
    margin: "auto",
  };

  const shapeButtonStyle: React.CSSProperties = {
    width: "100%",
    margin: "0 8px",
  };

  const [isUp, setIsUp] = React.useState<boolean>(false);

  const [shapes, setShape] = React.useState(defaultShapes);

  const handleMoveLeft = () => {
    setShape((prev) => [...prev.slice(1), ...prev.slice(0, 1)]);
  };

  const handleMoveRight = () => {
    setShape((prev) => [...prev.slice(-1), ...prev.slice(0, 5)]);
  };

  const handleMovePosition = () => {
    setIsUp((prev) => !prev);
    setShape((prev) => [...prev.slice(-3), ...prev.slice(0, 3)]);
  };

  return (
    <Flex vertical>
      <Text style={titleStyle}>{t("layout_style")}</Text>
      <Flex style={containerStyle} vertical gap="50px">
        <Flex gap="middle">
          <ShapeButton label={t("move_shape")} onClick={handleMoveLeft}>
            <div className={styles.triangleLeft} />
          </ShapeButton>
          <ShapeButton
            style={movePositionButtonStyle}
            label={t("move_position")}
            onClick={handleMovePosition}
          >
            <Flex gap="200px">
              <div className={styles.triangleUp} />
              <div className={styles.triangleDown} />
            </Flex>
          </ShapeButton>
          <ShapeButton label={t("move_shape")} onClick={handleMoveRight}>
            <div className={styles.triangleRight} />
          </ShapeButton>
        </Flex>

        <Flex vertical gap="12px">
          <Row>
            {shapes?.slice(0, 3).map((shape, index) => (
              <Col span={6} key={index} offset={index !== 0 ? 0 : isUp ? 3 : 6}>
                <ShapeButton
                  style={shapeButtonStyle}
                  buttonClassName={styles.shapeButton}
                  onClick={() => setShape(shuffle(defaultShapes))}
                >
                  <div className={shape.className} />
                </ShapeButton>
              </Col>
            ))}
          </Row>
          <Row>
            {shapes?.slice(3).map((shape, index) => (
              <Col span={6} key={index} offset={index !== 0 ? 0 : isUp ? 6 : 3}>
                <ShapeButton
                  style={shapeButtonStyle}
                  buttonClassName={styles.shapeButton}
                  onClick={() => setShape(shuffle(defaultShapes))}
                >
                  <div className={shape.className} />
                </ShapeButton>
              </Col>
            ))}
          </Row>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LayoutPage;
