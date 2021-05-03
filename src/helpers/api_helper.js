export async function get(url, headers) {
  return fetch(url, {
    method: "GET",
    headers: headers,
  }).then((response) => response);
}

export async function post(url, data, headers) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then((response) => response);
}

export async function put(url, data, headers) {
  return fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  }).then((response) => response);
}

export async function patch(url, data, headers) {
  return fetch(url, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(data),
  }).then((response) => response);
}

export async function patchMultipart(url, data, headers) {
  return fetch(url, {
    method: "PATCH",
    headers: headers,
    body: data,
  }).then((response) => response);
}

export async function del(url, headers) {
  return fetch(url, {
    method: "DELETE",
    headers: headers,
  }).then((response) => response);
}
