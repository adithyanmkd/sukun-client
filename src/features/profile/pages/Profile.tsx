import Banner from "@assets/images/coverImage.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/app/hooks";
import UploadAvatarModal from "../components/modals/UploadAvatarModal";
import { useState } from "react";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [openAvatarModal, setOpenAvatarModal] = useState(false);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="h-full max-h-[80vh] w-full overflow-auto">
      {/* Banner  Image */}
      <div className="mb-28 h-48 md:h-64 lg:h-80">
        <img
          src={Banner}
          alt="Profile banner - NYC skyline at sunset"
          className="h-full w-full rounded-t-md object-cover"
        />

        {/* Avatar positioned on the bottom of the banner */}
        <div className="w-full -translate-y-16">
          <Avatar
            onClick={() => setOpenAvatarModal(true)}
            className="mx-auto size-32 cursor-pointer ring-4 ring-white md:h-40 md:w-40"
          >
            <AvatarImage src={user.avatar} />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* user avatar upload modal */}
      <UploadAvatarModal
        open={openAvatarModal}
        onOpenChange={setOpenAvatarModal}
      />

      {/* user profile details */}
      <div>
        <h3 className="text-center text-3xl font-bold text-[#67686C]">
          {user.username}
        </h3>
        <p className="text-center font-light text-[#969AA4]">
          {/* temporary in future all user have unique username */}@
          {user.username}
        </p>
      </div>
      <div className="h-96">
        <h1 className="text-2xl font-bold">
          Bio and rest things update soon....
        </h1>
      </div>
    </div>
  );
};

export default Profile;
