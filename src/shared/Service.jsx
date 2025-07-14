import axios from "axios";

const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

const FormatResult = (resp) => {
  const result = {};
  const finalResult = [];

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
      image: item.images?.[0]?.imageUrl || null, // koristi se u CarItem
    });
  });

  return finalResult;
};

const CreateSendBirdUser = (userId, nickName, profileUrl) => {
  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/users`,
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

const CreateSendBirdChannel = (users, title) => {
  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels`,
    {
      user_ids: users,
      is_distinct: true,
      name: title,
      operator_ids: [users[0]],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
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
