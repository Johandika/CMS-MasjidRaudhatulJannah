import React from "react";

const ModalColumn = (title, dataField, showModal) => {
  return {
    title: title,
    align: "center",
    width: 250,
    render: (data) => {
      const content = data[dataField];

      if (content?.length > 30) {
        const truncatedContent = content.substring(0, 90) + "…";
        return (
          <span>
            <span
              onClick={() => showModal(content, title)}
              style={{ cursor: "pointer" }}
            >
              {truncatedContent}
            </span>
          </span>
        );
      } else {
        return content;
      }
    },
  };
};

export default ModalColumn;
