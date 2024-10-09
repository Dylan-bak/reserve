import { NextResponse } from "next/server";
import puppeteer, { type HTTPRequest } from "puppeteer";
import { headers, loginApi } from "./useLogin";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { id: loginKey, pw: password } = await req.json();

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://app.catchtable.co.kr/ct/loginPhone");
    await page.waitForSelector("#login-id");
    await page.type("#login-id", loginKey);
    await page.waitForSelector("#login-pw");
    await page.type("#login-pw", password);

    await page.setRequestInterception(true);
    const requestPromise = new Promise<string>((resolve) => {
      page.on("request", (interceptedRequest: HTTPRequest) => {
        if (interceptedRequest.url() === loginApi) {
          const postData = interceptedRequest.postData();

          if (postData) {
            const jsonData = JSON.parse(postData);
            const encryptedPassword = jsonData.encryptedPassword || "";
            console.log("Encrypted Password1:", encryptedPassword);
            resolve(encryptedPassword);
          }
        }
        interceptedRequest.continue();
      });
    });

    await page.click('#main #login-form button[type="submit"]');
    await page.waitForNavigation();
    const encryptedPassword = await requestPromise;
    await browser.close();

    const response = await axios.post(
      loginApi,
      { loginKey, encryptedPassword },
      { headers }
    );

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { message: "Failed to read EXIF data" },
      { status: 500 }
    );
  }
}
