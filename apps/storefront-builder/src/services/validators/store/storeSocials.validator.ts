import { SocialContacts, StoreSocialError } from "components/src/interfaces";

const validateSocials = (social?: string) => {
  if (!social?.trim()) return "Account name is required";

  const handlePattern = /^[a-zA-Z0-9._]{2,30}$/;
  if (!handlePattern.test(social)) {
    return "Enter a valid account name";
  }

  return undefined;
};

const hasStoreError = (storeSocialError: StoreSocialError) => {
  return Object.values(storeSocialError)
    .map(value => !!value)
    .includes(true);
};

export const validateStoreSocailsFields = (socials: SocialContacts) => {
  const storeSocailError: StoreSocialError = {
    facebook: validateSocials(socials.facebook),
    instagram: validateSocials(socials.instagram),
    whatsapp: validateSocials(socials.whatsapp),
  };
  if (hasStoreError(storeSocailError)) return storeSocailError;
  return null;
};
