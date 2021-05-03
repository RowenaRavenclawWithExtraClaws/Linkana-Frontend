import { del, get, patch, post, patchMultipart, put } from "./api_helper";
import { audio, profile, voice } from "./endpoints";
import { code } from "./utility";

// try to get profile data to test if the token is correct
export const authUser = async (token) => {
  if (token) {
    const res = await get(profile, {
      Authorization: `Token ${code.decryptMessage(token)}`,
      "Content-Type": "application/json",
    });

    if (res.status === 200) return true;
    return false;
  }

  return false;
};

// fetch data
export const fetchItems = async (url, token, page = 1, extraParams = "") => {
  if (token) {
    const res = await get(`${url}?page=${page}${extraParams}`, {
      Authorization: `Token ${code.decryptMessage(token)}`,
      "Content-Type": "application/json",
    });

    const resBody = await res.json();

    return { status: res.status, body: resBody };
  }

  return { status: 789, body: {} }; // indicates wrong token
};

export const fetchItem = async (url, param, token) => {
  if (token) {
    const res = await get(`${url}${param}`, {
      Authorization: `Token ${code.decryptMessage(token)}`,
      "Content-Type": "application/json",
    });

    const resBody = await res.json();

    return { status: res.status, body: resBody };
  }

  return { status: 789, body: {} }; // indicates wrong token
};

// fetch no-auth-required data
export const fetchNoAuthReqItems = async (url, extraParams = "") => {
  const res = await get(`${url}${extraParams}`, {
    "Content-Type": "application/json",
  });

  const resBody = await res.json();

  return { status: res.status, body: resBody };
};

// post data
export const postItem = async (url, token, data) => {
  if (token) {
    const res = await post(`${url}`, data, {
      Authorization: `Token ${code.decryptMessage(token)}`,
      "Content-Type": "application/json",
    });

    const resBody = await res.json();

    return { status: res.status, body: resBody };
  }

  return { status: 789, body: {} }; // indicates wrong token
};

export const postNoAuthReqItem = async (url, data) => {
  const res = await post(`${url}`, data, {
    "Content-Type": "application/json",
  });

  const resBody = await res.json();

  return { status: res.status, body: resBody };
};

// edit data
export const patchItem = async (url, serial, token, data) => {
  if (token) {
    const res = await patch(`${url}${serial}`, data, {
      Authorization: `Token ${code.decryptMessage(token)}`,
      "Content-Type": "application/json",
    });

    const resBody = await res.json();

    return { status: res.status, body: resBody };
  }

  return { status: 789, body: {} }; // indicates wrong token
};

export const putItem = async (url, token, data) => {
  if (token) {
    const res = await put(`${url}`, data, {
      Authorization: `Token ${code.decryptMessage(token)}`,
      "Content-Type": "application/json",
    });

    const resBody = await res.json();

    return { status: res.status, body: resBody };
  }

  return { status: 789, body: {} }; // indicates wrong token
};

export const patchMultipartItem = async (url, token, data) => {
  if (token) {
    const res = await patchMultipart(`${url}`, data, {
      Authorization: `Token ${code.decryptMessage(token)}`,
    });

    const resBody = await res.json();

    return { status: res.status, body: resBody };
  }

  return { status: 789, body: {} }; // indicates wrong token
};

// delete data
export const deleteItem = async (url, token, param) => {
  if (token) {
    const res = await del(`${url}${param}`, {
      Authorization: `Token ${code.decryptMessage(token)}`,
      "Content-Type": "application/json",
    });

    return res.status;
  }

  return 789; // indicates wrong token
};

// disable or enable a device
export const changeItemState = async (
  url,
  token,
  serial,
  route = "disable"
) => {
  if (token) {
    const res = await post(
      `${url}${serial}/${route}/`,
      {},
      {
        Authorization: `Token ${code.decryptMessage(token)}`,
        "Content-Type": "application/json",
      }
    );

    const resBody = await res.json();

    return { status: res.status, body: resBody };
  }

  return { status: 789, body: {} }; // indicates wrong token
};

// network requests for ai testing
export const audioRequest = async (formData) =>
  await fetch(audio, {
    method: "POST",
    body: formData,
  });

export const voiceRequest = async (body) =>
  await fetch(voice, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
