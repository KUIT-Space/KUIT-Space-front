import React from "react";

import TopBarText, { LeftEnum } from "@/components/TopBarText";

const BoardRegisterPage = () => {
  return (
    <div>
      <TopBarText left={LeftEnum.Back} center="게시글 작성" right=""></TopBarText>
    </div>
  );
};

export default BoardRegisterPage;
