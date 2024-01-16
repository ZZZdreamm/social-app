import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import { profileDTO } from "../../models/profiles.models";
import { axiosBase } from "../../globals/apiPaths";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import { getUserPosts } from "../../apiFunctions/getUserPosts";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import { UserProfileSkeleton } from "./skeleton";
import { ProfileDown } from "./ProfileDown";
import { ProfileUp } from "./ProfileUp";
import { withPrivateRoute } from "../../hocComponents/withPrivateRoute";

export default function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<profileDTO>();
  const [content, setContent] = useState("posts");
  const [friends, setFriends] = useState<profileDTO[]>();
  const { profile } = useAuthenticationContext();
  const [relationship, setRelationship] = useState<usersRelation>();
  const {
    posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetchedAfterMount,
  } = useInfinitePosts(
    getUserPosts,
    `userPosts/${userProfile?.Id}`,
    userProfile?.Email
  );

  const checkIfInFriends = useCallback(async () => {
    if (userProfile && userProfile.Id && profile && profile?.Id) {
      const response = await axiosBase.get<usersRelation>(
        `profiles/ifInFriends?userId=${profile?.Id}&friendId=${userProfile.Id}`
      );
      const relation = response.data;
      setRelationship(relation);
    }
  }, [profile, userProfile]);

  useEffect(() => {
    checkIfInFriends();
  }, [checkIfInFriends]);

  const getData = useCallback(async () => {
    if (!userProfile?.Id) return;
    const response = await axiosBase.get<profileDTO[]>(
      `profiles/getFriends/${userProfile.Id}`
    );
    const friends = response.data;
    setFriends(friends);
  }, [userProfile]);

  useEffect(() => {
    getData();
  }, [getData]);

  const getUserData = useCallback(async () => {
    if (!id) return;
    const response = await axiosBase.get<profileDTO>(`profiles/one/${id}`);
    const user = response.data;
    setUserProfile(user);
  }, [id]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      {userProfile &&
      relationship &&
      friends &&
      isFetchedAfterMount &&
      ((posts && posts.length > 0) || !hasNextPage) ? (
        <div className="profile">
          <ProfileUp
            userProfile={userProfile}
            setContent={setContent}
            userFriends={friends}
            relationship={relationship}
            setRelationship={setRelationship}
          />
          <ProfileDown
            content={content}
            userProfile={userProfile}
            friends={friends}
            relationship={relationship}
            posts={posts}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      ) : (
        <UserProfileSkeleton />
      )}
    </>
  );
}

export interface ProfileProps {
  userProfile: profileDTO;
  relationship?: usersRelation;
}


export const PrivateUserProfile = withPrivateRoute(UserProfile);