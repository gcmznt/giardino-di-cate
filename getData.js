const fs = require("fs");
const puppeteer = require("puppeteer");
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cate-162113.firebaseapp.com"
});

var db = admin.firestore();

const url = "http://www.ilgiardinodeibimbi.it/index.asp";

const getData = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.focus('[name="userName"]');
  await page.keyboard.type(process.env.USERNAME);
  await page.focus('[name="userPwd"]');
  await page.keyboard.type(process.env.PASSWORD);
  await page.keyboard.press("Enter");

  await page.waitForNavigation({ waitUntil: "load" });

  const act = (await page.evaluate(() =>
    Array.from(document.querySelectorAll('[id*="AttivitaBimbo"]')).map(d => ({
      key: d.id,
      date: d.parentElement.parentElement.previousElementSibling.querySelector(
        "[align=left]"
      ).innerText,
      title: Array.from(d.querySelectorAll(".title")).map(e => e.innerText),
      text: Array.from(d.querySelectorAll(".text")).map(e => e.innerText)
    }))
  )).map(a => ({
    key: a.key,
    date: a.date,
    entries: a.title
      .map((e, i) => ({
        title: e,
        text: a.text[i]
          .toLowerCase()
          .replace(/\s*\n\s*/g, "\n")
          .replace(/\s{2,}/g, " ")
      }))
      .filter(e => e.text.length)
  }));
  await browser.close();
  return act;
};

getData()
  .then(data => {
    fs.writeFile("./static/data.json", JSON.stringify(data), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    data.forEach(day => {
      db.collection("diary")
        .doc(
          day.date
            .split("/")
            .reverse()
            .join("-")
        )
        .set(day);
    });
    console.log("Data saved to Firestore!");
  })
  .catch();
