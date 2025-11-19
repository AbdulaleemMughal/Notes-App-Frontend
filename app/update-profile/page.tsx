"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UserType } from "@/types/user.type";
import { Button } from "@/UI/Button";
import { Loader, Pencil } from "lucide-react";
import { format } from "path";

const genders = [
  {
    id: 1,
    label: "Male",
    value: "Male",
  },
  {
    id: 2,
    label: "Female",
    value: "Female",
  },
  {
    id: 3,
    label: "Others",
    value: "Others",
  },
];

const UpdateProfile = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { getProfile, logout, updateProfile } = useAuth();
  const [userLoadng, setUserLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({} as UserType);

  useEffect(() => {
    (async () => {
      setUserLoading(true);
      const loggedInUser = await getProfile();
      setUser(loggedInUser);
      setUserLoading(false);
    })();
  }, []);

  const handleDataChange = (field: keyof UserType, value: string | File) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    setSaveLoading(true);
    const formData = new FormData();
    formData.append("userName", user.userName);
    if (user.email) formData.append("email", user.email);
    if (user.gender) formData.append("gender", user.gender);
    if (user.aboutYourself)
      formData.append("aboutYourself", user.aboutYourself);
    if (user.image && user.image instanceof File) {
      formData.append("image", user.image);
    }

    await updateProfile(formData);
    setSaveLoading(false);
  };

  if (userLoadng) {
    return (
      <div className="flex justify-center mt-10">
        <Loader className="animate-spin" size={50} color="#ff6608" />
      </div>
    );
  }

  return (
    <div className="w-[500px] flex flex-col mx-auto max-sm:w-full max-sm:px-5 max-sm:pb-5">
      <div className=" flex items-center flex-col space-y-5">
        <h1 className="my-3 text-3xl font-semibold">Your Profile</h1>
        <div className="w-[300px] h-[300px] relative">
          <img
            src={user?.image}
            alt="User Image"
            className="rounded-full w-full h-full"
          />
          <span
            onClick={() => {
              if (imageRef.current) {
                imageRef.current.click();
              }
            }}
            className="absolute bg-neutral-800 p-2 rounded-full border border-white left-[135px] top-[285px] cursor-pointer"
          >
            <Pencil size={20} />
          </span>
          <input
            ref={imageRef}
            type="file"
            className="hidden"
            onChange={(e) =>
              handleDataChange("image", e.target.files?.[0] as File)
            }
          />
        </div>
        <div className="w-full">
          <Label className="mb-1" htmlFor="username">
            Username:
          </Label>
          <Input
            type="text"
            id="username"
            value={user?.userName}
            onChange={(e) => handleDataChange("userName", e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label className="mb-1" htmlFor="email">
            Email:
          </Label>
          <Input
            type="email"
            id="email"
            value={user?.email}
            onChange={(e) => handleDataChange("email", e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label>Gender</Label>
          <RadioGroup
            value={user?.gender}
            className="mt-3"
            onValueChange={(value) => handleDataChange("gender", value)}
          >
            {genders.map((gen, idx) => (
              <div className="flex items-center gap-3" key={gen.value}>
                <RadioGroupItem value={gen.value} id={`r${idx}`} />
                <Label htmlFor={`r${idx}`}>{gen.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="w-full">
          <Label className="mb-1">About Yourself:</Label>
          <Textarea
            placeholder="Write about Yourself.."
            value={user?.aboutYourself}
            onChange={(e) => handleDataChange("aboutYourself", e.target.value)}
          />
        </div>
      </div>
      <div className="mt-5 flex space-x-3 justify-end">
        <Button
          type="button"
          loading={saveLoading}
          text="Save Changes"
          className="rounded-xl px-5"
          loadingIconSize={27}
          onClick={() => handleUpdateProfile()}
        />
        <Button
          type="button"
          text="Logout"
          loading={logoutLoading}
          loadingIconSize={27}
          className="rounded-xl px-5 bg-transparent border border-gray-600"
          onClick={async () => {
            setLogoutLoading(true);
            await logout();
            setLogoutLoading(false);
          }}
        />
      </div>
    </div>
  );
};

export default UpdateProfile;
