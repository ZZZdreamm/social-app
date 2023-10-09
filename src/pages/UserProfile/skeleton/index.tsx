import { ProfileDownSkeleton } from "./ProfileDownSkeleton";
import { ProfileUpSkeleton } from "./ProfileUpSkeleton";

export function UserProfileSkeleton() {
  return (
    <div className="profile">
      <ProfileUpSkeleton />
      <ProfileDownSkeleton />
    </div>
  );
}
