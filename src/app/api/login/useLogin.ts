export default function useLogin() {
  return {};
}

export const headers = {
  "x-transaction-id": "3",
  "sec-ch-ua-platform": '"macOS"',
  "sec-ch-ua":
    '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
  "sec-ch-ua-mobile": "?0",
  "X-Requested-With": "XMLHttpRequest",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  "Sec-Fetch-Site": "same-site",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
  host: "ct-api.catchtable.co.kr",
};

export const loginApi =
  "https://ct-api.catchtable.co.kr/api/user/v1/login-via-catchtable";
