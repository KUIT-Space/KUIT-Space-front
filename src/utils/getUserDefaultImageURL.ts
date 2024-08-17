import { CharacterImgs } from "@/assets/Characters";
import { svgComponentToFile } from "@/utils/svgComponentToFile";

export const getUserDefaultImageURL = (userId: number) => {
  return URL.createObjectURL(svgComponentToFile(CharacterImgs[userId % CharacterImgs.length]));
};
