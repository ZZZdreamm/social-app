import { ReadyImagesURL } from "../../../globals/appUrls";

interface PostBottomUpperPartProps {
  amountOfLikes: number;
  amountOfComments: number;
}

export const PostBottomUpperPart = ({
  amountOfLikes,
  amountOfComments,
}: PostBottomUpperPartProps) => {
  return (
    <div className="post-bottom-up">
      <div className="option">
        <img src={`${ReadyImagesURL}/like.png`} alt="" />
        <span>{amountOfLikes}</span>
      </div>
      <div className="option">
        <span>{amountOfComments} comments</span>
      </div>
    </div>
  );
};
