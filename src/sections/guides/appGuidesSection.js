import { useTranslation } from "react-i18next";

import guides from "../../mock/guides";

import GuideCard from "../../components/guides/guideCard";
import SectionTitle from "../../components/common/sectionTitle";

import styles from "./appGuidesSection.styles";

export default function AppGuidesSection() {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle style={styles.title}>
        {t("guides.appGuides")}
      </SectionTitle>

      {guides.app.map((guide) => (
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