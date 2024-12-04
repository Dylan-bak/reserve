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

    // await page.setRequestInterception(true);
    // const requestPromise = new Promise<string>((resolve) => {
    //   page.on("request", (interceptedRequest: HTTPRequest) => {
    //     if (interceptedRequest.url() === loginApi) {
    //       const postData = interceptedRequest.postData();

    //       if (postData) {
    //         const jsonData = JSON.parse(postData);
    //         const encryptedPassword = jsonData.encryptedPassword || "";
    //         resolve(encryptedPassword);
    //       }
    //     }
    //     interceptedRequest.continue();
    //   });
    // });

    await page.click('#main #login-form button[type="submit"]');
    await page.waitForNavigation();
    // const encryptedPassword = await requestPromise;

    /** 여기서부터 puppeteer를 이용한 시도 */
    await page.goto("https://app.catchtable.co.kr/ct/shop/somit_park");
    // await page.goto("https://app.catchtable.co.kr/ct/shop/viatoledo");
    await page.waitForSelector("#dock button[type='button']");
    await page.evaluate(() => {
      const button = document.querySelector(
        "#dock button[type='button']"
      ) as HTMLButtonElement;
      button.click();
    });

    const date = "금요일, 10월 11, 2024";
    debugger;
    // await page.waitForSelector(
    //   `.mbsc-calendar-slide-active [aria-label=${date}]`
    // );
    await page.waitForSelector(
      `.mbsc-calendar-slide-active [aria-label="금요일, 10월 11, 2024"]`
    );
    await page.click(`.mbsc-calendar-slide-active [aria-label=${date}]`);

    await page.waitForSelector(".drawer-box .timeslot-swiper span");
    const timeText = "오후 7:00";
    await page.evaluate((timeText) => {
      debugger;
      const targetElement = Array.from(
        document.querySelectorAll(".drawer-box .timeslot-swiper span")
      ).find((element) => {
        window.getComputedStyle(element).display !== "none" &&
          element.textContent?.trim() === timeText;
      });

      if (targetElement) targetElement.closest("button")?.click();
    }, timeText);
    /** 여기서부터 puppeteer를 이용한 시도 끝 */

    //  await browser.close();
    // const response = await axios.post(
    //   loginApi,
    //   { loginKey, encryptedPassword },
    //   { headers }
    // );

    return NextResponse.json({ message: "here" }, { status: 200 });
    // return NextResponse.json({ ...response.data }, { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { message: "Failed to read EXIF data" },
      { status: 500 }
    );
  }
}
