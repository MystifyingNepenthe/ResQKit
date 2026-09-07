import { useTranslation } from "react-i18next";

import guides from "../../mock/guides";

import GuideCard from "../../components/guides/guideCard";
import SectionTitle from "../../components/common/sectionTitle";

import styles from "./woundGuidesSection.styles";

export default function WoundGuidesSection() {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle style={styles.title}>
        {t("guides.woundGuides")}
      </SectionTitle>

      {guides.wounds.map((guide) => (
        <GuideCard
          key={guide.id}
          title={t(guide.titleKey)}
          icon={guide.icon}
          onPress={() => {}}
        />
      ))}
    </>
  );
}