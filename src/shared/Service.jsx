import axios from "axios";

const SENDBIRD_API_BASE_URL = import.meta.env.VITE_SENDBIRD_API_URL; 
const SENDBIRD_API_TOKEN = import.meta.env.VITE_SENDBIRD_API_TOKEN;

const FormatResult = (resp) => {
  const result = {};
  const finalResult = [];

  
  if (!Array.isArray(resp) || resp.length === 0) {
    return []; 
  }

  resp.forEach((item) => {
    const listing = item.carListing;
    const image = item.carImages;

    if (!listing?.id) return;

    if (!result[listing.id]) {
      result[listing.id] = {
        car: listing,
        images: [],
      };
    }

    if (image) {
      result[listing.id].images.push(image);
    }
  });

  Object.values(result).forEach((item) => {
    finalResult.push({
      ...item.car,
      images: item.images,
      image: item.images?.[0]?.imageUrl || null, 
    });
  });

  return finalResult;
};

const CreateSendBirdUser = (userId, nickName, profileUrl) => {
  return axios.post(
    `${SENDBIRD_API_BASE_URL}/users`, 
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl || undefined, 
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SENDBIRD_API_TOKEN,
      },
    }
  );
};

const CreateSendBirdChannel = (users, title) => {
  return axios.post(
    `${SENDBIRD_API_BASE_URL}/group_channels`, 
    {
      user_ids: users,
      is_distinct: true,
      name: title,
      operator_ids: [users[0]],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SENDBIRD_API_TOKEN,
      },
    }
  );
};

const Service = {
  FormatResult,
  CreateSendBirdUser,
  CreateSendBirdChannel,
};

export default Service;