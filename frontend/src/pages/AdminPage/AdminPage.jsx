import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.scss";
import adminOptions from "./adminOptions";
import { useSelector } from "react-redux";
import AdminOption from "./AdminOption/AdminOption";
import { findComponentByTitleAndLabel } from "./findComponentByTitleAndLabel";
const AdminPage = () => {
  const selectedOption = useSelector((state) => state.admin.selectedOption);
  const [optionContent, setOptionContent] = useState(null);

  useEffect(() => {
    setOptionContent(
      findComponentByTitleAndLabel(selectedOption.title, selectedOption.label)
    );
  }, [selectedOption]);
  return (
    <div className={styles.container}>
      <div className={styles.adminContent}>
        <div className={styles.adminOptions}>
          {adminOptions.map((opt) => {
            return (
              <AdminOption
                optionTitle={opt?.title}
                subOptions={opt?.subOptions}
                key={opt?.title}
              />
            );
          })}
        </div>
        <div className={styles.optionContent}>{optionContent}</div>
      </div>
    </div>
  );
};

export default AdminPage;
